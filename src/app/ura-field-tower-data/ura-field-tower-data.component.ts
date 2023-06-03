import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type uraFieldTowerDataStructure = [
  { name: 'ID', value: number },
  { name: 'dungeonID', value: number },
  { name: 'letter', value: number },
  { name: 'name', value: string },
  { name: 'captureItem', value: number },
  { name: 'captureDuration', value: number },
  { name: 'phaseMiniBosses', value: number[] },
  { name: 'sealedActionType', value: number },
  { name: 'unusedDelay', value: number }
];

@Component({
  selector: 'app-ura-field-tower-data',
  templateUrl: './ura-field-tower-data.component.html',
  styleUrls: ['./ura-field-tower-data.component.scss']
})
export class UraFieldTowerDataComponent {
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
    this.content = await this.parseItemData(this.contentJson);
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
      const nameStr = item[1].value ? item[1].value.toLowerCase() : '';
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

  async parseItemData(json: string) {
    try {
      const parsed = JSON.parse(json);
      if (parsed.length) {
        const items = await Promise.all(parsed.map(async (item: any) => {
          let phaseMiniBosses: any[] = [];
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "phaseMiniBosses").element.length; i++) {
            phaseMiniBosses.push(item.member.find((m: any) => m["@name"] === "phaseMiniBosses").element[i]);
          }
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: 'dungeonID', value: item.member.find((m: any) => m["@name"] === "dungeonID")["#text"] },
            { name: 'letter', value: item.member.find((m: any) => m["@name"] === "letter")["#text"] },
            { name: 'name', value: item.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: 'captureItem', value: item.member.find((m: any) => m["@name"] === "captureItem")["#text"] },
            { name: 'captureDuration', value: item.member.find((m: any) => m["@name"] === "captureDuration")["#text"] },
            { name: 'phaseMiniBosses', value: phaseMiniBosses },
            { name: 'sealedActionType', value: item.member.find((m: any) => m["@name"] === "sealedActionType")["#text"] },
            { name: 'unusedDelay', value: item.member.find((m: any) => m["@name"] === "unusedDelay")["#text"] }
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        let phaseMiniBosses: any[] = [];
        for (let i = 0; i < parsed.member.find((m: any) => m["@name"] === "phaseMiniBosses").element.length; i++) {
          phaseMiniBosses.push(parsed.member.find((m: any) => m["@name"] === "phaseMiniBosses").element[i]);
        }
        return [[
          { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'dungeonID', value: parsed.member.find((m: any) => m["@name"] === "dungeonID")["#text"] },
          { name: 'letter', value: parsed.member.find((m: any) => m["@name"] === "letter")["#text"] },
          { name: 'name', value: parsed.member.find((m: any) => m["@name"] === "name")["#text"] },
          { name: 'captureparsed', value: parsed.member.find((m: any) => m["@name"] === "captureparsed")["#text"] },
          { name: 'captureDuration', value: parsed.member.find((m: any) => m["@name"] === "captureDuration")["#text"] },
          { name: 'phaseMiniBosses', value: phaseMiniBosses },
          { name: 'sealedActionType', value: parsed.member.find((m: any) => m["@name"] === "sealedActionType")["#text"] },
          { name: 'unusedDelay', value: parsed.member.find((m: any) => m["@name"] === "unusedDelay")["#text"] }
        ]];
      }
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
      let phaseMiniBosses: any[] = [];
      for (let i = 0; i < this.selectedItem[6].value.length; i++) {
        phaseMiniBosses.push(this.selectedItem[6].value[i]);
      }

      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: 'dungeonID', value: this.selectedItem[1].value },
        { name: 'letter', value: this.selectedItem[2].value },
        { name: 'name', value: this.selectedItem[3].value },
        { name: 'captureItem', value: this.selectedItem[4].value },
        { name: 'captureDuration', value: this.selectedItem[5].value },
        { name: 'phaseMiniBosses', value: phaseMiniBosses },
        { name: 'sealedActionType', value: this.selectedItem[7].value },
        { name: 'unusedDelay', value: this.selectedItem[8].value }

      ];
      //console.log(this.editingItem)
    }
    else {
      let phaseMiniBosses: any[] = [];
      for (let i = 0; i < 4; i++) {
        phaseMiniBosses.push(0);
      }
      this.editingItem = [
        { name: "ID", value: null },
        { name: 'dungeonID', value: 0 },
        { name: 'letter', value: 0 },
        { name: 'name', value: "" },
        { name: 'captureItem', value: 0 },
        { name: 'captureDuration', value: 0 },
        { name: 'phaseMiniBosses', value: phaseMiniBosses },
        { name: 'sealedActionType', value: 0 },
        { name: 'unusedDelay', value: 0 }
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
    console.log(event)
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: uraFieldTowerDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiUraFieldTowerData">\n';

        // Write the baseData element

        xml += `    <member name="dungeonID">${item[1].value}</member>\n`;
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="letter">${item[2].value}</member>\n`;
        xml += `    <member name="name"><![CDATA[${item[3].value || ""}]]></member>\n`;
        xml += `    <member name="captureItem">${item[4].value}</member>\n`;
        xml += `    <member name="captureDuration">${item[5].value}</member>\n`;
        xml += `    <member name="phaseMiniBosses">\n`;
        for (let i = 0; i < item[6].value.length; i++) {
          xml += `      <element>${item[6].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="sealedActionType">${item[7].value}</member>\n`;
        xml += `    <member name="unusedDelay">${item[8].value}</member>\n`;

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
