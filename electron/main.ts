
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    useContentSize: true,
    // resizable: false,
    fullscreen: true,
    // frame: false,
    // autoHideMenuBar: true,
    // center: true,
    // alwaysOnTop: true,
    // webPreferences: {
    //   preload: path.join(__dirname, "preloader.ts")
    // }
  })
  win.loadURL("http://127.0.0.1:5173/")
  win.once('ready-to-show', () => {
    win.webContents.setZoomFactor(0.79)
    win.show()
  })

  // const displays = screen.getAllDisplays()

  // const externalDisplay = displays.find((display) => {
  //   return display.bounds.x !== 0 || display.bounds.y !== 0
  // })  

  // const externalDisplay = displays.find((display) => {
  //   return display.bounds.x !== 0 || display.bounds.y !== 0
  // })

  // if (externalDisplay) {
  //   const win2 = new BrowserWindow({
  //     x: externalDisplay.bounds.x + 50,
  //     y: externalDisplay.bounds.y + 50,
  //     width: 1080,
  //     height: 1920,
  //     useContentSize: true,
  //     // resizable: false,
  //     // alwaysOnTop: true,
  //     // autoHideMenuBar: true,
  //     fullscreen: true,
  //     // frame: false,
  //   })
  //   win2.loadURL("http://127.0.0.1:5173/control")
  //   win2.once('ready-to-show', () => {
  //     win2.webContents.setZoomFactor(0.79)
  //     win2.show()
  //   })
  // }
}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
})