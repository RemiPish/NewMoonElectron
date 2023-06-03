import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { ExchangeDataComponent } from '../exchange-data/exchange-data.component';
import { CItemDataComponent } from '../c-item-data/c-item-data.component';
import { ItemDataComponent } from '../item-data/item-data.component';
const { XMLParser } = require("fast-xml-parser");

export type pgMakerDataStructure = [
  { name: 'itemID', value: number },
  { name: 'demonID', value: number },
  { name: 'itemName', value: string },
  { name: 'itemDescription', value: string }
]

@Component({
  selector: 'app-pg-maker',
  templateUrl: './pg-maker.component.html',
  styleUrls: ['./pg-maker.component.scss']
})
export class PgMakerComponent implements OnInit {

  @Input() comphackPath: string = "";
  @Input() binaryDataPath: string = "";
  fileTypeList: string[] = [];

  @ViewChild('cItemDataComponent', { static: false })
  cItemDataComponent!: CItemDataComponent;
  @ViewChild('exchangeDataComponent', { static: false })
  exchangeDataComponent!: ExchangeDataComponent;
  @ViewChild('itemDataComponent', { static: false })
  itemDataComponent!: ItemDataComponent;

  exchangeList: any[] = [];
  citemList: any[] = [];
  itemList: any[] = [];

  loadingSpinner: boolean = false;
  inEdition: boolean = false;

  content: any[][] = [];
  selectedItem: any;
  editingItem: any;

  itemIDMsg = "";
  demonIDMsg = "";
  itemNameMsg = "";
  itemDescriptionMsg = "";

