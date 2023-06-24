import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { NpcBarterGroupDataComponent } from '../npc-barter-group-data/npc-barter-group-data.component';
import { CItemDataComponent } from '../c-item-data/c-item-data.component';
import { NpcBarterDataComponent } from '../npc-barter-data/npc-barter-data.component';
import { NpcBarterConditionDataComponent } from '../npc-barter-condition-data/npc-barter-condition-data.component';
import { CSkillComponent } from '../c-skill/c-skill.component';
import { CKeyItemDataComponent } from '../c-key-item-data/c-key-item-data.component';
const { XMLParser } = require("fast-xml-parser");

export type pgMakerDataStructure = [
  { name: 'shopID', value: number },
  { name: 'barterID', value: number },
  { name: 'itemID', value: number },
  { name: 'itemCurrency', value: number },
  { name: 'currencyAmount', value: number },
  { name: 'buyAmount', value: number }
];

export type itemData = [
  { name: 'ID', value: string },
  { name: 'subtype', value: any },
  { name: 'amount', value: number },
];

export type barterData = [
  { name: 'barterID', value: number },
  { name: 'resultItems', value: itemData[] },
  { name: 'tradeItems', value: itemData[] },
]
export type finalBarterStructure = [
  { name: 'shopID', value: number },
  { name: 'barterList', value: barterData[] },
  { name: 'nameList', value: string[] }
];



@Component({
  selector: 'app-shop-maker',
  templateUrl: './shop-maker.component.html',
  styleUrls: ['./shop-maker.component.scss']
})
export class ShopMakerComponent implements OnInit {

  @Input() comphackPath: string = "";
  @Input() binaryDataPath: string = "";
  fileTypeList: string[] = [];

  @ViewChild('npcBarterGroupDataComponent', { static: false })
  npcBarterGroupDataComponent!: NpcBarterGroupDataComponent;
  @ViewChild('npcBarterDataComponent', { static: false })
  npcBarterDataComponent!: NpcBarterDataComponent;
  @ViewChild('npcBarterConditionDataComponent', { static: false })
  npcBarterConditionDataComponent!: NpcBarterConditionDataComponent;
  @ViewChild('cItemDataComponent', { static: false })
  cItemDataComponent!: CItemDataComponent;
  @ViewChild('cSkillComponent', { static: false })
  cSkillComponent!: CSkillComponent;
  @ViewChild('cKeyItemDataComponent', { static: false })
  cKeyItemDataComponent!: CKeyItemDataComponent;



  npcBarterGroupList: any[] = [];
  citemList: any[] = [];
  npcBarterList: any[] = [];
  cskillList: any[] = [];
  cKeyItemList: any[] = [];
  npcBarterCondList: any[] = [];
  finalBarterList: any[] = [];

  loadingSpinner: boolean = false;
  inEdition: boolean = false;
  filteredContent: any[] = [];
  content: any[][] = [];
  selectedItem: any;
  editingItem: any;

  filteredOptions: any[][][] = [];


  currentPage = 1;

  itemIDMsg = "";
  demonIDMsg = "";
  itemNameMsg = "";
  itemDescriptionMsg = "";
  searchTableText = "";

  itemIDValid: boolean = false;
  itemIDTested: boolean = false;

  demonIDValid: boolean = false;
  demonIDTested: boolean = false;


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

    this.ipc.on('file-saved', async (event: any, arg?: any) => {
      console.log(arg["fileType"]);


      if (arg["fileType"] === "NPCBarterData") {
        this.npcBarterGroupDataComponent.writeXmlFile("sbin", this.npcBarterGroupList);
      }
      else if (arg["fileType"] === "NPCBarterGroupData") {
        this.npcBarterConditionDataComponent.writeXmlFile("sbin", this.npcBarterCondList);
      }
      this.cd.detectChanges();
    });


