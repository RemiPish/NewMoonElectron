import { Component, Output, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type disassemblyTriggerDataStructure = [
  { name: 'ID', value: number },
  { name: 'rateScaling', value: number[] },


];
@Component({
  selector: 'app-disassembly-trigger-data',
  templateUrl: './disassembly-trigger-data.component.html',
  styleUrls: ['./disassembly-trigger-data.component.scss']
})
export class DisassemblyTriggerDataComponent implements OnChanges {
  contentJson: string = "";
  @Input() fileMode: string = "";
  @Input() type: string = "";
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {

      this.inEdition = false;
      this.searchTableText = "";
      this.content = [];
      this.filteredContent = [];

      this.currentPage = 1;
      this.formMsg = "";

      this.selectedItem = null;
      this.editingItem = null;
      this.loadingTable = false;
      this.isValidFile = false;
    }
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
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          {
            name: "rateScaling", value: [item.member.find((m: any) => m["@name"] === "rateScaling").element[0],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[1],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[2],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[3],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[4],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[5],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[6],
            item.member.find((m: any) => m["@name"] === "rateScaling").element[7]]
          }
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
          name: "rateScaling", value: [this.selectedItem[1].value[0],
          this.selectedItem[1].value[1],
          this.selectedItem[1].value[2],
          this.selectedItem[1].value[3],
          this.selectedItem[1].value[4],
          this.selectedItem[1].value[5],
          this.selectedItem[1].value[6],
          this.selectedItem[1].value[7]]
        }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: "rateScaling", value: [0, 0, 0, 0, 0, 0, 0, 0] }
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
      this.content.forEach((item: disassemblyTriggerDataStructure) => {
        // Write the opening tag for the item
        switch (this.type) {
          case 'ModificationTriggerData':
            xml += '	<object name="MiModificationTriggerData">\n';
            break;
          case 'DisassemblyTriggerData':
            xml += '  <object name="MiDisassemblyTriggerData">\n';
            break;
        }
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="rateScaling">\n`;
        for (let i = 0; i < item[1].value.length; i++) {
          xml += `      <element>${item[1].value[i]}</element>\n`;
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
