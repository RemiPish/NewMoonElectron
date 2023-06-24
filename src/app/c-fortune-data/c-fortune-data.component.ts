import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cFortuneDataStructure = [
  { name: 'index', value: number },
  { name: 'ID', value: number },
  { name: 'unknown1', value: number },
  { name: 'unknown2', value: number },
  { name: 'unknown3', value: number },
  { name: 'unknown4', value: number },
  { name: 'unknown5', value: number },
];

@Component({
  selector: 'app-c-fortune-data',
  templateUrl: './c-fortune-data.component.html',
  styleUrls: ['./c-fortune-data.component.scss']
})
export class CFortuneDataComponent {
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
        for (let i = 0; i < this.content.length; i++) {
          this.content[i][0].value = i + 1;
        }
        this.cd.detectChanges();
      }
    }
  }

  async parseData(json: string) {
    try {
      const parsed = JSON.parse(json);
      let items: any[] = [];
      let i = 1;
      if (parsed.length) {
        items = await Promise.all(parsed.map(async (item: any) => {
          let index = i;
          i++;
          return [
            { name: 'index', value: index },
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "unknown1", value: item.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
            { name: "unknown2", value: item.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
            { name: "unknown3", value: item.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
            { name: "unknown4", value: item.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
            { name: "unknown5", value: item.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
          ];
        }));
      }
      else {
        let index = i;
        i++;
        items = [[{ name: 'index', value: index }, { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "unknown1", value: parsed.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
        { name: "unknown2", value: parsed.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
        { name: "unknown3", value: parsed.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
        { name: "unknown4", value: parsed.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
        { name: "unknown5", value: parsed.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
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
      this.editingItem = [
        { name: 'index', value: this.selectedItem[0].value },
        { name: 'ID', value: this.selectedItem[1].value },
        { name: 'unknown1', value: this.selectedItem[2].value },
        { name: 'unknown2', value: this.selectedItem[3].value },
        { name: 'unknown3', value: this.selectedItem[4].value },
        { name: 'unknown4', value: this.selectedItem[5].value },
        { name: 'unknown5', value: this.selectedItem[6].value },
      ];
    }
    else {
      this.editingItem = [
        { name: 'index', value: this.content.length + 1 },
        { name: 'ID', value: 1 },
        { name: 'unknown1', value: 0 },
        { name: 'unknown2', value: 0 },
        { name: 'unknown3', value: 0 },
        { name: 'unknown4', value: 0 },
        { name: 'unknown5', value: 0 },
        { name: 'unknown6', value: 0 },
        { name: 'unknown7', value: 0 },
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'index').value === editId) {
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
      this.content.forEach((item: cFortuneDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiGachaData">\n';
        xml += `    <member name="ID">${item[1].value}</member>\n`;
        xml += `    <member name="unknown1">${item[2].value}</member>\n`;
        xml += `    <member name="unknown2">${item[3].value}</member>\n`;
        xml += `    <member name="unknown3">${item[4].value}</member>\n`;
        xml += `    <member name="unknown4">${item[5].value}</member>\n`;
        xml += `    <member name="unknown5">${item[6].value}</member>\n`;
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
