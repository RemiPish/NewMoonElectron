import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type entry = [
  { name: 'logicGroup', value: number },
  { name: 'type', value: boolean },
  { name: 'mainParams', value: number[] },
  { name: 'subParams', value: number[] }
];

export type npcBarterGroupDataStructure = [
  { name: 'ID', value: number },
  { name: 'show', value: boolean },
  { name: 'entries', value: entry[] }
];

@Component({
  selector: 'app-npc-invisible-data',
  templateUrl: './npc-invisible-data.component.html',
  styleUrls: ['./npc-invisible-data.component.scss']
})
export class NPCInvisibleDataComponent {
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
    ;
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
    this.filteredContent = this.content.filter((item: { value: string; }[]) => {
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
      const items = await Promise.all(parsed.map(async (item: any) => {
        let entryList: any[] = [];
        item.member[2].element.forEach((m: any) => {
          let subParams: any[] = [];
          for (let i = 0; i < 8; i++) {
            subParams.push(m.object.member.find((n: any) => n["@name"] === "subParams").element[i]);
          }
          entryList.push([
            { name: "logicGroup", value: m.object.member.find((n: any) => n["@name"] === "logicGroup")["#text"] },
            { name: "type", value: m.object.member.find((n: any) => n["@name"] === "type")["#text"] },
            { name: "mainParams", value: [m.object.member.find((n: any) => n["@name"] === "mainParams").element[0], m.object.member.find((n: any) => n["@name"] === "mainParams").element[1]] },
            { name: "subParams", value: subParams }
          ])
        });

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "show", value: item.member.find((m: any) => m["@name"] === "show")["#text"] },
          { name: 'entries', value: entryList }
        ];
      }));
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
      let entries: { name: string; value: any; }[][] = [];

      this.selectedItem[2].value.forEach((elt: any) => {

        let mainParams: any[] = [];
        for (let i = 0; i < elt[2].value.length; i++) {
          mainParams.push(elt[2].value[i]);
        }

        let subParams: any[] = [];
        for (let i = 0; i < elt[3].value.length; i++) {
          subParams.push(elt[3].value[i]);
        }
        entries.push([{ name: 'logicGroup', value: elt[0].value },
        { name: 'type', value: elt[1].value },
        { name: 'mainParams', value: mainParams },
        { name: 'subParams', value: subParams }
        ])
      })


      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'show', value: this.selectedItem[1].value },
        { name: 'entries', value: entries },
      ];
    }
    else {
      let entries: any[] = [];
      for (let k = 0; k < 8; k++) {
        let mainParams: any[] = [];
        for (let i = 0; i < 2; i++) {
          mainParams.push(0);
        }

        let subParams: any[] = [];
        for (let i = 0; i < 8; i++) {
          subParams.push(0);
        }
        entries.push([{ name: 'logicGroup', value: 0 },
        { name: 'type', value: 'NONE' },
        { name: 'mainParams', value: mainParams },
        { name: 'subParams', value: subParams }
        ])
      }


      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'show', value: false },
        {
          name: 'entries', value: entries
        },
      ];
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

  changeTablePage(event: number) {
    if (!event) this.currentPage = 1;
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string, content: any) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      let xml = '<objects>\n';

      content.forEach((item: npcBarterGroupDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiNPCInvisibleData">\n';
        xml += `    	<member name="ID">${item[0].value}</member>\n`;
        xml += `    	<member name="show">${item[1].value}</member>\n`;
        xml += `    	<member name="entries">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiNPCInvisibleDataEntry">\n`;
          xml += `          		<member name="logicGroup">${item[2].value[i][0].value}</member>\n`;
          xml += `          		<member name="type">${item[2].value[i][1].value}</member>\n`;
          xml += `          		<member name="mainParams">\n`;
          for (let j = 0; j < item[2].value[i][2].value.length; j++) {
            xml += `                <element>${item[2].value[i][2].value[j]}</element>\n`;
          }
          xml += `              </member>\n`;
          xml += `          		<member name="subParams">\n`;
          for (let k = 0; k < item[2].value[i][3].value.length; k++) {
            xml += `                <element>${item[2].value[i][3].value[k]}</element>\n`;
          }
          xml += `              </member>\n`;
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
