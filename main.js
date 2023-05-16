const { app, BrowserWindow, dialog, ipcMain, IpcMessageEvent } = require('electron')
const fs = require('fs');
const path = require('path');

let win;

function createWindow() {
  const isWindows = process.platform === 'win32';
  let needsFocusFix = false;
  let triggeringProgrammaticBlur = false;
  // Create the browser window.
  win = new BrowserWindow({
    width: 1284,
    height: 720,
    backgroundColor: '#000000',
    icon: `file://${__dirname}/dist/newmoon-electron/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })


  win.loadURL(`file://${__dirname}/dist/newmoon-electron/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })


  win.on('blur', (event) => {
    if (!triggeringProgrammaticBlur) {
      needsFocusFix = true;
    }
  })

  win.on('focus', (event) => {
    if (isWindows && needsFocusFix) {
      needsFocusFix = false;
      triggeringProgrammaticBlur = true;
      setTimeout(function () {
        win.blur();
        win.focus();
        setTimeout(function () {
          triggeringProgrammaticBlur = false;
        }, 100);
      }, 100);
    }
  })
}

// Create window on electron initialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'XML', extensions: ['xml'] }],
  }).then((result) => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          event.reply('file-error-read', err.message);
        } else {
          event.reply('file-selected', { filePath, fileName: path.basename(filePath), fileContent: data });
        }
      });
    }
  });
});

ipcMain.on('save-file', (event, arg) => {
  if (!!arg)

    try {
      // Attempt to write the file
      fs.writeFileSync(arg["filePath"], arg["file"])
      // Show a success message
      dialog.showMessageBox({
        type: 'info',
        title: 'File Saved',
        message: 'The file has been saved successfully.',
        buttons: ['OK'],
      });
    } catch (err) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: err.message,
        buttons: ['OK'],
      });
    }

})