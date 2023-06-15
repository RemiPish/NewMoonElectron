import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';


export type dataStructure = [
  { name: 'itemID', value: number },
  { name: 'statusEffectIDs', value: number[] },
  { name: 'entries', value: any[][] },
  { name: 'walkAnimationID', value: number },
  { name: 'runAnimationID', value: number },
  { name: 'idleAnimationID', value: number },
  { name: 'combatIdleAnimationID', value: number }
];

@Component({
  selector: 'app-c-transformed-model-data',
  templateUrl: './c-transformed-model-data.component.html',
  styleUrls: ['./c-transformed-model-data.component.scss']
})
export class CTransformedModelDataComponent {
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
      console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {

        let entries: any[][] = [];
        item.member.find((m: any) => m["@name"] === "entries").element.forEach((e: any) => {
          entries.push([e.object.member[0]["#text"], e.object.member[1]["#text"]]);
        });

        return [
          { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
          {
            name: "statusEffectIDs", value: [item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[0],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[1],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[2],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[3],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[4],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[5],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[6],
            item.member.find((m: any) => m["@name"] === "statusEffectIDs").element[7]]
          },
          { name: "entries", value: entries },
          { name: "walkAnimationID", value: item.member.find((m: any) => m["@name"] === "walkAnimationID")["#text"] },
          { name: "runAnimationID", value: item.member.find((m: any) => m["@name"] === "runAnimationID")["#text"] },
          { name: "idleAnimationID", value: item.member.find((m: any) => m["@name"] === "idleAnimationID")["#text"] },
          { name: "combatIdleAnimationID", value: item.member.find((m: any) => m["@name"] === "combatIdleAnimationID")["#text"] }
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
      let entries: any[][] = [];
      this.selectedItem[2].value.forEach((e: any) => {
        entries.push([e[0], e[1]]);
      });
      this.editingItem = [
        { name: 'itemID', value: this.selectedItem[0].value },
        {
          name: "statusEffectIDs", value: [this.selectedItem[1].value[0],
          this.selectedItem[1].value[1],
          this.selectedItem[1].value[2],
          this.selectedItem[1].value[3],
          this.selectedItem[1].value[4],
          this.selectedItem[1].value[5],
          this.selectedItem[1].value[6],
          this.selectedItem[1].value[7]]
        },
        { name: "entries", value: entries },
        { name: "walkAnimationID", value: this.selectedItem[3].value },
        { name: "runAnimationID", value: this.selectedItem[4].value },
        { name: "idleAnimationID", value: this.selectedItem[5].value },
        { name: "combatIdleAnimationID", value: this.selectedItem[6].value }

      ];
    }
    else {
      let entries: any[][] = [];
      for (let i = 0; i < 25; i++) {
        entries.push([0, '']);
      };

      this.editingItem = [
        { name: 'itemID', value: null },
        {
          name: "statusEffectIDs", value: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        { name: "entries", value: entries },
        { name: "walkAnimationID", value: 0 },
        { name: "runAnimationID", value: 0 },
        { name: "idleAnimationID", value: 0 },
        { name: "combatIdleAnimationID", value: 0 }

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
      if (this.content[i].find((item: { name: string; }) => item.name === 'itemID').value === editId) {
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
      this.content.forEach((item: dataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiCTransformedModelData">\n';
        xml += `    <member name="itemID">${item[0].value}</member>\n`;
        xml += `    <member name="statusEffectIDs">\n`;
        for (let i = 0; i < item[1].value.length; i++) {
          xml += `      <element>${item[1].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="entries">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `      <element>\n`;
          xml += `        <object name="MiCTransformedModelEntry">\n`;
          xml += `          <member name="location">${item[2].value[i][0]}</member>\n`;
          xml += `          <member name="file"><![CDATA[${item[2].value[i][1] || ''}]]></member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="walkAnimationID">${item[3].value}</member>\n`;
        xml += `    <member name="runAnimationID">${item[4].value}</member>\n`;
        xml += `    <member name="idleAnimationID">${item[5].value}</member>\n`;
        xml += `    <member name="combatIdleAnimationID">${item[6].value}</member>\n`;
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
