
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const createProcess = require('child_process').spawn

let server

function createWindow() {

  server = createProcess(path.join(__dirname, "server/Server.exe")); /// TODO: need implement a async verification for show the windows of game. Because, just should show windows if server is running
  const displays = screen.getAllDisplays()

  // console.log(displays[2]) //TODO: Remove this

  const scoreboardWindow = new BrowserWindow({
    //! width: 1920,
    //! height: 1080,
    x: displays[0].bounds.x,
    y: displays[0].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true,
    //! center: true,
    //! resizable: false,
    //! alwaysOnTop: true,
    webPreferences: {
      webSecurity: false
    }

    //TODO: Remove all with //!
  })

  const controlWindow = new BrowserWindow({
    //! width: 1920,
    //! height: 1080,
    x: displays[1].bounds.x,
    y: displays[1].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false
    }
    //! center: true,
    //! resizable: false,
    //! alwaysOnTop: true,

    //TODO: Remove this
  })


  // scoreboardWindow.loadURL("http://localhost:5177/")
  // scoreboardWindow.loadFile('index.html')
  // console.log('__dirname', __dirname)

  const urlScoreboard = `file://${__dirname}/../dist/index.html`
  console.log('urlScoreboard', urlScoreboard)

  scoreboardWindow.loadURL(urlScoreboard)
  scoreboardWindow.once('ready-to-show', () => {
    scoreboardWindow.webContents.setZoomFactor(0.8)
    scoreboardWindow.show()
  })

  controlWindow.loadURL(urlScoreboard + '#/control')
  // controlWindow.loadURL("http://localhost:5177/control")
  controlWindow.once('ready-to-show', () => {
    // win2.webContents.setZoomFactor(1) //TODO: Remove this
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