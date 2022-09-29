
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const createProcess = require('child_process').spawn
const drivelist = require('drivelist');
const fs = require('fs-extra')

let server

async function getFilesOfThePendrive() {
  const drives = await drivelist.list();
  let basePathOfThePendrive = ''

  drives.forEach((drive) => {
    if (drive.isRemovable && drive.isUSB) {
      basePathOfThePendrive = drive.mountpoints[0].path
    }
  });

  // console.log(basePathOfThePendrive)

  try {

    await fs.copy(basePathOfThePendrive + '\\a', path.join(__dirname, "./../src/assets/a"))
    // await fs.copy(basePathOfThePendrive + '\\a', path.join(__dirname, "../public/assets/a"))
    console.log('success!')

    await fs.copy(basePathOfThePendrive + '\\b', path.join(__dirname, "../src/assets/b"))
    // await fs.copy(basePathOfThePendrive + '\\b', path.join(__dirname, "../public/assets/b"))
    console.log('success!')

    await fs.copy(basePathOfThePendrive + '\\c', path.join(__dirname, "../src/assets/c"))
    // await fs.copy(basePathOfThePendrive + '\\c', path.join(__dirname, "../public/assets/c"))
    console.log('success!')

    await fs.copy(basePathOfThePendrive + '\\d', path.join(__dirname, "../src/assets/d"))
    // await fs.copy(basePathOfThePendrive + '\\d', path.join(__dirname, "../public/assets/d"))
    console.log('success!')

  } catch (err) {
    console.error(err)
  }

}

function createWindow() {

  getFilesOfThePendrive()

  const isDev = false //! TODO: Remove this variable and its checks
  let urlServer = ''

  if (isDev) {
    urlServer = path.join(__dirname, "./server/server.exe")
  }
  else {
    urlServer = path.join(process.resourcesPath, "./build/server/server.exe")
  }

  server = createProcess(urlServer)

  const displays = screen.getAllDisplays()

  const scoreboardWindow = new BrowserWindow({
    x: displays[0].bounds.x,
    y: displays[0].bounds.y,
    width: displays[0].bounds.width,
    height: displays[0].bounds.height,
    kiosk: true,
    fullscreen: true,
    frame: false,
  })

  const controlWindow = new BrowserWindow({
    x: displays[1].bounds.x,
    y: displays[1].bounds.y,
    width: displays[1].bounds.width,
    height: displays[1].bounds.height,
    kiosk: true,
    fullscreen: true,
    frame: false,
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
    scoreboardUlr = urlBase + '#/'
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

  controlWindow.on('close', () => { closeAll() })
  scoreboardWindow.on('close', () => { closeAll() })
}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => { closeAll() })

function closeAll() {
  app.quit()
  server.stdin.end()
}