import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type timeLimitDataStructure = [
  { name: 'ID', value: number },
  { name: 'duration', value: number },
  { name: 'warningTime', value: number },
  { name: 'startMessage', value: string },
  { name: 'warningMessage', value: string },
  { name: 'successMessage', value: string },
  { name: 'failureMessage', value: string },
  { name: 'timeLimit8', value: number },
  { name: 'timeLimit9', value: number },
  { name: 'timeLimit10', value: number },
  { name: 'timeLimit11', value: number }
];

@Component({
  selector: 'app-time-limit-data',
  templateUrl: './time-limit-data.component.html',
  styleUrls: ['./time-limit-data.component.scss']
})
export class TimeLimitDataComponent {
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
      const resStr = String(item[3].value).toLowerCase();
      const pluginStr = String(item[4].value).toLowerCase();
      const sourceID1Str = String(item[5].value).toLowerCase();
      const sourceID2Str = String(item[6].value).toLowerCase();
      return idStr.includes(searchStr) || (pluginStr.includes(searchStr) && sourceID1Str.includes(searchStr) && sourceID2Str.includes(searchStr) && resStr.includes(searchStr));
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
            { name: "duration", value: item.member.find((m: any) => m["@name"] === "duration")["#text"] },
            { name: "warningTime", value: item.member.find((m: any) => m["@name"] === "warningTime")["#text"] },
            { name: "startMessage", value: item.member.find((m: any) => m["@name"] === "startMessage")["#text"] },
            { name: "warningMessage", value: item.member.find((m: any) => m["@name"] === "warningMessage")["#text"] },
            { name: "successMessage", value: item.member.find((m: any) => m["@name"] === "successMessage")["#text"] },
            { name: "failureMessage", value: item.member.find((m: any) => m["@name"] === "failureMessage")["#text"] },
            { name: "timeLimit8", value: item.member.find((m: any) => m["@name"] === "timeLimit8")["#text"] },
            { name: "timeLimit9", value: item.member.find((m: any) => m["@name"] === "timeLimit9")["#text"] },
            { name: "timeLimit10", value: item.member.find((m: any) => m["@name"] === "timeLimit10")["#text"] },
            { name: "timeLimit11", value: item.member.find((m: any) => m["@name"] === "timeLimit11")["#text"] }
          ];
        }));

        return items;
      }
      else return [[
        { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "duration", value: parsed.member.find((m: any) => m["@name"] === "duration")["#text"] },
        { name: "warningTime", value: parsed.member.find((m: any) => m["@name"] === "warningTime")["#text"] },
        { name: "startMessage", value: parsed.member.find((m: any) => m["@name"] === "startMessage")["#text"] },
        { name: "warningMessage", value: parsed.member.find((m: any) => m["@name"] === "warningMessage")["#text"] },
        { name: "successMessage", value: parsed.member.find((m: any) => m["@name"] === "successMessage")["#text"] },
        { name: "failureMessage", value: parsed.member.find((m: any) => m["@name"] === "failureMessage")["#text"] },
        { name: "timeLimit8", value: parsed.member.find((m: any) => m["@name"] === "timeLimit8")["#text"] },
        { name: "timeLimit9", value: parsed.member.find((m: any) => m["@name"] === "timeLimit9")["#text"] },
        { name: "timeLimit10", value: parsed.member.find((m: any) => m["@name"] === "timeLimit10")["#text"] },
        { name: "timeLimit11", value: parsed.member.find((m: any) => m["@name"] === "timeLimit11")["#text"] }
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
      if (id === 'zero') {
        this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === 0);
      }
      else this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'duration', value: this.selectedItem[1].value },
        { name: 'warningTime', value: this.selectedItem[2].value },
        { name: 'startMessage', value: this.selectedItem[3].value },
        { name: 'warningMessage', value: this.selectedItem[4].value },
        { name: 'successMessage', value: this.selectedItem[5].value },
        { name: 'failureMessage', value: this.selectedItem[6].value },
        { name: 'timeLimit8', value: this.selectedItem[7].value },
        { name: 'timeLimit9', value: this.selectedItem[8].value },
        { name: 'timeLimit10', value: this.selectedItem[9].value },
        { name: 'timeLimit11', value: this.selectedItem[10].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'duration', value: 0 },
        { name: 'warningTime', value: 0 },
        { name: 'startMessage', value: '' },
        { name: 'warningMessage', value: '' },
        { name: 'successMessage', value: '' },
        { name: 'failureMessage', value: '' },
        { name: 'timeLimit8', value: 0 },
        { name: 'timeLimit9', value: 0 },
        { name: 'timeLimit10', value: 0 },
        { name: 'timeLimit11', value: 0 }
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
      this.content.forEach((item: timeLimitDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiTimeLimitData">\n';

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="duration">${item[1].value}</member>\n`;
        xml += `    <member name="warningTime">${item[2].value}</member>\n`;
        xml += `    <member name="startMessage"><![CDATA[${item[3].value || ''}]]></member>\n`;
        xml += `    <member name="warningMessage"><![CDATA[${item[4].value || ''}]]></member>\n`;
        xml += `    <member name="successMessage"><![CDATA[${item[5].value || ''}]]></member>\n`;
        xml += `    <member name="failureMessage"><![CDATA[${item[6].value || ''}]]></member>\n`;
        xml += `    <member name="timeLimit8">${item[7].value}</member>\n`;
        xml += `    <member name="timeLimit9">${item[8].value}</member>\n`;
        xml += `    <member name="timeLimit10">${item[9].value}</member>\n`;
        xml += `    <member name="timeLimit11">${item[10].value}</member>\n`;

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
