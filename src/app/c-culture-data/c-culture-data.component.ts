import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cSynthCataDataStructure = [
  { name: 'upperLimit', value: number },
  { name: 'level1Min', value: number },
  { name: 'level1Text', value: string },
  { name: 'level2Min', value: number },
  { name: 'level2Text', value: string },
  { name: 'level3Min', value: number },
  { name: 'level3Text', value: string },
  { name: 'level4Min', value: number },
  { name: 'level4Text', value: string },
  { name: 'level5Min', value: number },
  { name: 'level5Text', value: string },
  { name: 'unknown', value: number },
];

@Component({
  selector: 'app-c-culture-data',
  templateUrl: './c-culture-data.component.html',
  styleUrls: ['./c-culture-data.component.scss']
})
export class CCultureDataComponent {
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

  async parseData(json: string) {
    try {
      const parsed = JSON.parse(json);
      console.log(parsed);
      let items: any[] = [];
      items = items = [[
        { name: "upperLimit", value: parsed.member.find((m: any) => m["@name"] === "upperLimit")["#text"] },
        { name: "level1Min", value: parsed.member.find((m: any) => m["@name"] === "level1Min")["#text"] },
        { name: "level1Text", value: parsed.member.find((m: any) => m["@name"] === "level1Text")["#text"] },
        { name: "level2Min", value: parsed.member.find((m: any) => m["@name"] === "level2Min")["#text"] },
        { name: "level2Text", value: parsed.member.find((m: any) => m["@name"] === "level2Text")["#text"] },
        { name: "level3Min", value: parsed.member.find((m: any) => m["@name"] === "level3Min")["#text"] },
        { name: "level3Text", value: parsed.member.find((m: any) => m["@name"] === "level3Text")["#text"] },
        { name: "level4Min", value: parsed.member.find((m: any) => m["@name"] === "level4Min")["#text"] },
        { name: "level4Text", value: parsed.member.find((m: any) => m["@name"] === "level4Text")["#text"] },
        { name: "level5Min", value: parsed.member.find((m: any) => m["@name"] === "level5Min")["#text"] },
        { name: "level5Text", value: parsed.member.find((m: any) => m["@name"] === "level5Text")["#text"] },
        { name: "unknown", value: parsed.member.find((m: any) => m["@name"] === "unknown")["#text"] },
      ]];
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
      this.selectedItem = this.content[0];
      this.editingItem = [
        { name: "upperLimit", value: this.selectedItem[0].value },
        { name: "level1Min", value: this.selectedItem[1].value },
        { name: "level1Text", value: this.selectedItem[2].value },
        { name: "level2Min", value: this.selectedItem[3].value },
        { name: "level2Text", value: this.selectedItem[4].value },
        { name: "level3Min", value: this.selectedItem[5].value },
        { name: "level3Text", value: this.selectedItem[6].value },
        { name: "level4Min", value: this.selectedItem[7].value },
        { name: "level4Text", value: this.selectedItem[8].value },
        { name: "level5Min", value: this.selectedItem[9].value },
        { name: "level5Text", value: this.selectedItem[10].value },
        { name: "unknown", value: this.selectedItem[11].value },
      ];
    }
    else {
      this.editingItem = [
        { name: "upperLimit", value: 0 },
        { name: "level1Min", value: 0 },
        { name: "level1Text", value: 0 },
        { name: "level2Min", value: 0 },
        { name: "level2Text", value: 0 },
        { name: "level3Min", value: 0 },
        { name: "level3Text", value: 0 },
        { name: "level4Min", value: 0 },
        { name: "level4Text", value: 0 },
        { name: "level5Min", value: 0 },
        { name: "level5Text", value: 0 },
        { name: "unknown", value: 0 },
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
    this.content[0] = this.editingItem;
    this.cancelEdit();
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
      this.content.forEach((item: cSynthCataDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCCultureData">\n';
        xml += `    <member name="upperLimit">${item[0].value || 0}</member>\n`;
        xml += `    <member name="level1Min">${item[1].value || 0}</member>\n`;
        xml += `    <member name="level1Text"><![CDATA[${item[2].value || ""}]]></member>\n`;
        xml += `    <member name="level2Min">${item[3].value || 0}</member>\n`;
        xml += `    <member name="level2Text"><![CDATA[${item[4].value || ""}]]></member>\n`;
        xml += `    <member name="level3Min">${item[5].value || 0}</member>\n`;
        xml += `    <member name="level3Text"><![CDATA[${item[6].value || ""}]]></member>\n`;
        xml += `    <member name="level4Min">${item[7].value || 0}</member>\n`;
        xml += `    <member name="level4Text"><![CDATA[${item[8].value || ""}]]></member>\n`;
        xml += `    <member name="level5Min">${item[9].value || 0}</member>\n`;
        xml += `    <member name="level5Text"><![CDATA[${item[10].value || ""}]]></member>\n`;
        xml += `    <member name="unknown">${item[11].value || 0}</member>\n`;
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
