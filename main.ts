
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { webFrame } = require('electron')
const { MultiMonitor } = require('electron-multi-monitor')

function createWindow() {


  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    useContentSize: true,
    // center: true,
    resizable: false,
    // alwaysOnTop: true,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preloader.ts")
    }

  })
  win.loadURL("http://127.0.0.1:5174/")
  win.once('ready-to-show', () => {
    win.webContents.setZoomFactor(0.79)
    win.show()
  })

}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
})