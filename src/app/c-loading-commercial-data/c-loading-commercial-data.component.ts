import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
import { IpcService } from '../ipc.service';

export type cLoadingCommercialDataStructure = [
  { name: 'ID', value: number },
  { name: 'loading1', value: number },
  { name: 'loading2', value: number },
  { name: 'loading3', value: number },
  { name: 'file', value: string },

];
@Component({
  selector: 'app-c-loading-commercial-data',
  templateUrl: './c-loading-commercial-data.component.html',
  styleUrls: ['./c-loading-commercial-data.component.scss']
})
export class CLoadingCommercialDataComponent {
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

  constructor(private cd: ChangeDetectorRef, private readonly ipc: IpcService) {
    this.ipc.on('gamefile-selected', async (event: any, arg?: any) => {
			this.editingItem[4].value = arg['fileName'];
			this.cd.detectChanges();
		});
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
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: 'loading1', value: item.member.find((m: any) => m["@name"] === "loading1")["#text"] },
            { name: 'loading2', value: item.member.find((m: any) => m["@name"] === "loading2")["#text"] },
            { name: 'loading3', value: item.member.find((m: any) => m["@name"] === "loading3")["#text"] },
            { name: 'file', value: item.member.find((m: any) => m["@name"] === "file")["#text"] }
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        return [[
          { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'loading1', value: parsed.member.find((m: any) => m["@name"] === "loading1")["#text"] },
          { name: 'loading2', value: parsed.member.find((m: any) => m["@name"] === "loading2")["#text"] },
          { name: 'loading3', value: parsed.member.find((m: any) => m["@name"] === "loading3")["#text"] },
          { name: 'file', value: parsed.member.find((m: any) => m["@name"] === "file")["#text"] }
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
      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: 'loading1', value: this.selectedItem[1].value },
        { name: 'loading2', value: this.selectedItem[2].value },
        { name: 'loading3', value: this.selectedItem[3].value },
        { name: 'file', value: this.selectedItem[4].value }

      ];
      //console.log(this.editingItem)
    }
    else {
      this.editingItem = [
        { name: "ID", value: null },
        { name: 'loading1', value: 0 },
        { name: 'loading2', value: 0 },
        { name: 'loading3', value: 0 },
        { name: 'file', value: "" }
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

  selectFile() {
		this.ipc.send('open-gamefile',{ext: 'jpg'});
		this.cd.detectChanges();
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
      this.content.forEach((item: cLoadingCommercialDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCLoadingCommercialData">\n';

        // Write the baseData element
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="loading1">${item[1].value}</member>\n`;
        xml += `    <member name="loading2">${item[2].value}</member>\n`;
        xml += `    <member name="loading3">${item[3].value}</member>\n`;
        xml += `    <member name="file"><![CDATA[${item[4].value}]]></member>\n`;

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
