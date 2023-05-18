const { app, BrowserWindow, dialog, ipcMain, IpcMessageEvent } = require('electron')
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

ipcMain.on('open-comphack-path-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {

    // result.canceled will be true if the dialog was cancelled
    if (!result.canceled) {
      const selectedDirectory = result.filePaths[0];
      const fileNamesToCheck = [`comp_decrypt.exe`, `comp_encrypt.exe`, `comp_bdpatch.exe`];
      let filesFound = 0;
      const promises = [];
      // Check if each file exists
      fileNamesToCheck.forEach(fileName => {
        const filePathToCheck = `${selectedDirectory}/${fileName}`;
        const promise = new Promise((resolve, reject) => {
          fs.access(filePathToCheck, fs.constants.F_OK, (err) => {
            if (err) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        })
        promises.push(promise);
      });
      Promise.all(promises)
        .then(results => {
          filesFound = results.filter(result => result).length;
          (filesFound === 3) ? event.reply('comphack-path-selected', selectedDirectory) : event.reply('comphack-path-error', "The directory doesn't contain COMP_hack applications");
        })
        .catch(error => {
          console.error('Error:', error);
          event.reply('comphack-path-error', "The directory doesn't contain COMP_hack applications");
        });
    }
  }).catch(err => {
    console.log('Error:', err);
    event.reply('comphack-path-error', "The directory doesn't contain COMP_hack applications");
  });
})

ipcMain.on('open-binarydata-path-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {

    // result.canceled will be true if the dialog was cancelled
    if (!result.canceled) {
      const selectedDirectory = result.filePaths[0];
      const folderNamesToCheck = [`Client`, `Shield`];
      let foldersFound = 0;

      fs.readdir(selectedDirectory, (err, files) => {
        if (err) {
          console.error('Error:', err);
          return;
        }

        folderNamesToCheck.forEach(folderName => {
          if (files.includes(folderName)) {
            foldersFound++;
          }
        });

        if (foldersFound === folderNamesToCheck.length) {
          event.reply('binarydata-path-selected', selectedDirectory)
        } else {
          event.reply('binarydata-path-error', "The directory doesn't contain  Client and Shield Folders");
        }
      });
    }
  }).catch(err => {
    console.log('Error:', err);
    event.reply('binarydata-path-error', "The directory doesn't contain Client and Shield Folders");
  });
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

ipcMain.on('start-decrypt', (event, arg) => {
  if (!!arg) {
    let folder = "";
    let mode = "";
    switch (arg["file"]) {
      case "CItemData":
        mode = "citem";
        break;
      case "CEventMessageData":
        mode = "ceventmessage"
        break;
      case "CEventMessageData2":
        mode = "ceventmessage"
        break;
      case "CSkillData":
        mode = "cskill";
        break;
      case "ActionLogicData":
        mode = "actionlogic";
        break;
      case "ExchangeData":
        mode = "exchange";
        break;
    }
    if (arg["file"] === "CSkillData") {
      folder = "Client"
    }
    else folder = "Shield";
    const command = `cd ${arg["comphack"]} && comp_decrypt ${arg["binary"]}\\${folder}\\${arg["file"]}.sbin ${arg["file"]}.bin && comp_bdpatch load ${mode} ${arg["file"]}.bin ${arg["file"]}.xml`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing comp_decrypt: ${error.message}`);
        return;
      }
      let filePath = `${arg["comphack"]}\\${arg["file"]}.xml`;
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          event.reply('file-error-read', err.message);
        } else {
          event.reply('file-selected', { filePath, fileName: path.basename(filePath), fileContent: data });
        }
      });
    });
  }
})
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