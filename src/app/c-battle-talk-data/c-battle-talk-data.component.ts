import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cBattleTalkDataStructure = [
  { name: 'ID', value: number },
  { name: 'lines', value: string[] },
];

@Component({
  selector: 'app-c-battle-talk-data',
  templateUrl: './c-battle-talk-data.component.html',
  styleUrls: ['./c-battle-talk-data.component.scss']
})
export class CBattleTalkDataComponent {

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
      const nameStr = String(item[1].value[0]).toLowerCase();
      const npcidStr = String(item[1].value[1]).toLowerCase();
      return idStr.includes(searchStr) || nameStr.includes(searchStr) || npcidStr.includes(searchStr);
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
          let lines: any[] = [];
          if (item.member.find((m: any) => m["@name"] === "lines").element.length === 2) {
            (item.member.find((m: any) => m["@name"] === "lines").element.forEach((l: any) => {
              lines.push(l);
            }))
          }
          else {
            lines.push(item.member.find((m: any) => m["@name"] === "lines").element);
            lines.push('');
          }
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "lines", value: lines },

          ];
        }));
      }
      else {
        let lines: any[] = [];
        if (parsed.member.find((m: any) => m["@name"] === "lines").element.length) {
          (parsed.member.find((m: any) => m["@name"] === "lines").element.forEach((l: any) => {
            lines.push(l);
          }))
        }
        else {
          lines.push(parsed.member.find((m: any) => m["@name"] === "lines").element);
          lines.push('');
        }
        items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "lines", value: lines },

        ]];
      }

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

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'lines', value: [] },
      ];
      this.selectedItem[1].value.forEach((line: any) => {
        this.editingItem[1].value.push(line);
      })
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'lines', value: ['', ''] },

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
    if (this.editingItem[1].value[0] === '' && this.editingItem[1].value[1] === '') {
      this.formMsg = "At least one line is required!";
      this.cd.detectChanges();
    }
    else if (this.editingItem[0].value !== null) {
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
      this.content.forEach((item: cBattleTalkDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCTalkMessageData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="lines">\n`;
        item[1].value.forEach((line: any) => {
          if (line != '')
            xml += `      <element> <![CDATA[${line}]]></element>\n`;
        })
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