    this.ipc.on('files-selected-list', async (event: any, arg?: any) => {

      arg.forEach(async (item: any) => {
        let parsedFile = await parser.parse(item);
        let contentA = parsedFile.objects.object;
        if (item.includes('MiNPCBarterGroupData')) {
          await this.npcBarterGroupDataComponent.parseContent(JSON.stringify(contentA));

        }
        else if (item.includes('MiCItemData')) {
          await this.cItemDataComponent.parseContent(JSON.stringify(contentA));

        }
        else if (item.includes('MiNPCBarterData')) {
          await this.npcBarterDataComponent.parseContent(JSON.stringify(contentA));

        }
        else if (item.includes('MiCSkillData')) {
          await this.cSkillComponent.parseContent(JSON.stringify(contentA));

        }
        else if (item.includes('MiNPCBarterConditionData')) {
          await this.npcBarterConditionDataComponent.parseContent(JSON.stringify(contentA));

        }
        else if (item.includes('MiCKeyItemData')) {
          await this.cKeyItemDataComponent.parseContent(JSON.stringify(contentA));

        }
      })
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.loadingSpinner = true;
    this.cd.detectChanges();
    this.fileTypeList = ['CItemData', 'NPCBarterGroupData', 'NPCBarterData', 'NPCBarterConditionData', 'CSkillData', 'CKeyItemData']
    this.ipc.send('start-decrypt-list', { comphack: this.comphackPath, binary: this.binaryDataPath, fileNameList: this.fileTypeList });
  }


  findItem(item: any, type: string) {
    let res = "";
    switch (type) {
      case "ITEM":
        let fil = this.citemList.find(x => x[0].value === item)
        if (fil) {
          res = fil[1].value;
        }
        else res = "";
        break;
      case "ONE_TIME_VALUABLE":
        let fil2 = this.citemList.find(x => x[0].value === item)
        if (fil2) {
          res = fil2[1].value;
        }
        else res = "";
        break;
      case "SOUL_POINT":
        res = "SOUL POINT";
        break;
      case "SKILL_CHARACTER":
        let fil3 = this.cskillList.find(x => x[0].value === item)
        if (fil3) {
          res = fil3[1].value;
        }
        else res = "";
        break;
      case "SKILL_DEMON":
        let fil4 = this.cskillList.find(x => x[0].value === item)
        if (fil4) {
          res = fil4[1].value;
        }
        else res = "";
        break;
      case "BETHEL":
        if (item === 0)
          res = "Cowrie";
        if (item === 1)
          res = "Blue Bethel";
        if (item === 2)
          res = "Purple Bethel";
        if (item === 3)
          res = "Green Bethel";
        if (item === 4)
          res = "Yellow Bethel"
        if (item === 5)
          res = "Red Bethel"
        break;
      case "PLUGIN":
        let fil5 = this.cKeyItemList.find(x => x[0].value === item)
        if (fil5) {
          res = fil5[1].value;
        }
        else res = "";

        break;


    }
    return res;
  }

  findSkill(item: any, type: string) {
    let res = "";
    switch (type) {
      case "CHARACTER_SKILL":
        let fil1 = this.cskillList.find(x => x[0].value === item)
        if (fil1) {
          res = fil1[1].value;
        }
        else res = "";

        break;
      case "DEMON_SKILL":
        let fil2 = this.cskillList.find(x => x[0].value === item)
        if (fil2) {
          res = fil2[1].value;
        }
        else res = "";
        break;
      case "CHARACTER_NO_SKILL":
        let fil3 = this.cskillList.find(x => x[0].value === item)
        if (fil3) {
          res = fil3[1].value;
        }
        else res = "";

        break;
      case "DEMON_SKILL_INHERITANCE":
        let fil4 = this.cskillList.find(x => x[0].value === item)
        if (fil4) {
          res = fil4[1].value;
        }
        else res = "";
        break;

    }
    return res;
  }

  buildFinalBarterList() {
    this.npcBarterGroupList.forEach((bgl: any) => {
      let id = bgl[0].value;

      let barterList: any[] = [];
      bgl[2].value.forEach((bl: any) => {
        let list: any[] = [];

        list = this.npcBarterList.filter((b: any) => b[0].value === bl[0].value);
        if (list.length > 0)
          list.forEach((b: any) => {
            b.push({ name: 'flags', value: bl[1].value });
            barterList.push(b);
          })
      })



      this.finalBarterList.push([{ name: 'shopID', value: id },
      { name: 'barterList', value: barterList },
      { name: 'nameList', value: [] }]);
      this.filteredContent = this.finalBarterList;
    })
    this.finalBarterList.forEach((b: any) => {
      b[1].value.forEach((bl: any) => {
        bl[4] = { name: 'condition', value: [] };
        bl[1].value = bl[1].value.filter((id: any) => id[0].value != 'NONE');
        bl[2].value = bl[2].value.filter((id: any) => id[0].value != 'NONE');
        bl[1].value.map((elt: any) => {
          let str = this.findItem(elt[1].value, elt[0].value);
          elt.push({ name: 'name', value: str });
          b[2].value.push(str)
        });

        bl[2].value.map((elt: any) => {
          let str = this.findItem(elt[1].value, elt[0].value);
          elt.push({ name: 'name', value: str });
          b[2].value.push(str);
        });
        let cList: any[] = [];
        cList = this.npcBarterCondList.filter((b: any) => b[0].value === bl[0].value);
        if (cList && cList.length > 0) {
          bl[4].value = cList[0][1].value;
        }
        bl[4].value = bl[4].value.filter((id: any) => id[0].value != 'NONE');
        bl[4].value.map((elt: any) => {
          let str = this.findSkill(elt[1].value, elt[0].value);
          elt.push({ name: 'name', value: str });
          b[2].value.push(str)
        });

      })
      b[2].value = [...new Set(b[2].value)];
    })
  }


  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.finalBarterList;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.finalBarterList.filter((item: { value: any; }[]) => {
      const idStr = String(item[0].value).toLowerCase();
      const lowercasedArray = item[2].value.map((str: string) => str.toLowerCase());
      //console.log(lowercasedArray.some((str: string | string[]) => str.includes(searchStr)));
      return idStr.includes(searchStr) || lowercasedArray.some((str: string | string[]) => str.includes(searchStr));
    });
    this.currentPage = 1;
    this.cd.detectChanges();
  }

