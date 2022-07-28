
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow() {

  const primaryDisplay = screen.getPrimaryDisplay()
  // const { bounds.x, bounds.y } = primaryDisplay.workAreaSize
  const { x, y } = primaryDisplay.bounds

  console.log(primaryDisplay)


  const win = new BrowserWindow({
    width: 3840,
    height: 1080,
    // useContentSize: true,
    x: 0,
    y: y,
    // center: true,
    resizable: true,
    // alwaysOnTop: true,
    // fullscreen: true,
    // webPreferences: {
    //   preload: path.join(__dirname, "preloader.ts")
    // }

  })
  win.loadURL("http://127.0.0.1:5173/")
  win.once('ready-to-show', () => {
    win.webContents.setZoomFactor(0.79)
    win.setBounds({ x: 0, y: 0, width: 3840, height: 1080 })
    win.show()
  })

}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
})