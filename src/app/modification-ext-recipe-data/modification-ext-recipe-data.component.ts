import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type modificationExtDataStructure = [
  { name: 'ID', value: number },
  { name: 'groupID', value: number },
  { name: 'slot', value: number },
  { name: 'effectSubID', value: number },
  { name: 'itemID', value: number },
  { name: 'successRate', value: number },
  { name: 'failRate', value: number },
  { name: 'greatSuccessRate', value: number },
  { name: 'greatFailRate', value: number },
  { name: 'unknownID', value: number }
]

@Component({
  selector: 'app-modification-ext-recipe-data',
  templateUrl: './modification-ext-recipe-data.component.html',
  styleUrls: ['./modification-ext-recipe-data.component.scss']
})
export class ModificationExtRecipeDataComponent {
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
      const groupStr = String(item[1].value).toLowerCase();
      const itemIDStr = String(item[4].value).toLowerCase();
      return idStr.includes(searchStr) || itemIDStr.includes(searchStr) || groupStr.includes(searchStr);
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
            { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
            { name: "slot", value: item.member.find((m: any) => m["@name"] === "slot")["#text"] },
            { name: "effectSubID", value: item.member.find((m: any) => m["@name"] === "effectSubID")["#text"] },
            { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
            { name: "successRate", value: item.member.find((m: any) => m["@name"] === "successRate")["#text"] },
            { name: "failRate", value: item.member.find((m: any) => m["@name"] === "failRate")["#text"] },
            { name: "greatSuccessRate", value: item.member.find((m: any) => m["@name"] === "greatSuccessRate")["#text"] },
            { name: "greatFailRate", value: item.member.find((m: any) => m["@name"] === "greatFailRate")["#text"] },
            { name: "unknownID", value: item.member.find((m: any) => m["@name"] === "unknownID")["#text"] }
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "groupID", value: parsed.member.find((m: any) => m["@name"] === "groupID")["#text"] },
      { name: "slot", value: parsed.member.find((m: any) => m["@name"] === "slot")["#text"] },
      { name: "effectSubID", value: parsed.member.find((m: any) => m["@name"] === "effectSubID")["#text"] },
      { name: "itemID", value: parsed.member.find((m: any) => m["@name"] === "itemID")["#text"] },
      { name: "successRate", value: parsed.member.find((m: any) => m["@name"] === "successRate")["#text"] },
      { name: "failRate", value: parsed.member.find((m: any) => m["@name"] === "failRate")["#text"] },
      { name: "greatSuccessRate", value: parsed.member.find((m: any) => m["@name"] === "greatSuccessRate")["#text"] },
      { name: "greatFailRate", value: parsed.member.find((m: any) => m["@name"] === "greatFailRate")["#text"] },
      { name: "unknownID", value: parsed.member.find((m: any) => m["@name"] === "unknownID")["#text"] }
      ]];
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
        { name: 'groupID', value: this.selectedItem[1].value },
        { name: 'slot', value: this.selectedItem[2].value },
        { name: 'effectSubID', value: this.selectedItem[3].value },
        { name: 'itemID', value: this.selectedItem[4].value },
        { name: 'successRate', value: this.selectedItem[5].value },
        { name: 'failRate', value: this.selectedItem[6].value },
        { name: 'greatSuccessRate', value: this.selectedItem[7].value },
        { name: 'greatFailRate', value: this.selectedItem[8].value },
        { name: 'unknownID', value: this.selectedItem[9].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'groupID', value: 0 },
        { name: 'slot', value: 0 },
        { name: 'effectSubID', value: 0 },
        { name: 'itemID', value: 0 },
        { name: 'successRate', value: 0 },
        { name: 'failRate', value: 0 },
        { name: 'greatSuccessRate', value: 0 },
        { name: 'greatFailRate', value: 0 },
        { name: 'unknownID', value: -1 }
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
      this.content.forEach((item: modificationExtDataStructure) => {
        // Write the opening tag for the item

        xml += '	<object name="MiModificationExtRecipeData">\n';


        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="groupID">${item[1].value}</member>\n`;
        xml += `    <member name="slot">${item[2].value}</member>\n`;
        xml += `    <member name="effectSubID">${item[3].value}</member>\n`;
        xml += `    <member name="itemID">${item[4].value}</member>\n`;
        xml += `    <member name="successRate">${item[5].value}</member>\n`;
        xml += `    <member name="failRate">${item[6].value}</member>\n`;
        xml += `    <member name="greatSuccessRate">${item[7].value}</member>\n`;
        xml += `    <member name="greatFailRate">${item[8].value}</member>\n`;
        xml += `    <member name="unknownID">${item[9].value}</member>\n`;

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
