import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cKeyItemDataStructure = [
  { name: 'ID', value: number },
  { name: 'criteria', value: string },
  { name: 'desc', value: string },
  { name: 'sort', value: number[] },
];

@Component({
  selector: 'app-c-key-item-data',
  templateUrl: './c-key-item-data.component.html',
  styleUrls: ['./c-key-item-data.component.scss']
})
export class CKeyItemDataComponent {
  contentJson: string = "";
  @Input() fileMode: string = "";
  @Output() fileIsValid = new EventEmitter<boolean>();
  @Output() saveXmlFile = new EventEmitter<string>();
  @Output() encryptFile = new EventEmitter<string>();
  @Output() contentParsed = new EventEmitter<any>();

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

  async parseContent(json: string) {
    let res = await this.parseData(json);
    this.contentParsed.emit(res);
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
      const nameStr = String(item[1].value).toLowerCase();
      const desStr = String(item[2].value).toLowerCase();
      return idStr.includes(searchStr) || desStr.includes(searchStr) || nameStr.includes(searchStr);
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
      let items: any[] = [];
      if (parsed.length) {

        items = await Promise.all(parsed.map(async (item: any) => {
          return [
            { name: "ID", value: item.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "name", value: item.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "desc", value: item.member[0].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
            { name: "sort", value: [item.member[1].object.member[0]["#text"], item.member[1].object.member[1]["#text"], item.member[1].object.member[2]["#text"], item.member[1].object.member[3]["#text"]] },
          ];
        }));
      }
      else items = [[{ name: "ID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "name", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
      { name: "desc", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
      { name: "sort", value: [parsed.member[1].object.member[0]["#text"], parsed.member[1].object.member[1]["#text"], parsed.member[1].object.member[2]["#text"], parsed.member[1].object.member[3]["#text"]] }]]

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
      let sortList: any[] = [];
      this.selectedItem[3].value.forEach((item: any) => {
        sortList.push(item);
      })

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'name', value: this.selectedItem[1].value },
        { name: 'desc', value: this.selectedItem[2].value },
        { name: 'sort', value: sortList }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'name', value: "" },
        { name: 'desc', value: "" },
        { name: 'sort', value: [0, 0, 0, 0] }
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
      this.content.forEach((item: cKeyItemDataStructure) => {

        xml += '  <object name="MiCKeyItemData">\n';
        xml += `    <member name="itemData">\n`;
        xml += `      <object  name="MiKeyItemData">\n`;
        xml += `        <member name="ID">${item[0].value}</member>\n`;
        xml += `        <member name="name"><![CDATA[${item[1].value || ''}]]></member>\n`;
        xml += `        <member name="desc"><![CDATA[${item[2].value || ''}]]></member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="sortData">\n`;
        xml += `      <object  name="MiKeyItemSortData">\n`;
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `        <member name="sort${(i + 1)}">${item[3].value[i]}</member>\n`;
        }
        xml += `      </object>\n`;
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