  constructor(private cd: ChangeDetectorRef, private readonly ipc: IpcService) {

    const parseConfig = {
      attributeNamePrefix: "@",
      attrNodeName: false,
      ignoreAttributes: false,
      parseAttributeValue: true,
      parseNodeValue: true,
      parseTrueNumberOnly: true,
      arrayMode: true,
    };

    const parser = new XMLParser(parseConfig);

    this.ipc.on('files-selected-list', async (event: any, arg?: any) => {

      arg.forEach(async (item: any) => {
        let parsedFile = await parser.parse(item);
        let contentA = parsedFile.objects.object;
        if (item.includes('MiExchangeData')) {
          await this.exchangeDataComponent.parseContent(JSON.stringify(contentA));
        }
        else if (item.includes('MiCItemData')) {
          await this.cItemDataComponent.parseContent(JSON.stringify(contentA));
        }
        else if (item.includes('MiItemData')) {
          await this.itemDataComponent.parseContent(JSON.stringify(contentA));
        }
      })
      this.loadingSpinner = false;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.loadingSpinner = true;
    this.cd.detectChanges();
    this.fileTypeList = ['CItemData', 'ItemData', 'ExchangeData']
    this.ipc.send('start-decrypt-list', { comphack: this.comphackPath, binary: this.binaryDataPath, fileNameList: this.fileTypeList });
  }

  setItemData(str: any) {
    str.forEach((item: any) => {
      this.itemList.push(item);
    })
    this.cd.detectChanges();
  }

  setExchangeData(str: any) {
    str.forEach((item: any) => {
      this.exchangeList.push(item);
    })
    console.log(this.exchangeList);
    this.cd.detectChanges();
  }

  setCItemData(str: any) {
    str.forEach((item: any) => {
      this.citemList.push(item);
    })
    this.cd.detectChanges();
  }

  deleteItem(item: any) {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const index = this.content.findIndex((x) => x[0].value === item[0].value);
      if (index > -1) {
        this.content.splice(index, 1);
        this.cd.detectChanges();
      }
    }
  }

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      this.editingItem = [
        { name: 'itemID', value: this.selectedItem[0].value },
        { name: 'demonID', value: this.selectedItem[1].value },
        { name: 'itemName', value: this.selectedItem[2].value },
        { name: 'itemDescription', value: this.selectedItem[3].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'itemID', value: null },
        { name: 'demonID', value: null },
        { name: 'itemName', value: "" },
        { name: 'itemDescription', value: "" }
      ];
    }
    this.cd.detectChanges();
  }

  cancelEdit() {
    this.editingItem = null;
    this.selectedItem = null;
    this.inEdition = false;
    this.cd.detectChanges();
    this.itemIDMsg = "";
    this.demonIDMsg = "";
    this.itemNameMsg = "";
    this.itemDescriptionMsg = "";
  }

  checkValidator() {
    if (this.itemList.find((item: { value: any; }[]) => item[0].value === this.editingItem[0].value)) {
      this.itemIDMsg = "ItemID already exists";
      return false;
    }
    if (this.editingItem[0].value == null) {
      this.itemIDMsg = "ItemID cannot be empty";
      return false;
    }
    if (this.editingItem[1].value == null) {
      this.demonIDMsg = "DemonID cannot be empty";
      return false;
    }
    if (this.editingItem[2].value == "") {
      this.itemNameMsg = "Item Name cannot be empty";
      return false;
    }
    if (this.editingItem[3].value == "") {
      this.itemDescriptionMsg = "Item Description cannot be empty";
      return false;
    }
    return true;
  }

  findIndex(editId: any) {
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].find((item: { name: string; }) => item.name === 'itemID').value === editId) {
        return i;
      }
    }
    return -1;
  }

  saveEdit() {

    if (this.checkValidator()) {
      if (this.selectedItem && this.selectedItem[0].value === this.editingItem[0].value) {
        const index = this.content.indexOf(this.selectedItem);
        if (index !== -1) {
          this.content[index] = this.editingItem;
        }
        this.cancelEdit();
      }
      else {
        if (!this.content.some((item: { value: any; }[]) => item[0].value === this.editingItem[0].value)) {
          this.content.push(this.editingItem);
          this.cancelEdit();
        }
        else {
          const confirmation = confirm('An Item with identical ID already exists. Do you want to overwrite it?');
          if (confirmation) {
            this.content[this.findIndex(this.editingItem[0].value)] = this.editingItem;
            this.cancelEdit();
          }
        }
      }
    }
    else {
      this.cd.detectChanges();
    }
  }

  encryptFile(xml: string, fileName: string) {
    this.ipc.send('encrypt-file', { filePath: this.comphackPath + '\\' + fileName + '.xml', file: xml, fileType: fileName, folder: this.comphackPath });
  }

  saveChange() {
    this.content.forEach((item: { value: any; }[]) => {
      this.exchangeList.push([{ name: 'ID', value: item[0].value },
      {
        name: 'datas',
        value: [[{ name: 'optionDataName', value: item[2].value },
        { name: 'items', value: [[{ name: 'ID', value: item[1].value }, { name: 'stackSize', value: 1 }]] }]]
      }]);

      this.citemList.push([{ name: 'ID', value: item[0].value },
      { name: 'name', value: item[2].value },
      { name: 'name2', value: item[2].value },
      { name: 'desc', value: item[3].value },
      { name: 'icon', value: 47466 },
      { name: 'category', value: 3 },
      { name: 'tradeList', value: false },
      { name: 'modelID', value: 0 },

      { name: 'idle', value: 0 },
      { name: 'combatIdle', value: 0 },
      { name: 'walk', value: 0 },
      { name: 'run', value: 0 },

      { name: 'shotEffectFile', value: "" },
      { name: 'swingEffectFile', value: "" },
      { name: 'element1', value: 0 },
      { name: 'element2', value: 0 },
      { name: 'element3', value: 0 }]);

      this.itemList.push([{ name: 'ID', value: item[0].value },
      { name: 'mainCategory', value: 1 },
      { name: 'subCategory', value: 68 },
      { name: 'affinity', value: 0 },
      { name: 'correctTable', value: [] },
      { name: 'baseID', value: item[0].value },
      { name: 'buyPrice', value: 0 },
      { name: 'sellPrice', value: 0 },
      { name: 'repairPrice', value: 0 },
      { name: 'appearanceID', value: 0 },
      { name: 'weaponType', value: "NONE" },
      { name: 'equipType', value: "EQUIP_TYPE_NONE" },
      { name: 'flags', value: 3196 },
      { name: 'possessionType', value: 1 },
      { name: 'durability', value: 0 },
      { name: 'stackSize', value: 100 },
      { name: 'useSkill', value: 130500 },
      { name: 'gender', value: 2 },
      { name: 'level', value: 0 },
      { name: 'alignment', value: "ALL" },
      { name: 'skillTable', value: [0] },
      { name: 'modSlots', value: 0 },
      { name: 'stock', value: 0 },
      { name: 'GPRequirement', value: 0 },
      { name: 'rental', value: 0 }]);
    });


    this.exchangeDataComponent.writeXmlFile("sbin", this.exchangeList);
    this.cItemDataComponent.writeXmlFile("sbin", this.citemList);
    this.itemDataComponent.writeXmlFile("sbin", this.itemList);
    this.cd.detectChanges();
  }
}
