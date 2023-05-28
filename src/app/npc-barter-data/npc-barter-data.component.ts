import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type itemData = [
  { name: 'ID', value: string },
  { name: 'subtype', value: number },
  { name: 'amount', value: number }
];
export type npcBarterDataStructure = [
  { name: 'ID', value: number },
  { name: 'resultItems', value: itemData[] },
  { name: 'tradeItems', value: itemData[] },
];

@Component({
  selector: 'app-npc-barter-data',
  templateUrl: './npc-barter-data.component.html',
  styleUrls: ['./npc-barter-data.component.scss']
})
export class NpcBarterDataComponent {
  contentJson: string = "";
  @Input() fileMode: string = "";
  @Output() fileIsValid = new EventEmitter<boolean>();
  @Output() saveXmlFile = new EventEmitter<string>();
  @Output() encryptFile = new EventEmitter<string>();
  inEdition: boolean = false;
  searchTableText = "";
  content: any[] = [];
  filteredContent: any[] = [];

  currentPage = 1;
  formMsg = "";

  selectedItem: any;
  editingItem: any;
  loadingTable = false;
  isValidFile = false;

  constructor(private cd: ChangeDetectorRef) {

  }

  async startParsing(json: string) {
    this.loadingTable = true;
    this.inEdition = false
    this.contentJson = json;
    this.content = await this.parseData(this.contentJson);
    if (this.content.length) {
      this.filteredContent = this.content;
      this.isValidFile = true;
      this.fileIsValid.emit(true);
    }
    else {
      this.filteredContent = [];
      this.isValidFile = false;
      this.fileIsValid.emit(false);
    }
    this.loadingTable = false;
    this.cd.detectChanges();
  }

  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.content;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.content.filter((item: any[]) => {
      const idStr = String(item[0].value).toLowerCase();
      return idStr.includes(searchStr);
    });

