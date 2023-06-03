import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type gvgDataStructure = [
  { name: 'ID', value: number },
  { name: 'unknown1', value: number },
  { name: 'unknown2', value: number },
  { name: 'unknown3', value: number },
  { name: 'unknown4', value: number },
  { name: 'unknown5', value: number },
  { name: 'unknown6', value: number },
  { name: 'unknown7', value: number },
  { name: 'unknown8', value: number[] },
  { name: 'unknown9', value: number },
  { name: 'unknown10', value: number[][] },

];
@Component({
  selector: 'app-gvg-data',
  templateUrl: './gvg-data.component.html',
  styleUrls: ['./gvg-data.component.scss']
})
export class GvgDataComponent {
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
      //console.log(parsed)
      const items = await Promise.all(parsed.map(async (item: any) => {
        let array: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "unknown10").element.length) {
          item.member.find((m: any) => m["@name"] === "unknown10").element.forEach((m: any) => {
            array.push([m.object.member[0]["#text"], m.object.member[1]["#text"]])
          })
        }
        else {
          array.push([item.member.find((m: any) => m["@name"] === "unknown10").object.member[0]["#text"], item.member.find((m: any) => m["@name"] === "unknown10").object.member[1]["#text"]])
        }
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "unknown1", value: item.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
          { name: "unknown2", value: item.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
          { name: "unknown3", value: item.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
          { name: "unknown4", value: item.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
          { name: "unknown5", value: item.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
          { name: "unknown6", value: item.member.find((m: any) => m["@name"] === "unknown6")["#text"] },
          { name: "unknown7", value: item.member.find((m: any) => m["@name"] === "unknown7")["#text"] },
          {
            name: "unknown8", value: [item.member.find((m: any) => m["@name"] === "unknown8").element[0],
            item.member.find((m: any) => m["@name"] === "unknown8").element[1],
            item.member.find((m: any) => m["@name"] === "unknown8").element[2],
            item.member.find((m: any) => m["@name"] === "unknown8").element[3],
            item.member.find((m: any) => m["@name"] === "unknown8").element[4]]
          },
          { name: "unknown9", value: item.member.find((m: any) => m["@name"] === "unknown9")["#text"] },
          { name: "unknown10", value: array },
        ];
      }));
      //console.log(items)
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

      if (id === 'zero') {
        this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === 0);
      }
      else this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let array: any[] = [];
      
      if (this.selectedItem[10].value.length) {
        this.selectedItem[10].value.forEach((m: any) => {
          array.push([m[0], m[1]])
        })
      }
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: "unknown1", value: this.selectedItem[1].value },
        { name: "unknown2", value: this.selectedItem[2].value },
        { name: "unknown3", value: this.selectedItem[3].value },
        { name: "unknown4", value: this.selectedItem[4].value },
        { name: "unknown5", value: this.selectedItem[5].value },
        { name: "unknown6", value: this.selectedItem[6].value },
        { name: "unknown7", value: this.selectedItem[7].value },
        {
          name: "unknown8", value: [this.selectedItem[8].value[0],
          this.selectedItem[8].value[1],
          this.selectedItem[8].value[2],
          this.selectedItem[8].value[3],
          this.selectedItem[8].value[4]]
        },
        { name: "unknown9", value: this.selectedItem[9].value },
        { name: "unknown10", value: array }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: "unknown1", value: 0 },
        { name: "unknown2", value: 0 },
        { name: "unknown3", value: 0 },
        { name: "unknown4", value: 0 },
        { name: "unknown5", value: 0 },
        { name: "unknown6", value: 0 },
        { name: "unknown7", value: 0 },
        {
          name: "unknown8", value: [0, 0, 0, 0, 0]
        },
        { name: "unknown9", value: 0 },
        { name: "unknown10", value: [[0, 0]] }
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

  removeUk10(i: number) {
    this.editingItem[10].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addUk10() {
    this.editingItem[10].value.push([0, 0]);
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      console.log(saveMode)
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: gvgDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiGvGData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="unknown1">${item[1].value}</member>\n`;
        xml += `    <member name="unknown2">${item[2].value}</member>\n`;
        xml += `    <member name="unknown3">${item[3].value}</member>\n`;
        xml += `    <member name="unknown4">${item[4].value}</member>\n`;
        xml += `    <member name="unknown5">${item[5].value}</member>\n`;
        xml += `    <member name="unknown6">${item[6].value}</member>\n`;
        xml += `    <member name="unknown7">${item[7].value}</member>\n`;
        xml += `    <member name="unknown8">\n`;
        xml += `      <element>${item[8].value[0]}</element>\n`;
        xml += `      <element>${item[8].value[1]}</element>\n`;
        xml += `      <element>${item[8].value[2]}</element>\n`;
        xml += `      <element>${item[8].value[3]}</element>\n`;
        xml += `      <element>${item[8].value[4]}</element>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="unknown9">${item[9].value}</member>\n`;
        xml += `    <member name="unknown10">\n`;
        for (let i = 0; i < item[10].value.length; i++) {
          xml += `      <element>\n`;
          xml += `        <object name="MiGvGArrayData">\n`;
          xml += `          <member name="unknown1">${item[10].value[i][0]}</member>\n`;
          xml += `          <member name="unknown2">${item[10].value[i][1]}</member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
        }
        xml += `    </member>\n`;

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
