import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type modificationExtEffectDataStructure = [
  { name: 'groupID', value: number },
  { name: 'slot', value: number },
  { name: 'subID', value: number },
  { name: 'rateScaling', value: number[] },
  { name: 'type', value: number },
  { name: 'sequenceID', value: number },
  { name: 'tokusei', value: number },
  { name: 'sequenceID2', value: number },
  { name: 'shortDesc', value: string },
  { name: 'fullDesc', value: string },
];

@Component({
  selector: 'app-modification-ext-effect-data',
  templateUrl: './modification-ext-effect-data.component.html',
  styleUrls: ['./modification-ext-effect-data.component.scss']
})
export class ModificationExtEffectDataComponent {
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
      const items = await Promise.all(parsed.map(async (item: any) => {
        return [
          { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
          { name: "slot", value: item.member.find((m: any) => m["@name"] === "slot")["#text"] },
          { name: "subID", value: item.member.find((m: any) => m["@name"] === "subID")["#text"] },
          {
            name: "rateScaling", value: [item.member.find((m: any) => m["@name"] === "rateScaling").element[0],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[1],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[2],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[3],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[4],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[5],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[6],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[7]]
          },
          { name: "type", value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
          { name: "sequenceID", value: item.member.find((m: any) => m["@name"] === "sequenceID")["#text"] },
          { name: "tokusei", value: item.member.find((m: any) => m["@name"] === "tokusei")["#text"] },
          { name: "sequenceID2", value: item.member.find((m: any) => m["@name"] === "sequenceID2")["#text"] },
          { name: "shortDesc", value: item.member.find((m: any) => m["@name"] === "shortDesc")["#text"] },
          { name: "fullDesc", value: item.member.find((m: any) => m["@name"] === "fullDesc")["#text"] }
        ];
      }));
      return items;
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
        { name: 'groupID', value: this.selectedItem[0].value },
        { name: 'slot', value: this.selectedItem[1].value },
        { name: 'subID', value: this.selectedItem[2].value },

        {
          name: "rateScaling", value: [this.selectedItem[3].value[0],
          this.selectedItem[3].value[1],
          this.selectedItem[3].value[2],
          this.selectedItem[3].value[3],
          this.selectedItem[3].value[4],
          this.selectedItem[3].value[5],
          this.selectedItem[3].value[6],
          this.selectedItem[3].value[7]]
        },
        { name: 'type', value: this.selectedItem[4].value },
        { name: 'sequenceID', value: this.selectedItem[5].value },
        { name: 'tokusei', value: this.selectedItem[6].value },
        { name: 'sequenceID2', value: this.selectedItem[7].value },
        { name: 'shortDesc', value: this.selectedItem[8].value },
        {
          name: 'fullDesc', value: this.selectedItem[9].value
        }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'groupID', value: 0 },
        { name: 'slot', value: 0 },
        { name: 'subID', value: 0 },
        { name: "rateScaling", value: [0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'type', value: 0 },
        { name: 'sequenceID', value: 0 },
        { name: 'tokusei', value: 0 },
        { name: 'sequenceID2', value: 0 },
        { name: 'shortDesc', value: "" },
        {
          name: 'fullDesc', value: ""
        }
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'groupID').value === editId) {
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
      this.content.forEach((item: modificationExtEffectDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiModificationExtEffectData">\n';

        xml += `    <member name="groupID">${item[0].value}</member>\n`;
        xml += `    <member name="slot">${item[1].value}</member>\n`;
        xml += `    <member name="subID">${item[2].value}</member>\n`;
        xml += `    <member name="rateScaling">\n`;
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `      <element>${item[3].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="type">${item[4].value}</member>\n`;
        xml += `    <member name="sequenceID">${item[5].value}</member>\n`;
        xml += `    <member name="tokusei">${item[6].value}</member>\n`;
        xml += `    <member name="sequenceID2">${item[7].value}</member>\n`;
        xml += `    <member name="shortDesc"><![CDATA[${item[8].value}]]></member>\n`;
        xml += `    <member name="fullDesc"><![CDATA[${item[9].value}]]></member>\n`;
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
