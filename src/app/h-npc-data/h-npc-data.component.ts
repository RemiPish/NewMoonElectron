import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
import { IpcService } from '../ipc.service';

export type hNPCDataStructure = [
  { name: 'ID', value: number },
  { name: 'name', value: string },
  { name: 'titleID', value: number },
  { name: 'unk3', value: number },
  { name: 'unk4', value: number },
  { name: 'unk5', value: number },
  { name: 'unk6', value: number },
  { name: 'modelID', value: number },
  { name: 'appearance1', value: number },
  { name: 'appearance2', value: number },
  { name: 'appearance3', value: number },
  { name: 'appearance4', value: number },
  { name: 'appearance5', value: boolean },
  { name: 'appearance6', value: number },
  { name: 'appearance7', value: number },
  { name: 'equipment', value: string[] },
];


@Component({
  selector: 'app-h-npc-data',
  templateUrl: './h-npc-data.component.html',
  styleUrls: ['./h-npc-data.component.scss']
})
export class HNpcDataComponent {
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

  gameFileID: number = -1;

  constructor(private cd: ChangeDetectorRef, private ipc: IpcService) {
    this.ipc.on('gamefile-selected', async (event: any, arg?: any) => {
      this.editingItem[15].value[this.gameFileID] = arg['fileName'];
      this.gameFileID = -1;
      this.cd.detectChanges();
    });
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
    this.filteredContent = this.content.filter((item: { value: string; }[]) => {
      const idStr = String(item[0].value).toLowerCase();
      const nameStr = String(item[1].value).toLowerCase();
      return idStr.includes(searchStr) || nameStr.includes(searchStr);
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
      let items: any[] = [];
      if (parsed.length) {

        items = await Promise.all(parsed.map(async (item: any) => {
          let equipments: any[] = [];
          item.member[2].element.forEach((element: any) => {
            equipments.push(element);
          })
          return [
            { name: "ID", value: item.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "name", value: item.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "titleID", value: item.member[0].object.member.find((m: any) => m["@name"] === "titleID")["#text"] },
            { name: "unk3", value: item.member[0].object.member.find((m: any) => m["@name"] === "unk3")["#text"] },
            { name: "unk4", value: item.member[0].object.member.find((m: any) => m["@name"] === "unk4")["#text"] },
            { name: "unk5", value: item.member[0].object.member.find((m: any) => m["@name"] === "unk5")["#text"] },
            { name: "unk6", value: item.member[0].object.member.find((m: any) => m["@name"] === "unk6")["#text"] },
            { name: "modelID", value: item.member[0].object.member.find((m: any) => m["@name"] === "modelID")["#text"] },
            { name: "appearance1", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance1")["#text"] },
            { name: "appearance2", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance2")["#text"] },
            { name: "appearance3", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance3")["#text"] },
            { name: "appearance4", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance4")["#text"] },
            { name: "appearance5", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance5")["#text"] },
            { name: "appearance6", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance6")["#text"] },
            { name: "appearance7", value: item.member[1].object.member.find((m: any) => m["@name"] === "appearance7")["#text"] },
            { name: "equipment", value: equipments },
          ];
        }));
      }
      else {
        let equipments: any[] = [];
        parsed.member[2].element.forEach((element: any) => {
          equipments.push(element);
        })
        items = [[{ name: "ID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "name", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
        { name: "titleID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "titleID")["#text"] },
        { name: "unk3", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "unk3")["#text"] },
        { name: "unk4", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "unk4")["#text"] },
        { name: "unk5", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "unk5")["#text"] },
        { name: "unk6", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "unk6")["#text"] },
        { name: "modelID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "modelID")["#text"] },
        { name: "appearance1", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance1")["#text"] },
        { name: "appearance2", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance2")["#text"] },
        { name: "appearance3", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance3")["#text"] },
        { name: "appearance4", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance4")["#text"] },
        { name: "appearance5", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance5")["#text"] },
        { name: "appearance6", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance6")["#text"] },
        { name: "appearance7", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "appearance7")["#text"] },
        { name: "equipment", value: equipments },
        ]];
      }

      console.log(items);
      return items;
    }
    catch (error) {
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
      let equipments: any[] = [];
      this.selectedItem[15].value.forEach((element: any) => {
        equipments.push(element);
      })
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'name', value: this.selectedItem[1].value },
        { name: 'titleID', value: this.selectedItem[2].value },
        { name: 'unk3', value: this.selectedItem[3].value },
        { name: 'unk4', value: this.selectedItem[4].value },
        { name: 'unk5', value: this.selectedItem[5].value },
        { name: 'unk6', value: this.selectedItem[6].value },
        { name: 'modelID', value: this.selectedItem[7].value },
        { name: 'appearance1', value: this.selectedItem[8].value },
        { name: 'appearance2', value: this.selectedItem[9].value },
        { name: 'appearance3', value: this.selectedItem[10].value },
        { name: 'appearance4', value: this.selectedItem[11].value },
        { name: 'appearance5', value: this.selectedItem[12].value },
        { name: 'appearance6', value: this.selectedItem[13].value },
        { name: 'appearance7', value: this.selectedItem[14].value },
        { name: 'equipment', value: equipments },

      ];
    }
    else {
      let equipments: any[] = [];
      for (let i = 0; i < 26; i++) {
        equipments.push('');
      }
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'name', value: '' },
        { name: 'titleID', value: 0 },
        { name: 'unk3', value: 1 },
        { name: 'unk4', value: 0 },
        { name: 'unk5', value: 2 },
        { name: 'unk6', value: 0 },
        { name: 'modelID', value: 0 },
        { name: 'appearance1', value: 0 },
        { name: 'appearance2', value: 0 },
        { name: 'appearance3', value: 0 },
        { name: 'appearance4', value: 0 },
        { name: 'appearance5', value: false },
        { name: 'appearance6', value: 0 },
        { name: 'appearance7', value: 0 },
        { name: 'equipment', value: equipments },

      ];
    }
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
          console.log(this.editingItem);
          this.content.push(this.editingItem);
          console.log(this.content)
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
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: hNPCDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiHNPCData">\n';
        xml += `    <member name="basic">\n`;
        xml += `        <object name="MiHNPCBasicData">\n`;
        xml += `          <member name="ID">${item[0].value}</member>\n`;
        xml += `          <member name="name">${item[1].value || ''}</member>\n`;
        xml += `          <member name="titleID">${item[2].value}</member>\n`;
        xml += `          <member name="unk3">${item[3].value}</member>\n`;
        xml += `          <member name="unk4">${item[4].value}</member>\n`;
        xml += `          <member name="unk5">${item[5].value}</member>\n`;
        xml += `          <member name="unk6">${item[6].value}</member>\n`;
        xml += `          <member name="modelID">${item[7].value}</member>\n`;
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="appearance">\n`;
        xml += `        <object name="MiHNPCAppearanceData">\n`;
        xml += `            <member name="appearance1">${item[8].value}</member>\n`;
        xml += `            <member name="appearance2">${item[9].value}</member>\n`;
        xml += `            <member name="appearance3">${item[10].value}</member>\n`;
        xml += `            <member name="appearance4">${item[11].value}</member>\n`;
        xml += `            <member name="appearance5">${item[12].value}</member>\n`;
        xml += `            <member name="appearance6">${item[13].value}</member>\n`;
        xml += `            <member name="appearance7">${item[14].value}</member>\n`;
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="equipment">\n`;
        item[15].value.forEach((element: any) => {
          xml += `         <element><![CDATA[${element || ''}]]></element>\n`;
        });
        xml += `    </member>\n`;

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

  selectFile(i: number) {
    this.gameFileID = i;
    this.ipc.send('open-gamefile', { ext: 'nif' });

    this.cd.detectChanges();
  }
}
