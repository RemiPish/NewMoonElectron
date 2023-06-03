import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type aiDataStructure = [
  { name: 'ID', value: number },
  { name: 'aggroLevelLimit', value: number },
  { name: 'normalDistance', value: number },
  { name: 'normalFOV', value: number },
  { name: 'nightDistance', value: number },
  { name: 'nightFOV', value: number },
  { name: 'castDistance', value: number },
  { name: 'castFOV', value: number },
  { name: 'thinkSpeed', value: number },
  { name: 'deaggroScale', value: number },
  { name: 'strikeFirst', value: boolean },
  { name: 'normalSkillUse', value: boolean },
  { name: 'aggroLimit', value: number }
]

@Component({
  selector: 'app-ai-data',
  templateUrl: './ai-data.component.html',
  styleUrls: ['./ai-data.component.scss']
})
export class AiDataComponent {

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
            { name: "aggroLevelLimit", value: item.member.find((m: any) => m["@name"] === "aggroLevelLimit")["#text"] },
            { name: "normalDistance", value: item.member.find((m: any) => m["@name"] === "aggroNormal").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
            { name: "normalFOV", value: item.member.find((m: any) => m["@name"] === "aggroNormal").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
            { name: "nightDistance", value: item.member.find((m: any) => m["@name"] === "aggroNight").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
            { name: "nightFOV", value: item.member.find((m: any) => m["@name"] === "aggroNight").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
            { name: "castDistance", value: item.member.find((m: any) => m["@name"] === "aggroCast").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
            { name: "castFOV", value: item.member.find((m: any) => m["@name"] === "aggroCast").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
            { name: "thinkSpeed", value: item.member.find((m: any) => m["@name"] === "thinkSpeed")["#text"] },
            { name: "deaggroScale", value: item.member.find((m: any) => m["@name"] === "deaggroScale")["#text"] },
            { name: "strikeFirst", value: item.member.find((m: any) => m["@name"] === "strikeFirst")["#text"] },
            { name: "normalSkillUse", value: item.member.find((m: any) => m["@name"] === "normalSkillUse")["#text"] },
            { name: "aggroLimit", value: item.member.find((m: any) => m["@name"] === "aggroLimit")["#text"] }
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "aggroLevelLimit", value: parsed.member.find((m: any) => m["@name"] === "aggroLevelLimit")["#text"] },
      { name: "normalDistance", value: parsed.member.find((m: any) => m["@name"] === "aggroNormal").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
      { name: "normalFOV", value: parsed.member.find((m: any) => m["@name"] === "aggroNormal").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
      { name: "nightDistance", value: parsed.member.find((m: any) => m["@name"] === "aggroNight").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
      { name: "nightFOV", value: parsed.member.find((m: any) => m["@name"] === "aggroNight").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
      { name: "castDistance", value: parsed.member.find((m: any) => m["@name"] === "aggroCast").object.member.find((m: any) => m["@name"] === "distance")["#text"] },
      { name: "castFOV", value: parsed.member.find((m: any) => m["@name"] === "aggroCast").object.member.find((m: any) => m["@name"] === "FOV")["#text"] },
      { name: "thinkSpeed", value: parsed.member.find((m: any) => m["@name"] === "thinkSpeed")["#text"] },
      { name: "deaggroScale", value: parsed.member.find((m: any) => m["@name"] === "deaggroScale")["#text"] },
      { name: "strikeFirst", value: parsed.member.find((m: any) => m["@name"] === "strikeFirst")["#text"] },
      { name: "normalSkillUse", value: parsed.member.find((m: any) => m["@name"] === "normalSkillUse")["#text"] },
      { name: "aggroLimit", value: parsed.member.find((m: any) => m["@name"] === "aggroLimit")["#text"] }
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
        { name: 'aggroLevelLimit', value: this.selectedItem[1].value },
        { name: 'normalDistance', value: this.selectedItem[2].value },
        { name: 'normalFOV', value: this.selectedItem[3].value },
        { name: 'nightDistance', value: this.selectedItem[4].value },
        { name: 'nightFOV', value: this.selectedItem[5].value },
        { name: 'castDistance', value: this.selectedItem[6].value },
        { name: 'castFOV', value: this.selectedItem[7].value },
        { name: 'thinkSpeed', value: this.selectedItem[8].value },
        { name: 'deaggroScale', value: this.selectedItem[9].value },
        { name: 'strikeFirst', value: this.selectedItem[10].value },
        { name: 'normalSkillUse', value: this.selectedItem[11].value },
        { name: 'aggroLimit', value: this.selectedItem[12].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'aggroLevelLimit', value: 0 },
        { name: 'normalDistance', value: 0 },
        { name: 'normalFOV', value: 0 },
        { name: 'nightDistance', value: 0 },
        { name: 'nightFOV', value: 0 },
        { name: 'castDistance', value: 0 },
        { name: 'castFOV', value: 0 },
        { name: 'thinkSpeed', value: 0 },
        { name: 'deaggroScale', value: 0 },
        { name: 'strikeFirst', value: false },
        { name: 'normalSkillUse', value: false },
        { name: 'aggroLimit', value: 0 }
      ];
    }
    console.log(this.editingItem);
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
      this.content.forEach((item: aiDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiAIData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="aggroLevelLimit">${item[1].value}</member>\n`;
        xml += `    <member name="aggroNormal">\n`;
        xml += `      <object name="MiFindInfo">\n`;
        xml += `        <member name="distance">${item[2].value}</member>\n`;
        xml += `        <member name="FOV">${item[3].value}</member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="aggroNight">\n`;
        xml += `      <object name="MiFindInfo">\n`;
        xml += `        <member name="distance">${item[4].value}</member>\n`;
        xml += `        <member name="FOV">${item[5].value}</member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="aggroCast">\n`;
        xml += `      <object name="MiFindInfo">\n`;
        xml += `        <member name="distance">${item[6].value}</member>\n`;
        xml += `        <member name="FOV">${item[7].value}</member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="thinkSpeed">${item[8].value}</member>\n`;
        xml += `    <member name="deaggroScale">${item[9].value}</member>\n`;
        xml += `    <member name="strikeFirst">${item[10].value}</member>\n`;
        xml += `    <member name="normalSkillUse">${item[11].value}</member>\n`;
        xml += `    <member name="aggroLimit">${item[12].value}</member>\n`;
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
