
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const createProcess = require('child_process').spawn
const drivelist = require('drivelist');
const fs = require('fs-extra')
const fsPromises = require('fs/promises')

const isDev = true //! TODO: Remove this variable and its checks

let urlServer = ''
let basePathToAdvertising
let serverExe

if (isDev) {
  urlServer = path.join(__dirname, "./server/server.exe")
  basePathToAdvertising = path.join(__dirname, "./advertising")
  // console.log('basePathToAdvertising', basePathToAdvertising) //! TODO: Remove this variable and its checks
}
else {
  urlServer = path.join(process.resourcesPath, "./build/server/server.exe")
  basePathToAdvertising = path.join(process.resourcesPath, "./build/advertising")
}

serverExe = createProcess(urlServer)

/// ### Functions ___________________________________

async function getFilesOfThePendrive() {
  let sucessInCopyingFiles = false
  try {
    const drives = await drivelist.list();
    let basePathOfThePendrive = ''

    drives.forEach((drive) => {
      if (drive.isRemovable && drive.isUSB) {
        basePathOfThePendrive = drive.mountpoints[0].path
      }
    });

    fs.copySync(basePathOfThePendrive + '\\a', basePathToAdvertising + "/a")
    fs.copySync(basePathOfThePendrive + '\\b', basePathToAdvertising + "/b")
    fs.copySync(basePathOfThePendrive + '\\c', basePathToAdvertising + "/c")
    fs.copySync(basePathOfThePendrive + '\\d', basePathToAdvertising + "/d")

    sucessInCopyingFiles = true
  }
  catch (err) {
    sucessInCopyingFiles = false
    console.error(err)
    console.error('sucessInCopyingFiles', sucessInCopyingFiles)
    console.log('1 catch')
  }

  return new Promise(function (resolve, reject) {
    if (sucessInCopyingFiles) resolve('SUCESS in copying files of Pendrive')
    else reject('FAILED in copying files of Pendrive')
  })

}

async function saveAllAdvertisingAssetsInLocalStorage(window) {
  let successInSaveAllInfoInLocalStorage = false
  try {
    await saveInfoInLocalStorage(basePathToAdvertising + "/a", window)
    await saveInfoInLocalStorage(basePathToAdvertising + "/b", window)
    await saveInfoInLocalStorage(basePathToAdvertising + "/c", window)
    await saveInfoInLocalStorage(basePathToAdvertising + "/d", window)
    successInSaveAllInfoInLocalStorage = true
  } catch (err) {
    successInSaveAllInfoInLocalStorage = false
    console.error(err)
    console.error('saveAllInfoInLocalStorage', successInSaveAllInfoInLocalStorage)
    console.log('4 catch')
  }

  return new Promise(function (resolve, reject) {
    if (successInSaveAllInfoInLocalStorage) resolve('SUCCESS in save all files in database')
    else reject('FAILED in save all files in database')
  })
}

async function saveInfoInLocalStorage(filesFolderPath, window) {
  let successInSaveAssetsInLocalStorage = false
  try {
    const files = await fsPromises.readdir(filesFolderPath)
    let advertisingFolderName = ''
    const pathsObj = {}

    const paths = files.map((file) => {
      advertisingFolderName = path.dirname(path.join(filesFolderPath, file)).slice(-1) /// returns a name of path

      let pathOfFile
      if (isDev) {
        pathOfFile = `http://localhost:5177/advertising/${advertisingFolderName}/${file}`
        // console.log('pathOfFile', pathOfFile) //! TODO: Remove this console.log()
      }
      else pathOfFile = path.join(filesFolderPath, file) /// get a path of file


      return pathOfFile
    })

    for (let i = 0; i < paths.length; i++) {
      pathsObj[i] = paths[i]
    }

    const data = JSON.stringify(pathsObj)

    const dataReformada = data.replaceAll('\\\\', '/')

    window.webContents.executeJavaScript(`window.localStorage.setItem('${advertisingFolderName}', '${dataReformada}');`)
    successInSaveAssetsInLocalStorage = true

  }
  catch (err) {
    successInSaveAssetsInLocalStorage = false
    console.error(err)
    console.error('successInSaveAssetsInLocalStorage', successInSaveAssetsInLocalStorage)
    console.log('3 catch')
  }

  return new Promise(function (resolve, reject) {
    if (successInSaveAssetsInLocalStorage) resolve('SUCCESS in copying files of Pendrive')
    else reject('FAILED in copying files of Pendrive')
  })
}

async function createWindow() {
  const displays = screen.getAllDisplays()

  const scoreboardWindow = new BrowserWindow({
    x: displays[0].bounds.x,
    y: displays[0].bounds.y,
    width: displays[0].bounds.width,
    height: displays[0].bounds.height,
    kiosk: true,
    fullscreen: true,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })

  try {
    await getFilesOfThePendrive()
    await saveAllAdvertisingAssetsInLocalStorage(scoreboardWindow)
  } catch (error) {
    console.log(error)
    console.log('5 catch')
  }

  const controlWindow = new BrowserWindow({
    x: displays[1].bounds.x,
    y: displays[1].bounds.y,
    width: displays[1].bounds.width,
    height: displays[1].bounds.height,
    kiosk: true,
    fullscreen: true,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })

  let urlBase
  let controlUlr
  let scoreboardUlr

  if (isDev) {
    urlBase = 'http://localhost:5177'
    scoreboardUlr = urlBase + '/'
    controlUlr = urlBase + '#/control'
  }
  else {
    urlBase = `file://${path.join(__dirname, '../build/index.html')}`
    scoreboardUlr = urlBase + `#/`
    controlUlr = urlBase + '#/control'
  }

  scoreboardWindow.loadURL(scoreboardUlr)
  scoreboardWindow.once('ready-to-show', () => {
    scoreboardWindow.show()
  })

  controlWindow.loadURL(controlUlr)
  controlWindow.once('ready-to-show', () => {
    controlWindow.show()
  })

  controlWindow.on('close', () => { closeAll(scoreboardWindow) })
  scoreboardWindow.on('close', () => { closeAll(scoreboardWindow) })
  app.on("window-all-closed", () => { closeAll(scoreboardWindow) })
}

async function closeAll(window) {
  serverExe.stdin.end()
  window.webContents.executeJavaScript(`window.localStorage.clear()`)
  app.quit()
}

/// #### Events -> Start App ____________________________

app.whenReady().then(async () => {
  createWindow()
})


