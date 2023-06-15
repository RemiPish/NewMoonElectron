import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type devilBoostLotDataStructure = [
  { name: 'lot', value: number },
  { name: 'stackID', value: number },
];

@Component({
  selector: 'app-devil-boost-lot-data',
  templateUrl: './devil-boost-lot-data.component.html',
  styleUrls: ['./devil-boost-lot-data.component.scss']
})
export class DevilBoostLotDataComponent {
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
      const idStr = String(item[1].value).toLowerCase();
      const pointStr = String(item[0].value).toLowerCase();
      return idStr.includes(searchStr) || pointStr.includes(searchStr);
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
            { name: "lot", value: item.member.find((m: any) => m["@name"] === "lot")["#text"] },
            { name: "stackID", value: item.member.find((m: any) => m["@name"] === "stackID")["#text"] },

          ];
        }));
      }
      else items = [[{ name: "lot", value: parsed.member.find((m: any) => m["@name"] === "lot")["#text"] },
      { name: "stackID", value: parsed.member.find((m: any) => m["@name"] === "stackID")["#text"] },
      ]];

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

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[1].value === id);
      this.editingItem = [
        { name: 'lot', value: this.selectedItem[0].value },
        { name: 'stackID', value: this.selectedItem[1].value },
      ];
    }
    else {
      this.editingItem = [
        { name: 'lot', value: 0 },
        { name: 'skillID', value: null },

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
    if (this.editingItem[1].value !== null) {
      if (this.selectedItem && this.selectedItem[1].value === this.editingItem[1].value) {
        const index = this.content.indexOf(this.selectedItem);
        if (index !== -1) {
          this.content[index] = this.editingItem;
        }
        this.cancelEdit();
      }
      else {
        if (!this.content.some((item: { value: any; }[]) => item[1].value === this.editingItem[1].value)) {
          this.content.push(this.editingItem);
          this.cancelEdit();
        }
        else {
          const confirmation = confirm('An Item with identical ID already exists. Do you want to overwrite it?');
          if (confirmation) {
            this.content[this.findIndex(this.editingItem[1].value)] = this.editingItem;
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'stackID').value === editId) {
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
      this.content.forEach((item: devilBoostLotDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiDevilBoostLotData">\n';
        xml += `    <member name="lot">${item[0].value}</member>\n`;
        xml += `    <member name="stackID">${item[1].value}</member>\n`;

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
