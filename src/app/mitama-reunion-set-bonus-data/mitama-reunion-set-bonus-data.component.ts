import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type dataStructure = [
  { name: 'ID', value: number },
  { name: 'mitamaRequirements', value: number[] },
  { name: 'bonus', value: number[] },
  { name: 'bonusDescription', value: string },
  { name: 'bonusEx', value: number[] },
  { name: 'bonusDescription', value: string },
];

@Component({
  selector: 'app-mitama-reunion-set-bonus-data',
  templateUrl: './mitama-reunion-set-bonus-data.component.html',
  styleUrls: ['./mitama-reunion-set-bonus-data.component.scss']
})
export class MitamaReunionSetBonusDataComponent {
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
      const descStr = String(item[3].value).toLowerCase();
      const exDescStr = String(item[5].value).toLowerCase();
      return idStr.includes(searchStr) || descStr.includes(searchStr) || exDescStr.includes(searchStr);
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
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          {
            name: "mitamaRequirements", value: [item.member.find((m: any) => m["@name"] === "mitamaRequirements").element[0],
            item.member.find((m: any) => m["@name"] === "mitamaRequirements").element[1],
            item.member.find((m: any) => m["@name"] === "mitamaRequirements").element[2],
            item.member.find((m: any) => m["@name"] === "mitamaRequirements").element[3]]
          },
          {
            name: "bonus", value: [item.member.find((m: any) => m["@name"] === "bonus").element[0],
            item.member.find((m: any) => m["@name"] === "bonus").element[1],
            item.member.find((m: any) => m["@name"] === "bonus").element[2],
            item.member.find((m: any) => m["@name"] === "bonus").element[3],
            item.member.find((m: any) => m["@name"] === "bonus").element[4],
            item.member.find((m: any) => m["@name"] === "bonus").element[5],
            item.member.find((m: any) => m["@name"] === "bonus").element[6],
            item.member.find((m: any) => m["@name"] === "bonus").element[7]]
          },
          { name: "bonusDescription", value: item.member.find((m: any) => m["@name"] === "bonusDescription")["#text"] },
          {
            name: "bonusEx", value: [item.member.find((m: any) => m["@name"] === "bonusEx").element[0],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[1],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[2],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[3],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[4],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[5],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[6],
            item.member.find((m: any) => m["@name"] === "bonusEx").element[7]]
          },
          { name: "bonusExDescription", value: item.member.find((m: any) => m["@name"] === "bonusExDescription")["#text"] }
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
        { name: 'ID', value: this.selectedItem[0].value },
        {
          name: "mitamaRequirements", value: [this.selectedItem[1].value[0],
          this.selectedItem[1].value[1],
          this.selectedItem[1].value[2],
          this.selectedItem[1].value[3]]
        },
        {
          name: "bonus", value: [this.selectedItem[2].value[0],
          this.selectedItem[2].value[1],
          this.selectedItem[2].value[2],
          this.selectedItem[2].value[3],
          this.selectedItem[2].value[4],
          this.selectedItem[2].value[5],
          this.selectedItem[2].value[6],
          this.selectedItem[2].value[7]]
        },
        { name: "bonusDescription", value: this.selectedItem[3].value },
        {
          name: "bonusEx", value: [this.selectedItem[4].value[0],
          this.selectedItem[4].value[1],
          this.selectedItem[4].value[2],
          this.selectedItem[4].value[3],
          this.selectedItem[4].value[4],
          this.selectedItem[4].value[5],
          this.selectedItem[4].value[6],
          this.selectedItem[4].value[7]]
        },
        { name: "bonusExDescription", value: this.selectedItem[5].value },

      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        {
          name: "mitamaRequirements", value: [0, 0, 0, 0]
        },
        {
          name: "bonus", value: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        { name: "bonusDescription", value: "" },
        {
          name: "bonusEx", value: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        { name: "bonusExDescription", value: "" },

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
      this.content.forEach((item: dataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiMitamaReunionSetBonusData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="mitamaRequirements">\n`;
        for (let i = 0; i < item[1].value.length; i++) {
          xml += `      <element>${item[1].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="bonus">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `      <element>${item[2].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="bonusDescription">${item[3].value}</member>\n`;
        xml += `    <member name="bonusEx">\n`;
        for (let i = 0; i < item[4].value.length; i++) {
          xml += `      <element>${item[4].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="bonusExDescription">${item[5].value}</member>\n`;
        xml += `  </object>\n`;
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
