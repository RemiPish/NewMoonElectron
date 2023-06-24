import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cQuestDataStructure = [
  { name: 'ID', value: number },
  { name: 'title', value: string },
  { name: 'npc', value: string },
  { name: 'zoneID', value: number },
  { name: 'xCoordinate', value: number },
  { name: 'yCoordinate', value: number },
  { name: 'lines', value: string[] },
  { name: 'next', value: any[][] }
];

@Component({
  selector: 'app-c-quest-data',
  templateUrl: './c-quest-data.component.html',
  styleUrls: ['./c-quest-data.component.scss']
})
export class CQuestDataComponent {
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
        let next: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "next").element.length) {
          item.member.find((m: any) => m["@name"] === "next").element.forEach((m: any) => {
            next.push([m.object.member[0]["#text"], m.object.member[1]["#text"], m.object.member[2]["#text"]]);
          });
        }
        else next.push([item.member.find((m: any) => m["@name"] === "next").element.object.member[0]["#text"], item.member.find((m: any) => m["@name"] === "next").element.object.member[1]["#text"], item.member.find((m: any) => m["@name"] === "next").element.object.member[2]["#text"]]);

        let lines: string[] = [];
        if (item.member.find((m: any) => m["@name"] === "lines").element.length) {
          item.member.find((m: any) => m["@name"] === "lines").element.forEach((m: any) => {
            lines.push(m);
          });
        }
        else {
          lines.push(item.member.find((m: any) => m["@name"] === "lines").element);
        }

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "title", value: item.member.find((m: any) => m["@name"] === "title")["#text"] },
          { name: "npc", value: item.member.find((m: any) => m["@name"] === "npc")["#text"] },
          { name: "zoneID", value: item.member.find((m: any) => m["@name"] === "zoneID")["#text"] },
          { name: "xCoordinate", value: item.member.find((m: any) => m["@name"] === "xCoordinate")["#text"] },
          { name: "yCoordinate", value: item.member.find((m: any) => m["@name"] === "yCoordinate")["#text"] },
          { name: "lines", value: lines },
          { name: "next", value: next }
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
      let next: any[] = [];
      this.selectedItem[7].value.forEach((m: any) => {
        next.push([m[0], m[1], m[2]]);
      });

      let lines: any[] = [];
      this.selectedItem[6].value.forEach((m: any) => {
        lines.push(m);
      });

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'title', value: this.selectedItem[1].value },
        { name: 'npc', value: this.selectedItem[2].value },
        { name: 'zoneID', value: this.selectedItem[3].value },
        { name: 'xCoordinate', value: this.selectedItem[4].value },
        { name: 'yCoordinate', value: this.selectedItem[5].value },
        { name: 'lines', value: lines },
        { name: 'next', value: next },
      ];
    }
    else {
      let next: any[] = [];
      for (let i = 0; i < 3; i++) {
        next.push([0, 0, 0]);
      };

      let lines: any[] = [];
      for (let i = 0; i < 8; i++) {
        lines.push('');
      };

      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'title', value: '' },
        { name: 'npc', value: '' },
        { name: 'zoneID', value: 0 },
        { name: 'xCoordinate', value: 0 },
        { name: 'yCoordinate', value: 0 },
        { name: 'lines', value: lines },
        { name: 'next', value: next }

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
        xml += '  <object name="MiCQuestData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="title"><![CDATA[${item[1].value || ''}]]></member>\n`;
        xml += `    <member name="npc"><![CDATA[${item[2].value || ''}]]></member>\n`;
        xml += `    <member name="zoneID">${item[3].value}</member>\n`;
        xml += `    <member name="xCoordinate">${item[4].value}</member>\n`;
        xml += `    <member name="yCoordinate">${item[5].value}</member>\n`;
        xml += `    <member name="lines">\n`;
        item[6].value.forEach((m: any) => {
          xml += `      <element><![CDATA[${m || ''}]]></element>\n`;
        });
        xml += `    </member>\n`;

        xml += `    <member name="next">\n`;
        item[7].value.forEach((m: any) => {
          xml += `      <element>\n`;
          xml += `        <object name="MiNextEpisodeInfo">\n`;
          xml += `          <member name="questID">${m[0]}</member>\n`;
          xml += `          <member name="restrictionType">${m[1]}</member>\n`;
          xml += `          <member name="restrictionValue">${m[2]}</member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
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
