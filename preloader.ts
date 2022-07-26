window.addEventListener("DOMContentLoaded", () => {

  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const dependency of ["chrome", "node", "electron"]) {
  //   replaceText(`${dependency}-version`, process.versions[dependency])
  //   console.log('chrome', process.versions['chrome'])
  // }

  console.log('chrome version:', process.versions['chrome'])
  console.log('node version:', process.versions['node'])
  console.log('electron version:', process.versions['electron'])
})