  changePage(event: number) {
    this.currentPage = event;
    this.cd.detectChanges();
  }

  handleClickDropdown(tab: number, x: number, y: number) {
    this.filteredOptions[tab][x][y] = [];
    this.cd.detectChanges();
  }

  filterOptions(type: string, tab: number, x: number, y: number, isCond?: boolean) {
    let dropdownOptions: any = [];
    let tbl: number = isCond ? x + 2 : x + 1;

    switch (type) {
      case "ITEM":
        this.citemList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "ONE_TIME_VALUABLE":
        this.citemList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "PLUGIN":
        this.cKeyItemList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "SKILL_CHARACTER":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "SKILL_DEMON":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "CHARACTER_SKILL":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "DEMON_SKILL":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "CHARACTER_NO_SKILL":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
      case "DEMON_SKILL_INHERITANCE":
        this.cskillList.forEach((elt: any) => {

          dropdownOptions.push("" + elt[0].value + "-" + elt[1].value);
        })
        break;
    }
    if (this.editingItem[1].value[tab][tbl].value[y][1].value === '') {
      this.filteredOptions[tab][x][y] = dropdownOptions;
    } else {
      this.filteredOptions[tab][x][y] = dropdownOptions.filter((option: any) =>
        option.toLowerCase().includes(
          String(this.editingItem[1].value[tab][tbl].value[y][1].value).toLowerCase()
        )
      );
    }
    this.cd.detectChanges();
  }

  selectOption(option: string, tab: number, x: number, y: number, isCond?: boolean) {
    let tbl: number = isCond ? x + 2 : x + 1;
    this.editingItem[1].value[tab][tbl].value[y][1].value = Number(option.split("-")[0]);
    this.filteredOptions[tab][x][y] = [];
    this.cd.detectChanges();
  }