    this.currentPage = 1;
    this.cd.detectChanges();
  }

  deleteItem(item: any) {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const index = this.content.findIndex((x) => x[0].value === item[0].value);
      if (index > -1) {
        this.content.splice(index, 1);
        this.filteredContent = this.content;
        this.cd.detectChanges();
      }
    }
  }

  async parseData(json: string) {
    try {
      const parsed = JSON.parse(json);
      console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {
        let resultItems: any[] = [];
        let tradeItems: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "resultItems").element.length) {
          item.member.find((m: any) => m["@name"] === "resultItems").element.forEach((resultItem: any) => {
            resultItems.push([{ name: 'type', value: resultItem.object.member.find((m: any) => m["@name"] === 'type')["#text"] },
            { name: 'subtype', value: resultItem.object.member.find((m: any) => m["@name"] === 'subtype')["#text"] },
            { name: 'amount', value: resultItem.object.member.find((m: any) => m["@name"] === 'amount')["#text"] }
            ]);
          });
        }
        else {
          console.log("1 result")
          resultItems.push([{ name: 'type', value: item.member.find((m: any) => m["@name"] === "resultItems").object.member.find((m: any) => m["@name"] === 'type')["#text"] },
          { name: 'subtype', value: item.member.find((m: any) => m["@name"] === "resultItems").object.member.find((m: any) => m["@name"] === 'subtype')["#text"] },
          { name: 'amount', value: item.member.find((m: any) => m["@name"] === "resultItems").object.member.find((m: any) => m["@name"] === 'amount')["#text"] }
          ]);
        }

        if (item.member.find((m: any) => m["@name"] === "tradeItems").element.length) {
          item.member.find((m: any) => m["@name"] === "tradeItems").element.forEach((tradeItem: any) => {
            tradeItems.push([{ name: 'type', value: tradeItem.object.member.find((m: any) => m["@name"] === 'type')["#text"] },
            { name: 'subtype', value: tradeItem.object.member.find((m: any) => m["@name"] === 'subtype')["#text"] },
            { name: 'amount', value: tradeItem.object.member.find((m: any) => m["@name"] === 'amount')["#text"] }])
          })
        }
        else {
          tradeItems.push([{ name: 'type', value: item.member.find((m: any) => m["@name"] === "tradeItems").object.member.find((m: any) => m["@name"] === 'type')["#text"] },
          { name: 'subtype', value: item.member.find((m: any) => m["@name"] === "tradeItems").object.member.find((m: any) => m["@name"] === 'subtype')["#text"] },
          { name: 'amount', value: item.member.find((m: any) => m["@name"] === "tradeItems").object.member.find((m: any) => m["@name"] === 'amount')["#text"] }])
        }

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "resultItems", value: resultItems },
          { name: "tradeItems", value: tradeItems }
        ];
      }))
      return items;
    }

    catch (error) {
      console.log(error);
      this.loadingTable = false;
      this.isValidFile = false;
      this.fileIsValid.emit(false);
      return [];
    }
  }

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let resultItems: any[] = [];
      let tradeItems: any[] = [];

      this.selectedItem[1].value.forEach((elt: any) => {

        resultItems.push([{ name: 'type', value: elt[0].value },
        { name: 'subtype', value: elt[1].value },
        { name: 'amount', value: elt[2].value }])
      })

      this.selectedItem[2].value.forEach((elt: any) => {

        tradeItems.push([{ name: 'type', value: elt[0].value },
        { name: 'subtype', value: elt[1].value },
        { name: 'amount', value: elt[2].value }])
      })


      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'resultItems', value: resultItems },
        { name: 'tradeItems', value: tradeItems },
      ];
    }
    else {
      let resultItems: any[] = [];
      let tradeItems: any[] = [];

      resultItems.push([{ name: 'type', value: 'NONE' }, {
        name: 'subtype', value: 0
      }, { name: 'amount', value: 0 }]);

      tradeItems.push([{ name: 'type', value: 'NONE' }, {
        name: 'subtype', value: 0
      }, { name: 'amount', value: 0 }]);

      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'resultItems', value: resultItems },
        { name: 'tradeItems', value: tradeItems }]

    }
    console.log(this.editingItem)
    this.cd.detectChanges();
  }

  cancelEdit() {
    this.formMsg = "";
    this.editingItem = null;
    this.selectedItem = null;
    this.inEdition = false;
    this.filteredContent = this.content;
    this.cd.detectChanges();
  }

  saveEdit() {
    if (this.editingItem[0].value !== null) {
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
      this.formMsg = "ID cannot be empty!";
      this.cd.detectChanges();
    }
  }

  findIndex(editId: any) {
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].find((item: { name: string; }) => item.name === 'ID').value === editId) {
        return i;
      }
    }
    return -1;
  }

  addItemData(list: string) {
    if (list === "result") {
      this.editingItem[1].value.push(
        [{ name: 'type', value: 'NONE' }, {
          name: 'subtype', value: 0
        }, { name: 'amount', value: 0 }]);
    }
    else if (list === "trade") {
      this.editingItem[2].value.push(
        [{ name: 'type', value: 'NONE' }, {
          name: 'subtype', value: 0
        }, { name: 'amount', value: 0 }]);
    }

    this.cd.detectChanges();
  }

  removeItemData(list: string, i: number) {
    if (list === "result") {
      this.editingItem[1].value.splice(i, 1);
    }
    else if (list === "trade") {
      this.editingItem[2].value.splice(i, 1);
    }

    this.cd.detectChanges();
  }

  changeTablePage(event: number) {
    if (!event) this.currentPage = 1;
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      let xml = '<objects>\n';

      this.content.forEach((item: npcBarterDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiNPCBarterData">\n';
        xml += `    	<member name="ID">${item[0].value}</member>\n`;
        xml += `    	<member name="resultItems">\n`;
        for (let i = 0; i < item[1].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiNPCBarterItemData">\n`;
          xml += `          		<member name="type">${item[1].value[i][0].value}</member>\n`;
          xml += `          		<member name="subtype">${item[1].value[i][1].value}</member>\n`;
          xml += `          		<member name="amount">${item[1].value[i][2].value}</member>\n`;
          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="tradeItems">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiNPCBarterItemData">\n`;
          xml += `          		<member name="type">${item[2].value[i][0].value}</member>\n`;
          xml += `          		<member name="subtype">${item[2].value[i][1].value}</member>\n`;
          xml += `          		<member name="amount">${item[2].value[i][2].value}</member>\n`;
          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        // Write the closing tag for the item
        xml += '	</object>\n';
      });
      // Write the closing tag for the root element
      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
