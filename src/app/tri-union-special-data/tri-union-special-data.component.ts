import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type triUnionSpecialDataStructure = [
  { name: 'ID', value: number },
  { name: 'isTriFusion', value: boolean },
  { name: 'triunion4', value: number },
  { name: 'enabled', value: boolean },
  { name: 'resultID', value: number },
  { name: 'pluginID', value: number },
  { name: 'variant1Allowed', value: number },
  { name: 'sourceID1', value: number },
  { name: 'variant2Allowed', value: number },
  { name: 'sourceID2', value: number },
  { name: 'variant3Allowed', value: number },
  { name: 'sourceID3', value: number },
];

@Component({
  selector: 'app-tri-union-special-data',
  templateUrl: './tri-union-special-data.component.html',
  styleUrls: ['./tri-union-special-data.component.scss']
})
export class TriUnionSpecialDataComponent {
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
      const resStr = String(item[4].value).toLowerCase();
      const pluginStr = String(item[5].value).toLowerCase();
      const sourceID1Str = String(item[7].value).toLowerCase();
      const sourceID2Str = String(item[9].value).toLowerCase();
      const sourceID3Str = String(item[11].value).toLowerCase();
      return idStr.includes(searchStr) || (pluginStr.includes(searchStr) && sourceID1Str.includes(searchStr) && sourceID2Str.includes(searchStr) && sourceID3Str.includes(searchStr) && resStr.includes(searchStr));
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
      if (parsed.length) {
        const items = await Promise.all(parsed.map(async (item: any) => {
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "isTriFusion", value: item.member.find((m: any) => m["@name"] === "isTriFusion")["#text"] },
            { name: "triunion4", value: item.member.find((m: any) => m["@name"] === "triunion4")["#text"] },
            { name: "enabled", value: item.member.find((m: any) => m["@name"] === "enabled")["#text"] },
            { name: "resultID", value: item.member.find((m: any) => m["@name"] === "resultID")["#text"] },
            { name: "pluginID", value: item.member.find((m: any) => m["@name"] === "pluginID")["#text"] },
            { name: "variant1Allowed", value: item.member.find((m: any) => m["@name"] === "variant1Allowed")["#text"] },
            { name: "sourceID1", value: item.member.find((m: any) => m["@name"] === "sourceID1")["#text"] },
            { name: "variant2Allowed", value: item.member.find((m: any) => m["@name"] === "variant2Allowed")["#text"] },
            { name: "sourceID2", value: item.member.find((m: any) => m["@name"] === "sourceID2")["#text"] },
            { name: "variant3Allowed", value: item.member.find((m: any) => m["@name"] === "variant3Allowed")["#text"] },
            { name: "sourceID3", value: item.member.find((m: any) => m["@name"] === "sourceID3")["#text"] }
          ];
        }));

        return items;
      }
      else return [[
        { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "isTriFusion", value: parsed.member.find((m: any) => m["@name"] === "isTriFusion")["#text"] },
        { name: "triunion4", value: parsed.member.find((m: any) => m["@name"] === "triunion4")["#text"] },
        { name: "enabled", value: parsed.member.find((m: any) => m["@name"] === "enabled")["#text"] },
        { name: "resultID", value: parsed.member.find((m: any) => m["@name"] === "resultID")["#text"] },
        { name: "pluginID", value: parsed.member.find((m: any) => m["@name"] === "pluginID")["#text"] },
        { name: "variant1Allowed", value: parsed.member.find((m: any) => m["@name"] === "variant1Allowed")["#text"] },
        { name: "sourceID1", value: parsed.member.find((m: any) => m["@name"] === "sourceID1")["#text"] },
        { name: "variant2Allowed", value: parsed.member.find((m: any) => m["@name"] === "variant2Allowed")["#text"] },
        { name: "sourceID2", value: parsed.member.find((m: any) => m["@name"] === "sourceID2")["#text"] },
        { name: "variant3Allowed", value: parsed.member.find((m: any) => m["@name"] === "variant3Allowed")["#text"] },
        { name: "sourceID3", value: parsed.member.find((m: any) => m["@name"] === "sourceID3")["#text"] }
      ]]
    }
    catch (error) {
      console.log(error)
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
        { name: 'isTriFusion', value: this.selectedItem[1].value },
        { name: 'triunion4', value: this.selectedItem[2].value },
        { name: 'enabled', value: this.selectedItem[3].value },
        { name: 'resultID', value: this.selectedItem[4].value },
        { name: 'pluginID', value: this.selectedItem[5].value },
        { name: 'variant1Allowed', value: this.selectedItem[6].value },
        { name: 'sourceID1', value: this.selectedItem[7].value },
        { name: 'variant2Allowed', value: this.selectedItem[8].value },
        { name: 'sourceID2', value: this.selectedItem[9].value },
        { name: 'variant3Allowed', value: this.selectedItem[10].value },
        { name: 'sourceID3', value: this.selectedItem[11].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'isTriFusion', value: true },
        { name: 'triunion4', value: 0 },
        { name: 'enabled', value: true },
        { name: 'resultID', value: 0 },
        { name: 'pluginID', value: 0 },
        { name: 'variant1Allowed', value: 1 },
        { name: 'sourceID1', value: 0 },
        { name: 'variant2Allowed', value: 1 },
        { name: 'sourceID2', value: 0 },
        { name: 'variant3Allowed', value: 1 },
        { name: 'sourceID3', value: 0 }
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
      this.content.forEach((item: triUnionSpecialDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiTriUnionSpecialData">\n';

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="isTriFusion">${item[1].value}</member>\n`;
        xml += `    <member name="triunion4">${item[2].value}</member>\n`;
        xml += `    <member name="enabled">${item[3].value}</member>\n`;
        xml += `    <member name="resultID">${item[4].value}</member>\n`;
        xml += `    <member name="pluginID">${item[5].value}</member>\n`;
        xml += `    <member name="variant1Allowed">${item[6].value}</member>\n`;
        xml += `    <member name="sourceID1">${item[7].value}</member>\n`;
        xml += `    <member name="variant2Allowed">${item[8].value}</member>\n`;
        xml += `    <member name="sourceID2">${item[9].value}</member>\n`;
        xml += `    <member name="variant3Allowed">${item[10].value}</member>\n`;
        xml += `    <member name="sourceID3">${item[11].value}</member>\n`;

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
