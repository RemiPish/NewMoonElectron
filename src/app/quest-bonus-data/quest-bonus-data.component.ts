import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type questBonusDataStructure = [
  { name: 'ID', value: number },
  { name: 'questCount', value: number },
  { name: 'effect1', value: number },
  { name: 'boost1', value: number },
  { name: 'fixed1', value: number },
  { name: 'effect2', value: number },
  { name: 'boost2', value: number },
  { name: 'fixed2', value: number },
  { name: 'effect3', value: number },
  { name: 'boost3', value: number },
  { name: 'fixed3', value: number },
  { name: 'description', value: string }
]


@Component({
  selector: 'app-quest-bonus-data',
  templateUrl: './quest-bonus-data.component.html',
  styleUrls: ['./quest-bonus-data.component.scss']
})
export class QuestBonusDataComponent {
  contentJson: string = "";
  @Input() fileMode: string = "";
  @Input() type: string = "";
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
      const desStr = String(item[11].value).toLowerCase();
      return idStr.includes(searchStr)|| desStr.includes(searchStr);
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
            { name: "questCount", value: item.member.find((m: any) => m["@name"] === "questCount")["#text"] },
            { name: "effect1", value: item.member.find((m: any) => m["@name"] === "effect1")["#text"] },
            { name: "boost1", value: item.member.find((m: any) => m["@name"] === "boost1")["#text"] },
            { name: "fixed1", value: item.member.find((m: any) => m["@name"] === "fixed1")["#text"] },
            { name: "effect2", value: item.member.find((m: any) => m["@name"] === "effect2")["#text"] },
            { name: "boost2", value: item.member.find((m: any) => m["@name"] === "boost2")["#text"] },
            { name: "fixed2", value: item.member.find((m: any) => m["@name"] === "fixed2")["#text"] },
            { name: "effect3", value: item.member.find((m: any) => m["@name"] === "effect3")["#text"] },
            { name: "boost3", value: item.member.find((m: any) => m["@name"] === "boost3")["#text"] },
            { name: "fixed3", value: item.member.find((m: any) => m["@name"] === "fixed3")["#text"] },
            { name: "description", value: item.member.find((m: any) => m["@name"] === "description")["#text"] }
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "questCount", value: parsed.member.find((m: any) => m["@name"] === "questCount")["#text"] },
      { name: "effect1", value: parsed.member.find((m: any) => m["@name"] === "effect1")["#text"] },
      { name: "boost1", value: parsed.member.find((m: any) => m["@name"] === "boost1")["#text"] },
      { name: "fixed1", value: parsed.member.find((m: any) => m["@name"] === "fixed1")["#text"] },
      { name: "effect2", value: parsed.member.find((m: any) => m["@name"] === "effect2")["#text"] },
      { name: "boost2", value: parsed.member.find((m: any) => m["@name"] === "boost2")["#text"] },
      { name: "fixed2", value: parsed.member.find((m: any) => m["@name"] === "fixed2")["#text"] },
      { name: "effect3", value: parsed.member.find((m: any) => m["@name"] === "effect3")["#text"] },
      { name: "boost3", value: parsed.member.find((m: any) => m["@name"] === "boost3")["#text"] },
      { name: "fixed3", value: parsed.member.find((m: any) => m["@name"] === "fixed3")["#text"] },
      { name: "description", value: parsed.member.find((m: any) => m["@name"] === "description")["#text"] }]]


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
        { name: 'questCount', value: this.selectedItem[1].value },
        { name: 'effect1', value: this.selectedItem[2].value },
        { name: 'boost1', value: this.selectedItem[3].value },
        { name: 'fixed1', value: this.selectedItem[4].value },
        { name: 'effect2', value: this.selectedItem[5].value },
        { name: 'boost2', value: this.selectedItem[6].value },
        { name: 'fixed2', value: this.selectedItem[7].value },
        { name: 'effect3', value: this.selectedItem[8].value },
        { name: 'boost3', value: this.selectedItem[9].value },
        { name: 'fixed3', value: this.selectedItem[10].value },
        { name: 'description', value: this.selectedItem[11].value }

      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'questCount', value: 0 },
        { name: 'effect1', value: 0 },
        { name: 'boost1', value: 0 },
        { name: 'fixed1', value: 0 },
        { name: 'effect2', value: 0 },
        { name: 'boost2', value: 0 },
        { name: 'fixed2', value: 0 },
        { name: 'effect3', value: 0 },
        { name: 'boost3', value: 0 },
        { name: 'fixed3', value: 0 },
        { name: 'description', value: "" }
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
      this.content.forEach((item: questBonusDataStructure) => {

        xml += '  <object name="MiQuestBonusData">\n';

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="questCount">${item[1].value}</member>\n`;
        xml += `    <member name="effect1">${item[2].value}</member>\n`;
        xml += `    <member name="boost1">${item[3].value}</member>\n`;
        xml += `    <member name="fixed1">${item[4].value}</member>\n`;
        xml += `    <member name="effect2">${item[5].value}</member>\n`;
        xml += `    <member name="boost2">${item[6].value}</member>\n`;
        xml += `    <member name="fixed2">${item[7].value}</member>\n`;
        xml += `    <member name="effect3">${item[8].value}</member>\n`;
        xml += `    <member name="boost3">${item[9].value}</member>\n`;
        xml += `    <member name="fixed3">${item[10].value}</member>\n`;
        xml += `    <member name="description"><![CDATA[${item[11].value}]]></member>\n`;
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
