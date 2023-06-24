import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type modificationDataStructure = [
  { name: 'ID', value: number },
  { name: 'effectID', value: number },
  { name: 'slot', value: number },
  { name: 'greatFailItemCount', value: number },
  { name: 'greatFailItemType', value: number },
  { name: 'itemID', value: number },
  { name: 'successRate', value: number },
  { name: 'failRate', value: number },
  { name: 'greatSuccessRate', value: number },
  { name: 'greatFailRate', value: number }
];

@Component({
  selector: 'app-modification-data',
  templateUrl: './modification-data.component.html',
  styleUrls: ['./modification-data.component.scss']
})
export class ModificationDataComponent {
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
            { name: "effectID", value: item.member.find((m: any) => m["@name"] === "effectID")["#text"] },
            { name: "slot", value: item.member.find((m: any) => m["@name"] === "slot")["#text"] },
            { name: "greatFailItemCount", value: item.member.find((m: any) => m["@name"] === "greatFailItemCount")["#text"] },
            { name: "greatFailItemType", value: item.member.find((m: any) => m["@name"] === "greatFailItemType")["#text"] },
            { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
            { name: "successRate", value: item.member.find((m: any) => m["@name"] === "successRate")["#text"] },
            { name: "failRate", value: item.member.find((m: any) => m["@name"] === "failRate")["#text"] },
            { name: "greatSuccessRate", value: item.member.find((m: any) => m["@name"] === "greatSuccessRate")["#text"] },
            { name: "greatFailRate", value: item.member.find((m: any) => m["@name"] === "greatFailRate")["#text"] }
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "effectID", value: parsed.member.find((m: any) => m["@name"] === "effectID")["#text"] },
      { name: "slot", value: parsed.member.find((m: any) => m["@name"] === "slot")["#text"] },
      { name: "greatFailparsedCount", value: parsed.member.find((m: any) => m["@name"] === "greatFailparsedCount")["#text"] },
      { name: "greatFailparsedType", value: parsed.member.find((m: any) => m["@name"] === "greatFailparsedType")["#text"] },
      { name: "parsedID", value: parsed.member.find((m: any) => m["@name"] === "parsedID")["#text"] },
      { name: "successRate", value: parsed.member.find((m: any) => m["@name"] === "successRate")["#text"] },
      { name: "failRate", value: parsed.member.find((m: any) => m["@name"] === "failRate")["#text"] },
      { name: "greatSuccessRate", value: parsed.member.find((m: any) => m["@name"] === "greatSuccessRate")["#text"] },
      { name: "greatFailRate", value: parsed.member.find((m: any) => m["@name"] === "greatFailRate")["#text"] }
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
        { name: 'effectID', value: this.selectedItem[1].value },
        { name: 'slot', value: this.selectedItem[2].value },
        { name: 'greatFailItemCount', value: this.selectedItem[3].value },
        { name: 'greatFailItemType', value: this.selectedItem[4].value },
        { name: 'itemID', value: this.selectedItem[5].value },
        { name: 'successRate', value: this.selectedItem[6].value },
        { name: 'failRate', value: this.selectedItem[7].value },
        { name: 'greatSuccessRate', value: this.selectedItem[8].value },
        { name: 'greatFailRate', value: this.selectedItem[9].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'effectID', value: 0 },
        { name: 'slot', value: 0 },
        { name: 'greatFailItemCount', value: 0 },
        { name: 'greatFailItemType', value: 0 },
        { name: 'itemID', value: 1 },
        { name: 'successRate', value: 0 },
        { name: 'failRate', value: 0 },
        { name: 'greatSuccessRate', value: 0 },
        { name: 'greatFailRate', value: 0 }
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
      this.content.forEach((item: modificationDataStructure) => {
        // Write the opening tag for the item

        xml += '	<object name="MiModificationExtRecipeData">\n';


        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="effectID">${item[1].value}</member>\n`;
        xml += `    <member name="slot">${item[2].value}</member>\n`;
        xml += `    <member name="greatFailItemCount">${item[3].value}</member>\n`;
        xml += `    <member name="greatFailItemType">${item[4].value}</member>\n`;
        xml += `    <member name="itemID">${item[5].value}</member>\n`;
        xml += `    <member name="successRate">${item[6].value}</member>\n`;
        xml += `    <member name="failRate">${item[7].value}</member>\n`;
        xml += `    <member name="greatSuccessRate">${item[8].value}</member>\n`;
        xml += `    <member name="greatFailRate">${item[9].value}</member>\n`;

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
