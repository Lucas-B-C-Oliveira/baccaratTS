
const { app, BrowserWindow, screen, webFrame, webFrameMain } = require('electron')
const path = require('path')
const createProcess = require('child_process').spawn

let server

function createWindow() {

  const isDev = true //! TODO: Remove this variable and its checks
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