  setNPCBarterGroupData(str: any) {
    str.forEach((item: any) => {
      this.npcBarterGroupList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    this.cd.detectChanges();
  }

  setCItemData(str: any) {
    str.forEach((item: any) => {
      this.citemList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    this.cd.detectChanges();
  }

  setNPCBarterData(str: any) {
    str.forEach((item: any) => {
      this.npcBarterList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    //console.log(this.npcBarterList)
    this.cd.detectChanges();
  }

  setNPCBarterCondData(str: any) {
    str.forEach((item: any) => {
      this.npcBarterCondList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    this.cd.detectChanges();
  }


  setCSkillData(str: any) {
    str.forEach((item: any) => {
      this.cskillList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    this.cd.detectChanges();
  }

  setCKeyItemData(str: any) {
    str.forEach((item: any) => {
      this.cKeyItemList.push(item);
    })
    if (this.cskillList.length && this.npcBarterCondList.length && this.npcBarterGroupList.length && this.citemList.length && this.npcBarterList.length && this.cKeyItemList.length) {
      this.loadingSpinner = false;
      this.buildFinalBarterList();
    }
    this.cd.detectChanges();
  }


  addItem() {
    let i = this.finalBarterList[this.finalBarterList.length - 1][0].value + 1;
    this.finalBarterList.push([{ name: 'shopID', value: i },
    { name: 'barterList', value: [] },
    { name: 'nameList', value: [] }]);

    this.openEdition(i);
    this.addBarterItem();
    this.saveEdit();
    this.openEdition(i);
    this.cd.detectChanges();
  }

  deleteItem(item: any) {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const index = this.finalBarterList.findIndex((x) => x[0].value === item[0].value);
      if (index > -1) {
        this.finalBarterList.splice(index, 1);
        this.cd.detectChanges();
      }
    }
  }

  addBarterItem() {
    let indexList: any = [];
    this.npcBarterList.forEach((item: any) => {
      indexList.push(item[0].value);
    });
    indexList.sort((a: number, b: number) => b - a);
    let id = indexList[0];
    while (this.editingItem[1].value.filter((x: any) => x[0].value === id).length != 0) {
      id++;
    }
    this.editingItem[1].value.push([{ name: 'ID', value: id }, { name: 'resultItems', value: [] }, { name: 'tradeItems', value: [] }, { name: 'flags', value: 0 }, { name: 'conditions', value: [] }])
    this.filteredOptions[this.editingItem[1].value.length - 1] = [];
    this.filteredOptions[this.editingItem[1].value.length - 1][0] = [];
    this.filteredOptions[this.editingItem[1].value.length - 1][1] = [];
    this.filteredOptions[this.editingItem[1].value.length - 1][2] = [];
    this.addSellingItem(this.editingItem[1].value.length - 1);
    this.addTradingItem(this.editingItem[1].value.length - 1);


    this.cd.detectChanges();
  }

  removeBarterItem(i: number) {
    this.editingItem[1].value.splice(i, 1);
    this.cd.detectChanges();
  }

  addSellingItem(i: number) {
    //console.log(i)
    this.filteredOptions[i][0].push([]);
    this.editingItem[1].value[i][1].value.push([{ name: 'type', value: 'NONE' }, { name: 'subType', value: 0 }, { name: 'amount', value: 0 }, { name: 'name', value: '' }]);
    this.cd.detectChanges();
  }

  removeSellingItem(i: number, j: number) {
    this.editingItem[1].value[i][1].value.splice(j, 1);
    this.cd.detectChanges();
  }

  addTradingItem(i: number) {
    this.filteredOptions[i][1].push([]);
    this.editingItem[1].value[i][2].value.push([{ name: 'type', value: 'NONE' }, { name: 'subType', value: 0 }, { name: 'amount', value: 0 }, { name: 'name', value: '' }]);
    this.cd.detectChanges();
  }

  removeTradingItem(i: number, j: number) {
    this.editingItem[1].value[i][2].value.splice(j, 1);
    this.cd.detectChanges();
  }

  addCond(i: number) {
    this.filteredOptions[i][2].push([]);
    this.editingItem[1].value[i][4].value.push([{ name: 'type', value: 'NONE' }, { name: 'value1', value: 0 }, { name: 'value2', value: 0 }, { name: 'name', value: '' }]);
    this.cd.detectChanges();
  }

  removeCond(i: number, j: number) {
    this.editingItem[1].value[i][4].value.splice(j, 1);
    this.cd.detectChanges();
  }

  openEdition(id?: any) {
    this.inEdition = true;

    if (id) {
      this.selectedItem = this.finalBarterList.find((item: { value: any; }[]) => item[0].value === id);

      // Initialize the filteredOptions array
      this.filteredOptions = [];

      for (let i = 0; i < this.selectedItem[1].value.length; i++) {
        this.filteredOptions[i] = [];
        this.filteredOptions[i][0] = [];
        this.filteredOptions[i][1] = [];
        this.filteredOptions[i][2] = [];
      }

      let barterList: any[] = [];

      for (let i = 0; i < this.selectedItem[1].value.length; i++) {
        let it = this.selectedItem[1].value[i];
        let resList: any[] = [];
        let tradeList: any[] = [];
        let conditionList: any[] = [];

        for (let j = 0; j < it[1].value.length; j++) {
          let elt = it[1].value[j];
          this.filteredOptions[i][0].push([]);
          resList.push([{ name: 'type', value: elt[0].value }, { name: 'subType', value: elt[1].value }, { name: 'amount', value: elt[2].value }, { name: 'name', value: '' }]);
        }

        for (let j = 0; j < it[2].value.length; j++) {
          let elt = it[2].value[j];
          this.filteredOptions[i][1].push([]);
          tradeList.push([{ name: 'type', value: elt[0].value }, { name: 'subType', value: elt[1].value }, { name: 'amount', value: elt[2].value }, { name: 'name', value: '' }]);
        }

        if (it[4]?.value) {
          for (let j = 0; j < it[4].value.length; j++) {
            let elt = it[4].value[j];
            this.filteredOptions[i][2].push([]);
            conditionList.push([{ name: 'type', value: elt[0].value }, { name: 'value1', value: elt[1].value }, { name: 'value2', value: elt[2].value }, { name: 'name', value: '' }]);
          }
        }

        barterList.push([{ name: 'ID', value: it[0].value }, { name: 'resultItems', value: resList }, { name: 'tradeItems', value: tradeList }, { name: 'flags', value: it[3].value }, { name: 'conditions', value: conditionList }]);
      }

      this.editingItem = [
        { name: 'shopID', value: this.selectedItem[0].value },
        { name: 'barterList', value: barterList },
        { name: 'nameList', value: [] }];
    }

    this.filteredContent = [this.editingItem];
    this.cd.detectChanges();
  }

  cancelEdit() {
    this.editingItem = null;
    this.filteredContent = this.finalBarterList;
    this.selectedItem = null;
    this.inEdition = false;
    this.cd.detectChanges();
  }


  findIndex(editId: any) {
    for (let i = 0; i < this.finalBarterList.length; i++) {
      if (this.finalBarterList[i].find((item: { name: string; }) => item.name === 'itemID').value === editId) {
        return i;
      }
    }
    return -1;
  }

  saveEdit() {
    let check: boolean = true;
    this.editingItem[1].value.forEach((it: any) => {
      it[1].value.forEach((elt: any) => {
        elt[1].value = Number(elt[1].value);
        if (Number.isNaN(elt[1].value)) {
          alert("The selling item id must be a number");
          check = false;
        }
        else {
          elt[3].value = this.findItem(elt[1].value, elt[0].value);
          this.editingItem[2].value.push(elt[3].value);
        }
      });
      it[2].value.forEach((elt: any) => {
        elt[1].value = Number(elt[1].value);
        if (Number.isNaN(elt[1].value)) {
          alert("The trading item id must be a number");
          check = false;
        }
        else {
          elt[3].value = this.findItem(elt[1].value, elt[0].value);
          this.editingItem[2].value.push(elt[3].value);
        }
      });
      it[4].value.forEach((elt: any) => {
        elt[1].value = Number(elt[1].value);
        if (Number.isNaN(elt[1].value)) {
          alert("The condition id must be a number");
          check = false;
        }
        else {

          elt[3].value = this.findSkill(elt[1].value, elt[0].value);
          this.editingItem[2].value.push(elt[3].value);
        }
      });
    });

    this.editingItem[2].value = [...new Set(this.editingItem[2].value)];
    if (check) {
      let bGroup = this.npcBarterGroupList.filter((elt: any) => elt[0].value === this.editingItem[0].value)
      let groupEntry: any = [];
      this.editingItem[1].value.forEach((t: any) => {
        groupEntry.push([{ name: 'barterID', value: t[0].value }, { name: 'flags', value: t[3].value }]);
        let b = this.npcBarterList.filter((x: any) => x[0].value === t[0].value);
        let resList: any = [];
        let tradeList: any = [];
        t[1].value.forEach((t1e: any) => {
          resList.push([{ name: 'type', value: t1e[0].value }, { name: 'subType', value: t1e[1].value }, { name: 'amount', value: t1e[2].value }]);
        });
        t[2].value.forEach((t2e: any) => {
          tradeList.push([{ name: 'type', value: t2e[0].value }, { name: 'subType', value: t2e[1].value }, { name: 'amount', value: t2e[2].value }]);
        });
        let addingB = [{ name: 'ID', value: t[0].value }, { name: 'resultItems', value: resList }, { name: 'tradeItems', value: tradeList }];
        if (b.length > 0) {
          let i = this.npcBarterList.indexOf(b[0]);
          this.npcBarterList[i] = addingB;
        }
        else this.npcBarterList.push(addingB);

        let condList: any = [];
        let bc = this.npcBarterCondList.filter((x: any) => x[0].value === t[0].value);
        t[4].value.forEach((t3e: any) => {
          condList.push([{ name: 'type', value: t3e[0].value }, { name: 'value1', value: t3e[1].value }, { name: 'value2', value: t3e[2].value }]);
        });

        let addingBc = [{ name: 'ID', value: t[0].value }, { name: 'conditions', value: condList }];
        if (bc.length > 0) {
          let i = this.npcBarterCondList.indexOf(bc[0]);
          this.npcBarterCondList[i] = addingBc;
        }
        else this.npcBarterCondList.push(addingBc);

      });
      let addingItem = [{ name: 'ID', value: this.editingItem[0].value }, { name: 'displayMode', value: (bGroup.length > 0) ? bGroup[0][1].value : 0 }, { name: 'groupEntryList', value: groupEntry }];
      if (bGroup.length > 0) {
        let i = this.npcBarterGroupList.indexOf(bGroup[0]);
        this.npcBarterGroupList[i] = addingItem;
      }
      else this.npcBarterGroupList.push(addingItem);

      console.log(this.npcBarterGroupList);
      console.log(this.npcBarterCondList);
      console.log(this.npcBarterList);

      if (this.selectedItem && this.selectedItem[0].value === this.editingItem[0].value) {
        const index = this.finalBarterList.indexOf(this.selectedItem);
        if (index !== -1) {
          this.finalBarterList[index] = this.editingItem;
        }
        this.cancelEdit();
      }
      else {
        this.finalBarterList.push(this.editingItem);
        this.cancelEdit();
      }
    }


    this.cd.detectChanges();

  }

  encryptFile(xml: string, fileName: string) {
    this.ipc.send('encrypt-file', { filePath: this.comphackPath + '\\' + fileName + '.xml', file: xml, fileType: fileName, folder: this.comphackPath });
  }

  saveChange() {
    this.npcBarterDataComponent.writeXmlFile("sbin", this.npcBarterList);
    this.cd.detectChanges();
  }
}
