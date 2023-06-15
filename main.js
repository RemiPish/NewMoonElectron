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

function getMode(str) {
  let mode = "";
  switch (str) {
    case "CItemData":
      mode = "citem";
      break;
    case "CEventMessageData":
      mode = "ceventmessage"
      break;
    case "CEventMessageData2":
      mode = "ceventmessage"
      break;
    case "CMessageData":
      mode = "cmessage"
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
    case "NPCBarterGroupData":
      mode = "npcbartergroup";
      break;
    case "TriUnionKreuzItemData":
      mode = "triunionkreuzitem";
      break;
    case "CultureItemData":
      mode = "cultureitem";
      break;
    case "CChanceItemData":
      mode = "cchanceitem";
      break;
    case "CSynthesisCatalystData":
      mode = "csynthcatalystdata";
      break;
    case "CValuable":
      mode = "cvaluable";
      break;
    case "DeunionItemCatalystData":
      mode = "deunionitemcatalyst";
      break;
    case "NPCBarterData":
      mode = "npcbarter";
      break;
    case "CModelData1":
      mode = "cmodel";
      break;
    case "CModelData2":
      mode = "cmodel";
      break;
    case "CModelData3":
      mode = "cmodel";
      break;
    case "CModelData1(Client)":
      mode = "cmodel";
      break;
    case "CModelData2(Client)":
      mode = "cmodel";
      break;
    case "CModelData3(Client)":
      mode = "cmodel";
      break;
    case "ItemData":
      mode = "item";
      break;
    case "GvGData":
      mode = "gvg";
      break;
    case "CCultureData":
      mode = "cculture";
      break;
    case "ModificationExtCatalystData":
      mode = "modextcatalyst";
      break;
    case "ModificationCatalystData":
      mode = "modcatalyst";
      break;
    case "PCData":
      mode = "pc";
      break;
    case "ChanceItemData":
      mode = "chanceitem";
      break;
    case "AutoLiveData":
      mode = "autolive";
      break;
    case "CUraFieldData":
      mode = "curafield";
      break;
    case "EnchantInitializeData":
      mode = "enchantinit";
      break;
    case "UnionItemsHelperData":
      mode = "unionitemshelper";
      break;
    case "CHouraiData":
      mode = "chourai";
      break;
    case "EnchantPiercingData":
      mode = "enchantpiercing";
      break;
    case "SlotPiercingData":
      mode = "slotpiercing";
      break;
    case "CMessageData_klan-playstyle":
      mode = "cmessage";
      break;
    case "CMessageData_klan-category":
      mode = "cmessage";
      break;
    case "CMessageData_klan-series":
      mode = "cmessage";
      break;
    case "CMessageData_yorosiku":
      mode = "cmessage";
      break;
    case "CMessageData_System":
      mode = "cmessage";
      break;
    case "CMessageData_SysHelp":
      mode = "cmessage";
      break;
    case "CMessageData_Shop":
      mode = "cmessage";
      break;
    case "CMessageData_reunion":
      mode = "cmessage";
      break;
    case "CMessageData_party-purpose":
      mode = "cmessage";
      break;
    case "CMessageData_party-playstyle":
      mode = "cmessage";
      break;
    case "CMessageData_party-free":
      mode = "cmessage";
      break;
    case "CMessageData_omedeto":
      mode = "cmessage";
      break;
    case "CMessageData_NakamaQuest":
      mode = "cmessage";
      break;
    case "CMessageData_Expert":
      mode = "cmessage";
      break;
    case "CMessageData_DevilPresent":
      mode = "cmessage";
      break;
    case "CMessageData_DevilBook":
      mode = "cmessage";
      break;
    case "CMessageData_Charastic":
      mode = "cmessage";
      break;
    case "CMessageData_Bazaar":
      mode = "cmessage";
      break;
    case "SlotInitializeData":
      mode = "slotinit";
      break;
    case "WorldData":
      mode = "world";
      break;
    case "QuestBonusCodeData":
      mode = "questbonuscode";
      break;
    case "CIconData_COMPShopCategory":
      mode = "cicon";
      break;
    case "DevilBookBonusMitamaData":
      mode = "devilbookbonusmitama";
      break;
    case "GuardianUnlockData":
      mode = "guardianunlock";
      break;
    case "GuardianSpecialData":
      mode = "guardianspecial";
      break;
    case "DevilBookBonusData":
      mode = "devilbookbonus";
      break;
    case "UltimateBattleBaseData":
      mode = "ultimatebattlebase";
      break;
    case "BazaarClerkNPCData":
      mode = "bazaarclerknpc";
      break;
    case "UraFieldTowerData":
      mode = "urafieldtower";
      break;
    case "MitamaReunionBonusData":
      mode = "mitamabonus";
      break;
    case "CSpecialSkillEffectData":
      mode = "cspskilleffect";
      break;
    case "QuestBonusData":
      mode = "questbonus";
      break;
    case "CGuideData":
      mode = "cguide";
      break;
    case "AIData":
      mode = "ai";
      break;
    case "CEquipFaceData":
      mode = "cappearanceequip";
      break;
    case "CEquipFaceData(Client)":
      mode = "cappearanceequip";
      break;
    case "CEquipEyeData":
      mode = "cappearanceequip";
      break;
    case "CEquipHairData":
      mode = "cappearanceequip";
      break;
    case "CIconData_Skill":
      mode = "cicon";
      break;
    case "CIconData_Status":
      mode = "cicon";
      break;
    case "CIconData_Item":
      mode = "cicon";
      break;
    case "CIconData_Devil":
      mode = "cicon";
      break;
    case "CIconData_ItemClass":
      mode = "cicon";
      break;
    case "CIconData_Valuable":
      mode = "cicon";
      break;
    case "CIconData_UIImageList":
      mode = "cicon";
      break;
    case "CIconData_SkillSort":
      mode = "cicon";
      break;
    case "CIconData_Emote":
      mode = "cicon";
      break;
    case "DevilEquipmentItemData":
      mode = "devilequipitem";
      break;
    case "CDevilEquipmentExclusiveData":
      mode = "cdevilequipexclusive";
      break;
    case "TankData":
      mode = "tank";
      break;
    case "CDevilBookBonusMitamaData":
      mode = "cdevilbookbonusmitama";
      break;
    case "CDevilBoostIconData":
      mode = "cdevilboosticon";
      break;
    case "CDevilBookBonusData":
      mode = "cdevilbookbonus";
      break;
    case "DevilFusionData":
      mode = "devilfusion";
      break;
    case "BlendData":
      mode = "blend";
      break;
    case "BlendExtData":
      mode = "blendext";
      break;
    case "DevilBoostLotData":
      mode = "devilboostlot";
      break;
    case "DisassemblyTriggerData":
      mode = "disassemblytrig";
      break;
    case "ModifiedEffectData":
      mode = "modeffect";
      break;
    case "MitamaReunionSetBonusData":
      mode = "mitamasetbonus";
      break;
    case "MissionData":
      mode = "mission";
      break;
    case "CLoadingCommercialData":
      mode = "cloadingcommercial";
      break;
    case "MitamaUnionBonusData":
      mode = "mitamaunion";
      break;
    case "GuardianAssistData":
      mode = "guardianassist";
      break;
    case "ModificationTriggerData":
      mode = "modtrigger";
      break;
    case "CDevilDungeonData":
      mode = "cdevildungeon";
      break;
    case "ModificationExtRecipeData":
      mode = "modextrecipe";
      break;
    case "CNakamaQuestRewardData":
      mode = "cnakamaquestreward";
      break;
    case "WarpPointData":
      mode = "warppoint";
      break;
    case "GvGTrophyData":
      mode = "gvgtrophy";
      break;
    case "DevilBoostItemData":
      mode = "devilboostitem";
      break;
    case "TriUnionSpecialData":
      mode = "triunionspecial";
      break;
    case "TimeLimitData":
      mode = "timelimit";
      break;
    case 'CTitleData':
      mode = "ctitle";
      break;
    case 'DevilData':
      mode = "devil";
      break;
    case 'HNPCData':
      mode = "hnpc";
      break;
    case "NPCBarterConditionData":
      mode = "npcbartercondition";
      break;
    case "CTransformedModelData":
      mode = "ctransformedmodel";
      break;
    case "ZoneData":
      mode = "zone";
      break;
    case "SkillData":
      mode = "skill";
      break;
    case "CKeyItemData":
      mode = "ckeyitem";
      break;
  }
  return mode;
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

ipcMain.on('open-gamefile', (event, arg) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: arg['ext'], extensions: [arg['ext']] }],
  }).then((result) => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      event.reply('gamefile-selected', { filePath, fileName: path.basename(filePath) });

    } else {
      event.reply('gamefile-error-read', err.message);
    }
  })
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



