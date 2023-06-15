import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type dataStructure = [
  { name: 'ID', value: number },
  { name: 'slot1', value: number },
  { name: 'slot2', value: number },
  { name: 'type', value: number },
  { name: 'sequenceID', value: number },
  { name: 'sequenceID2', value: number },
  { name: 'tokusei', value: number }
];

@Component({
  selector: 'app-modified-effect-data',
  templateUrl: './modified-effect-data.component.html',
  styleUrls: ['./modified-effect-data.component.scss']
})
export class ModifiedEffectDataComponent {
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
      let items: any[] = [];
      if (parsed.length) {

        items = await Promise.all(parsed.map(async (item: any) => {
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "slot1", value: item.member.find((m: any) => m["@name"] === "slot1")["#text"] },
            { name: "slot2", value: item.member.find((m: any) => m["@name"] === "slot2")["#text"] },
            { name: "type", value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
            { name: "sequenceID", value: item.member.find((m: any) => m["@name"] === "sequenceID")["#text"] },
            { name: "sequenceID2", value: item.member.find((m: any) => m["@name"] === "sequenceID2")["#text"] },
            { name: "tokusei", value: item.member.find((m: any) => m["@name"] === "tokusei")["#text"] }
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: 'slot1', value: parsed.member.find((m: any) => m["@name"] === "slot1")["#text"] },
      { name: 'slot2', value: parsed.member.find((m: any) => m["@name"] === "slot2")["#text"] },
      { name: 'type', value: parsed.member.find((m: any) => m["@name"] === "type")["#text"] },
      { name: 'sequenceID', value: parsed.member.find((m: any) => m["@name"] === "sequenceID")["#text"] },
      { name: 'sequenceID2', value: parsed.member.find((m: any) => m["@name"] === "sequenceID2")["#text"] },
      { name: 'tokusei', value: parsed.member.find((m: any) => m["@name"] === "tokusei")["#text"] }

      ]];

      console.log(items);
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
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'slot1', value: this.selectedItem[1].value },
        { name: 'slot2', value: this.selectedItem[2].value },
        { name: 'type', value: this.selectedItem[3].value },
        { name: 'sequenceID', value: this.selectedItem[4].value },
        { name: 'sequenceID2', value: this.selectedItem[5].value },
        { name: 'tokusei', value: this.selectedItem[6].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'slot1', value: 0 },
        { name: 'slot2', value: 0 },
        { name: 'type', value: 0 },
        { name: 'sequenceID', value: 0 },
        { name: 'sequenceID2', value: 0 },
        { name: 'tokusei', value: 0 }
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
      this.content.forEach((item: dataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiModifiedEffectData">\n';


        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="slot1">${item[1].value}</member>\n`;
        xml += `    <member name="slot2">${item[2].value}</member>\n`;
        xml += `    <member name="type">${item[3].value}</member>\n`;
        xml += `    <member name="sequenceID">${item[4].value}</member>\n`;
        xml += `    <member name="sequenceID2">${item[5].value}</member>\n`;
        xml += `    <member name="tokusei">${item[6].value}</member>\n`;
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

