import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type disassemblyDataStructure = [
  { name: 'ID', value: number },
  { name: 'itemID', value: number },
  { name: 'materials', value: any[][] },
];

@Component({
  selector: 'app-disassembly-data',
  templateUrl: './disassembly-data.component.html',
  styleUrls: ['./disassembly-data.component.scss']
})
export class DisassemblyDataComponent {
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
  showTable: boolean[] = [];

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
        item.member.find((m: any) => m["@name"] === "materials").element.forEach((data: any) => {
          values.push([data.object.member[0]["#text"], data.object.member[1]["#text"], data.object.member[2]["#text"]]);
        });
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
          { name: "materials", value: values }
        ];
      }));
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
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let procInfo: any = [];
      this.selectedItem[2].value.forEach((item: any) => {
        procInfo.push([item[0], item[1], item[2]]);
      });
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'itemID', value: this.selectedItem[1].value },
        { name: 'materials', value: procInfo }

      ];

    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'itemID', value: 0 },
        { name: 'materials', value: [] }
      ];
      for (let i = 0; i < 8; i++) {
        this.editingItem[2].value.push([0, 0, 0]);
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
    for (let i = 0; i < 14; i++) {
      this.showTable[i] = false;
    }
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

  changeShow(i: number) {
    this.showTable[i] = !this.showTable[i];
    this.cd.detectChanges();
  }

  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.content;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.content.filter((item) => {
      const idStr = String(item[0].value).toLowerCase();
      return idStr.includes(searchStr);
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
      this.content.forEach((item: disassemblyDataStructure) => {
        xml += '	<object name="MiDisassemblyData">\n';
        xml += `		<member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="itemID">${item[1].value}</member>\n`;
        xml += `		<member name="materials">\n`;
        item[2].value.forEach((data: any) => {
          xml += `			<element>\n`;
          xml += `				<object name="MiDisassemblyMaterialData">\n`;
          xml += `					<member name="type">${data[0]}</member>\n`;
          xml += `          <member name="amount">${data[1]}</member>\n`;
          xml += `          <member name="successRate">${data[2]}</member>\n`;
          xml += `				</object>\n`;
          xml += `			</element>\n`;
        })
        xml += `		</member>\n`;
        xml += `	</object>\n`;
      })
      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
