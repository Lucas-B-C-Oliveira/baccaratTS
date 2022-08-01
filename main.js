
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow() {

  const displays = screen.getAllDisplays()

  // console.log(displays[2])

  const win = new BrowserWindow({
    // width: 1920,
    // height: 1080,
    x: displays[1].bounds.x,
    y: displays[1].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true,
    // center: true,
    // resizable: false,
    // alwaysOnTop: true,
    // webPreferences: {
    //   preload: path.join(__dirname, "preloader.ts")
    // }
  })
  win.loadURL("http://127.0.0.1:5173/")
  win.once('ready-to-show', () => {
    win.webContents.setZoomFactor(0.8)
    win.show()
  })

  const win2 = new BrowserWindow({
    // width: 1920,
    // height: 1080,
    x: displays[2].bounds.x,
    y: displays[2].bounds.y,
    kiosk: true,
    fullscreen: true,
    frame: false,
    useContentSize: true,
    // center: true,
    // resizable: false,
    // alwaysOnTop: true,
    // webPreferences: {
    //   preload: path.join(__dirname, "preloader.ts")
    // }
  })
  win2.loadURL("http://127.0.0.1:5173/control")
  win2.once('ready-to-show', () => {
    // win2.webContents.setZoomFactor(1)
    win2.show()
  })



}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
})