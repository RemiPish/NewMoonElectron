import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type warpPointDataStructure = [
  { name: 'ID', value: number },
  { name: 'spotID', value: number },
  { name: 'zoneID', value: number },
  { name: 'x', value: number },
  { name: 'y', value: number },
  { name: 'rotation', value: number },
  { name: 'name', value: string },
  { name: 'restrictionType1', value: number },
  { name: 'restrictionValue1', value: number },
  { name: 'restrictionType2', value: number },
  { name: 'restrictionValue2', value: number },
  { name: 'restrictionType3', value: number },
  { name: 'restrictionValue3', value: number },
  { name: 'headerID', value: number },
  { name: 'groupingID', value: number },

];
@Component({
  selector: 'app-warp-point-data',
  templateUrl: './warp-point-data.component.html',
  styleUrls: ['./warp-point-data.component.scss']
})
export class WarpPointDataComponent {
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
      const nameStr = String(item[6].value).toLowerCase();
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
      if (parsed.length) {
        const items = await Promise.all(parsed.map(async (item: any) => {
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "spotID", value: item.member.find((m: any) => m["@name"] === "spotID")["#text"] },
            { name: "zoneID", value: item.member.find((m: any) => m["@name"] === "zoneID")["#text"] },
            { name: "x", value: item.member.find((m: any) => m["@name"] === "x")["#text"] },
            { name: "y", value: item.member.find((m: any) => m["@name"] === "y")["#text"] },
            { name: "rotation", value: item.member.find((m: any) => m["@name"] === "rotation")["#text"] },
            { name: "name", value: item.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "restrictionType1", value: item.member.find((m: any) => m["@name"] === "restrictionType1")["#text"] },
            { name: "restrictionValue1", value: item.member.find((m: any) => m["@name"] === "restrictionValue1")["#text"] },
            { name: "restrictionType2", value: item.member.find((m: any) => m["@name"] === "restrictionType2")["#text"] },
            { name: "restrictionValue2", value: item.member.find((m: any) => m["@name"] === "restrictionValue2")["#text"] },
            { name: "restrictionType3", value: item.member.find((m: any) => m["@name"] === "restrictionType3")["#text"] },
            { name: "restrictionValue3", value: item.member.find((m: any) => m["@name"] === "restrictionValue3")["#text"] },
            { name: "headerID", value: item.member.find((m: any) => m["@name"] === "headerID")["#text"] },
            { name: "groupingID", value: item.member.find((m: any) => m["@name"] === "groupingID")["#text"] },
          ];
        }));

        return items;
      }
      else return [[
        { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "spotID", value: parsed.member.find((m: any) => m["@name"] === "spotID")["#text"] },
        { name: "zoneID", value: parsed.member.find((m: any) => m["@name"] === "zoneID")["#text"] },
        { name: "x", value: parsed.member.find((m: any) => m["@name"] === "x")["#text"] },
        { name: "y", value: parsed.member.find((m: any) => m["@name"] === "y")["#text"] },
        { name: "rotation", value: parsed.member.find((m: any) => m["@name"] === "rotation")["#text"] },
        { name: "name", value: parsed.member.find((m: any) => m["@name"] === "name")["#text"] },
        { name: "restrictionType1", value: parsed.member.find((m: any) => m["@name"] === "restrictionType1")["#text"] },
        { name: "restrictionValue1", value: parsed.member.find((m: any) => m["@name"] === "restrictionValue1")["#text"] },
        { name: "restrictionType2", value: parsed.member.find((m: any) => m["@name"] === "restrictionType2")["#text"] },
        { name: "restrictionValue2", value: parsed.member.find((m: any) => m["@name"] === "restrictionValue2")["#text"] },
        { name: "restrictionType3", value: parsed.member.find((m: any) => m["@name"] === "restrictionType3")["#text"] },
        { name: "restrictionValue3", value: parsed.member.find((m: any) => m["@name"] === "restrictionValue3")["#text"] },
        { name: "headerID", value: parsed.member.find((m: any) => m["@name"] === "headerID")["#text"] },
        { name: "groupingID", value: parsed.member.find((m: any) => m["@name"] === "groupingID")["#text"] },
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
        { name: 'spotID', value: this.selectedItem[1].value },
        { name: 'zoneID', value: this.selectedItem[2].value },
        { name: 'x', value: this.selectedItem[3].value },
        { name: 'y', value: this.selectedItem[4].value },
        { name: 'rotation', value: this.selectedItem[5].value },
        { name: 'name', value: this.selectedItem[6].value },
        { name: 'restrictionType1', value: this.selectedItem[7].value },
        { name: 'restrictionValue1', value: this.selectedItem[8].value },
        { name: 'restrictionType2', value: this.selectedItem[9].value },
        { name: 'restrictionValue2', value: this.selectedItem[10].value },
        { name: 'restrictionType3', value: this.selectedItem[11].value },
        { name: 'restrictionValue3', value: this.selectedItem[12].value },
        { name: 'headerID', value: this.selectedItem[13].value },
        { name: 'groupingID', value: this.selectedItem[14].value },
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'spotID', value: 0 },
        { name: 'zoneID', value: 0 },
        { name: 'x', value: 0 },
        { name: 'y', value: 0 },
        { name: 'rotation', value: 0 },
        { name: 'name', value: '' },
        { name: 'restrictionType1', value: 0 },
        { name: 'restrictionValue1', value: 0 },
        { name: 'restrictionType2', value: 0 },
        { name: 'restrictionValue2', value: 0 },
        { name: 'restrictionType3', value: 0 },
        { name: 'restrictionValue3', value: 0 },
        { name: 'headerID', value: 0 },
        { name: 'groupingID', value: 0 }
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
      this.content.forEach((item: warpPointDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiWarpPointData">\n';

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="spotID">${item[1].value}</member>\n`;
        xml += `    <member name="zoneID">${item[2].value}</member>\n`;
        xml += `    <member name="x">${item[3].value}</member>\n`;
        xml += `    <member name="y">${item[4].value}</member>\n`;
        xml += `    <member name="rotation">${item[5].value}</member>\n`;
        xml += `    <member name="name"><![CDATA[${item[6].value || ''}]]></member>\n`;
        xml += `    <member name="restrictionType1">${item[7].value}</member>\n`;
        xml += `    <member name="restrictionValue1">${item[8].value}</member>\n`;
        xml += `    <member name="restrictionType2">${item[9].value}</member>\n`;
        xml += `    <member name="restrictionValue2">${item[10].value}</member>\n`;
        xml += `    <member name="restrictionType3">${item[11].value}</member>\n`;
        xml += `    <member name="restrictionValue3">${item[12].value}</member>\n`;
        xml += `    <member name="headerID">${item[13].value}</member>\n`;
        xml += `    <member name="groupingID">${item[14].value}</member>\n`;

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