ipcMain.on('delete-file', (event, arg) => {
  exec(`cd ${arg["path"]} && del ${arg["title"]}`, (error, stdout, stderr) => {
    if (error) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: error.message,
        buttons: ['OK'],
      });
      return;
    }
    if (stderr) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: stdout,
        buttons: ['OK'],
      });
      return;
    }
    if (stderr) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: stderr,
        buttons: ['OK'],
      });
      return;
    }
  });
})

function readFileAsync(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

ipcMain.on('start-decrypt-list', (event, arg) => {
  let folder = "";
  let mode = "";
  try {
    if (!!arg) {
      let fileNameList = arg["fileNameList"];
      let parsedList = [];
      fileNameList.forEach(async fileName => {
        mode = getMode(fileName);

        if (['CModelData1(Client)', 'CModelData2(Client)', 'CModelData3(Client)', 'CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote',
          'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CSkillData'].includes(fileName)) {
          folder = "Client"
        }
        else folder = "Shield";

        let cdCmd = `cd ${arg["comphack"]}`;
        let decryptCmd = `comp_decrypt ${arg["binary"]}\\${folder}\\${fileName}.sbin  ${fileName}.bin`;
        let bdPatch = `comp_bdpatch load ${mode} ${fileName}.bin ${fileName}.xml`;
        let filePath = `${arg["comphack"]}\\${fileName}.xml`;

        let command = "";
        if (['CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote',
          'CModelData1(Client)', "CModelData2(Client)", "CModelData3(Client)", 'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CSkillData'].includes(fileName)) {
          let file = fileName;
          switch (fileName) {
            case "CEquipFaceData(Client)":
              file = "CEquipFaceData";
              break;
            case "CModelData1(Client)":
              file = "CModelData1";
              break;
            case "CModelData2(Client)":
              file = "CModelData2";
              break;
            case "CModelData3(Client)":
              file = "CModelData3";
              break;
          }

          command = `${cdCmd} && comp_bdpatch load ${mode}  ${arg["binary"]}\\${folder}\\${file}.bin ${fileName}.xml`
        }
        else command = `${cdCmd} && ${decryptCmd} && ${bdPatch}`;
        exec(command, async (error, stdout, stderr) => {
          if (error) {
            dialog.showMessageBox({
              type: 'info',
              title: 'Error',
              message: error.message,
              buttons: ['OK'],
            });
            return;
          }
          if (stderr) {
            dialog.showMessageBox({
              type: 'info',
              title: 'Error',
              message: stdout,
              buttons: ['OK'],
            });
            return;
          }
          if (stderr) {
            dialog.showMessageBox({
              type: 'info',
              title: 'Error',
              message: stderr,
              buttons: ['OK'],
            });
            return;
          }
          const data = await readFileAsync(filePath, 'utf-8');
          await parsedList.push(data);
          if (parsedList.length === fileNameList.length) {
            event.reply('files-selected-list', parsedList);
          }

        })
      })


    }
  }
  catch (err) {
    console.log(err);
    event.reply('file-error-read', err.message);
  }
})

ipcMain.on('start-decrypt', (event, arg) => {
  if (!!arg) {
    let folder = "";
    let mode = "";
    let fileName = arg["fileName"];

    if (fs.existsSync(`${arg["comphack"]}\\${fileName}.xml`)) {
      let filePath = `${arg["comphack"]}\\${fileName}.xml`;
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: "A file with the same name already exists. It will now edit the existing file!",
        buttons: ['OK'],
      });
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          event.reply('file-error-read', err.message);
        } else {
          event.reply('file-selected', { filePath, fileName: path.basename(filePath), fileContent: data });

        }
      });
    }
    else {
      mode = getMode(arg["file"]);

      if (['CModelData1(Client)', 'CModelData2(Client)', 'CModelData3(Client)', 'CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote',
        'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CSkillData'].includes(arg["file"])) {
        folder = "Client"
      }
      else folder = "Shield";

      const cdCmd = `cd ${arg["comphack"]}`;
      const decryptCmd = `comp_decrypt ${arg["binary"]}\\${folder}\\${arg["file"]}.sbin  ${arg["file"]}.bin`;
      const bdPatch = `comp_bdpatch load ${mode} ${arg["file"]}.bin ${fileName}.xml`;
      let command = "";
      if (['CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote',
        'CModelData1(Client)', "CModelData2(Client)", "CModelData3(Client)", 'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CSkillData'].includes(arg["file"])) {
        let file = arg["file"];
        switch (arg["file"]) {
          case "CEquipFaceData(Client)":
            file = "CEquipFaceData";
            break;
          case "CModelData1(Client)":
            file = "CModelData1";
            break;
          case "CModelData2(Client)":
            file = "CModelData2";
            break;
          case "CModelData3(Client)":
            file = "CModelData3";
            break;
        }

        command = `${cdCmd} && comp_bdpatch load ${mode}  ${arg["binary"]}\\${folder}\\${file}.bin ${fileName}.xml`
      }
      else command = `${cdCmd} && ${decryptCmd} && ${bdPatch}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          dialog.showMessageBox({
            type: 'info',
            title: 'Error',
            message: error.message,
            buttons: ['OK'],
          });
          return;
        }
        if (stderr) {
          dialog.showMessageBox({
            type: 'info',
            title: 'Error',
            message: stdout,
            buttons: ['OK'],
          });
          return;
        }
        if (stderr) {
          dialog.showMessageBox({
            type: 'info',
            title: 'Error',
            message: stderr,
            buttons: ['OK'],
          });
          return;
        }
        let filePath = `${arg["comphack"]}\\${fileName}.xml`;
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            event.reply('file-error-read', err.message);
          } else {
            event.reply('file-selected', { filePath, fileName: path.basename(filePath), fileContent: data });

          }
        });
      });
    }
  }
})

ipcMain.on('save-file', (event, arg) => {
  if (!!arg)
    try {
      console.log(arg["filePath"])
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

ipcMain.on('encrypt-file', (event, arg) => {
  if (!!arg) {
    let mode = "";
    let fileName = path.basename(arg["filePath"]);
    let folder = arg["folder"];
    mode = getMode(arg["fileType"]);

    try {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }).then(result => {
        if (!result.canceled) {
          let fileType = arg["fileType"];
          switch (arg["fileType"]) {
            case "CEquipFaceData(Client)":
              fileType = "CEquipFaceData";
              break;
            case "CModelData1(Client)":
              fileType = "CModelData1";
              break;
            case "CModelData2(Client)":
              fileType = "CModelData2";
              break;
            case "CModelData3(Client)":
              fileType = "CModelData3";
              break;
          }
          const selectedDirectory = result.filePaths[0];
          const xmlFilePath = selectedDirectory + "\\" + fileName
          fs.writeFileSync(xmlFilePath, arg["file"]);
          const cdCmd = `cd ${folder}`;
          let bdPatch = `comp_bdpatch save ${mode} ${xmlFilePath} ${fileType}.bin`;
          const encryptCmd = `comp_encrypt ${arg["fileType"]}.bin ${selectedDirectory}\\${arg["fileType"]}.sbin`;
          const deleteXML = `del ${arg["filePath"]} && del ${arg["fileType"]}.bin`;
          if (['CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote', ,
            'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CSkillData', 'CModelData1(Client)', "CModelData2(Client)", "CModelData3(Client)"].includes(arg["fileType"])) {
            bdPatch = `comp_bdpatch save ${mode} ${xmlFilePath} ${selectedDirectory}\\${fileType}.bin`;
            command = `${cdCmd} && ${bdPatch}`
          }
          else command = `${cdCmd} && ${bdPatch} && ${encryptCmd} && ${deleteXML}`;
          exec(command, (error, stdout, stderr) => {
            if (error) {
              dialog.showMessageBox({
                type: 'info',
                title: 'Error',
                message: error.message,
                buttons: ['OK'],
              });
              return;
            }
            if (stderr) {
              dialog.showMessageBox({
                type: 'info',
                title: 'Error',
                message: stdout,
                buttons: ['OK'],
              });
              return;
            }
            if (stderr) {
              dialog.showMessageBox({
                type: 'info',
                title: 'Error',
                message: stderr,
                buttons: ['OK'],
              });
              return;
            }

            const result = dialog.showMessageBoxSync({
              type: 'info',
              title: 'Success',
              message: "The encrypted file and xml are created!",
              buttons: ['OK'],
            });

            if (result === 0 || result === -1) {
              event.reply('file-saved', { fileType: fileType });
            }
            return;
          })
        }
      })
    }
    catch (err) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Error',
        message: err.message,
        buttons: ['OK'],
      });
    }
  }
})