import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type devilBoostExtraDataStructure = [
  { name: 'stackID', value: number },
  { name: 'itemID', value: number },
  { name: 'groupID', value: number },
  { name: 'tokusei', value: number[] }

];

@Component({
  selector: 'app-devil-boost-extra-data',
  templateUrl: './devil-boost-extra-data.component.html',
  styleUrls: ['./devil-boost-extra-data.component.scss']
})
export class DevilBoostExtraDataComponent {
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
    this.content = await this.parseItemData(this.contentJson);
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

  async parseItemData(json: string) {
    try {
      const parsed = JSON.parse(json);
      if (parsed.length) {
        const items = await Promise.all(parsed.map(async (item: any) => {
          let tokusei: any[] = [];
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "tokusei").element.length; i++) {
            tokusei.push(item.member.find((m: any) => m["@name"] === "tokusei").element[i]);
          }
          return [
            { name: "stackID", value: item.member.find((m: any) => m["@name"] === "stackID")["#text"] },
            { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
            { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
            { name: "tokusei", value: tokusei }
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        let unused: any[] = [];
        for (let i = 0; i < parsed.member.find((m: any) => m["@name"] === "tokusei").element.length; i++) {
          unused.push(parsed.member.find((m: any) => m["@name"] === "tokusei").element[i]);
        }
        return [[
          { name: "stackID", value: parsed.member.find((m: any) => m["@name"] === "stackID")["#text"] },
          { name: "itemID", value: parsed.member.find((m: any) => m["@name"] === "itemID")["#text"] },
          { name: "groupID", value: parsed.member.find((m: any) => m["@name"] === "groupID")["#text"] },
          { name: "tokusei", value: unused }

        ]];
      }
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
      let tokusei: any[] = [];
      for (let i = 0; i < this.selectedItem[3].value.length; i++) {
        tokusei.push(this.selectedItem[3].value[i]);
      }

      this.editingItem = [
        { name: "stackID", value: this.selectedItem[0].value },
        { name: "itemID", value: this.selectedItem[1].value },
        { name: "groupID", value: this.selectedItem[2].value },
        { name: "tokusei", value: tokusei }

      ];
      //console.log(this.editingItem)
    }
    else {
      let unused: any[] = [];
      for (let i = 0; i < 8; i++) {
        unused.push(0);
      }
      this.editingItem = [
        { name: "stackID", value: null },
        { name: "itemID", value: 0 },
        { name: "groupID", value: 0 },
        { name: "tokusei", value: unused }
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'stackID').value === editId) {
        return i;
      }
    }
    return -1;
  }


  changeTablePage(event: number) {
    console.log(event)
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: devilBoostExtraDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiDevilBoostExtraData">\n';

        // Write the baseData element

        xml += `    <member name="stackID">${item[0].value}</member>\n`;
        xml += `    <member name="itemID">${item[1].value}</member>\n`;
        xml += `    <member name="groupID">${item[2].value}</member>\n`;
        xml += `    <member name="tokusei">\n`;
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `      <element>${item[3].value[i]}</element>\n`;
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
