
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const createProcess = require('child_process').spawn

let server

function createWindow() {

  server = createProcess(path.join(__dirname, "../build/server/server.exe")); /// TODO: need implement a async verification for show the windows of game. Because, just should show windows if server is running
  //? TODO: server process is not work in builder version, need fix that
  const displays = screen.getAllDisplays()

  // console.log(displays[2]) //! TODO: Remove this line

  const scoreboardWindow = new BrowserWindow({
    x: displays[0].bounds.x,
    y: displays[0].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true
  })

  const controlWindow = new BrowserWindow({
    x: displays[1].bounds.x,
    y: displays[1].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true,
  })

  const urlScoreboard = `file://${path.join(__dirname, '../build/index.html')}`

  scoreboardWindow.loadURL(urlScoreboard)
  scoreboardWindow.once('ready-to-show', () => {
    scoreboardWindow.webContents.setZoomFactor(0.8)
    scoreboardWindow.show()
  })

  controlWindow.loadURL(urlScoreboard + '#/control')
  // controlWindow.loadURL("http://localhost:5177/control")
  controlWindow.once('ready-to-show', () => {
    // win2.webContents.setZoomFactor(1) //! TODO: Remove this line
    controlWindow.show()
  })

  controlWindow.on('close', () => {
    closeAll()
  })

  scoreboardWindow.on('close', () => {
    closeAll()
  })

}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  closeAll()
})

function closeAll() {
  app.quit()
  server.stdin.end()
}