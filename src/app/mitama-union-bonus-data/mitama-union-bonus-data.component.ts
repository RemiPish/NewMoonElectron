import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type mitamaUnionBonusDataStructure = [
  { name: 'ID', value: number },
  { name: 'bonus', value: number[] },
  { name: 'description', value: string },
];

@Component({
  selector: 'app-mitama-union-bonus-data',
  templateUrl: './mitama-union-bonus-data.component.html',
  styleUrls: ['./mitama-union-bonus-data.component.scss']
})
export class MitamaUnionBonusDataComponent {
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

  async parseData(json: string) {
    try {
      const parsed = JSON.parse(json);

      const items = await Promise.all(parsed.map(async (item: any) => {
        let values: any = [];
        item.member.find((m: any) => m["@name"] === "bonus").element.forEach((data: any) => {
          values.push(data);
        });
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "bonus", value: values },
          { name: "description", value: item.member.find((m: any) => m["@name"] === "description")["#text"] },
        ];
      }));
      console.log(items);
      return items;
    }
    catch (error) {
      this.loadingTable = false;
      this.isValidFile = false;
      this.fileIsValid.emit(false);
      return [];
    }
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

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      let values: any = [];
      this.selectedItem = (id === 'zero') ? this.content.find((item: { value: any; }[]) => item[0].value === 0) : this.content.find((item: { value: any; }[]) => item[0].value === id);
        this.selectedItem[1].value.forEach((data: any) => {
          values.push(data);
        });
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'bonus', value: values },
        { name: 'description', value: this.selectedItem[2].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'bonus', value: [] },
        { name: 'description', value: "" }
      ];
      for (let i = 0; i < 6; i++) {
        this.editingItem[1].value.push(0);
      }
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

  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.content;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.content.filter((item) => {
      const idStr = String(item[0].value).toLowerCase();
      const descriptionStr = String(item[2].value).toLowerCase();
      return idStr.includes(searchStr) || descriptionStr.includes(searchStr);
    });

    this.currentPage = 1;
    this.cd.detectChanges();
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
      this.content.forEach((item: mitamaUnionBonusDataStructure) => {
        xml += '	<object name="MiMitamaUnionBonusData">\n';
        xml += `		<member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="bonus">\n`;
        item[1].value.forEach((elt) => {
          xml += `      <element>${elt}</element>\n`;
        })
        xml += `    </member>\n`;
        xml += `		<member name="description"><![CDATA[${item[2].value || ""}]]></member>\n`;
        xml += '  </object>\n';
      });

      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
