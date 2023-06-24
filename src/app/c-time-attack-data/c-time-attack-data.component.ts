import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cQuestDataStructure = [
  { name: 'ID', value: number },
  { name: 'type', value: number },
  { name: 'sortOrder', value: number },
  { name: 'name', value: string },
  { name: 'instanceName', value: string },
  { name: 'descriptions', value: string[] },
  { name: 'rankTimes', value: any[] }
];

@Component({
  selector: 'app-c-time-attack-data',
  templateUrl: './c-time-attack-data.component.html',
  styleUrls: ['./c-time-attack-data.component.scss']
})
export class CTimeAttackDataComponent {
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
    ;
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
      const itemStr = String(item[3].value).toLowerCase();
      return idStr.includes(searchStr) || itemStr.includes(searchStr);
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
      console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {
        let descriptions: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "descriptions").element.length) {
          item.member.find((m: any) => m["@name"] === "descriptions").element.forEach((m: any) => {
            descriptions.push(m);
          });
        }
        else {
          descriptions.push(item.member.find((m: any) => m["@name"] === "descriptions").element);
        }

        let rankTimes: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "rankTimes").element.length) {
          item.member.find((m: any) => m["@name"] === "rankTimes").element.forEach((m: any) => {
            rankTimes.push(m);
          });
        }
        else {
          rankTimes.push(item.member.find((m: any) => m["@name"] === "rankTimes").element);
        }

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'type', value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
          { name: 'sortOrder', value: item.member.find((m: any) => m["@name"] === "sortOrder")["#text"] },
          { name: 'name', value: item.member.find((m: any) => m["@name"] === "name")["#text"] },
          { name: 'instanceName', value: item.member.find((m: any) => m["@name"] === "instanceName")["#text"] },
          { name: 'descriptions', value: descriptions },
          { name: 'rankTimes', value: rankTimes },
        ];
      }));
      console.log(items)
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

      let descriptions: any[] = [];
      this.selectedItem[5].value.forEach((m: any) => {
        descriptions.push(m);
      });

      let rankTimes: any[] = [];
      this.selectedItem[6].value.forEach((m: any) => {
        rankTimes.push(m);
      });

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'type', value: this.selectedItem[1].value },
        { name: 'sortOrder', value: this.selectedItem[2].value },
        { name: 'name', value: this.selectedItem[3].value },
        { name: 'instanceName', value: this.selectedItem[4].value },
        { name: 'descriptions', value: descriptions },
        { name: 'rankTimes', value: rankTimes }
      ];
    }
    else {
      let descriptions: any[] = [];
      for (let i = 0; i < 9; i++) {
        descriptions.push('');
      };

      let rankTimes: any[] = [];
      for (let i = 0; i < 4; i++) {
        rankTimes.push(0);
      };

      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'type', value: 0 },
        { name: 'sortOrder', value: 0 },
        { name: 'name', value: '' },
        { name: 'instanceName', value: '' },
        { name: 'descriptions', value: descriptions },
        { name: 'rankTimes', value: rankTimes }

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
      this.content.forEach((item: cQuestDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiCTimeAttackData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="type">${item[1].value}</member>\n`;
        xml += `    <member name="sortOrder">${item[2].value}</member>\n`;
        xml += `    <member name="name"><![CDATA[${item[3].value || ''}]]></member>\n`;
        xml += `    <member name="instanceName"><![CDATA[${item[4].value || ''}]]></member>\n`;
        xml += `    <member name="descriptions">\n`;
        item[5].value.forEach((m: any) => {
          xml += `      <element><![CDATA[${m || ''}]]></element>\n`;
        });
        xml += `    </member>\n`;
        xml += `    <member name="rankTimes">\n`;
        item[6].value.forEach((m: any) => {
          xml += `      <element>${m}</element>\n`;
        });
        xml += `    </member>\n`;
        xml += `  </object>\n`;
      });
      // Write the closing tag for the root element

      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
