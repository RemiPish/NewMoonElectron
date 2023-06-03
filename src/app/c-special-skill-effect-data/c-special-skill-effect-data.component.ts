import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type cSpecialSkillEffectDataStructure = [
  { name: 'ID', value: number },
  { name: 'skillID', value: number },
  { name: 'itemID', value: number },
  { name: 'animationID', value: number },
  { name: 'soundID', value: number },
  { name: 'effects', value: string[] }

];
@Component({
  selector: 'app-c-special-skill-effect-data',
  templateUrl: './c-special-skill-effect-data.component.html',
  styleUrls: ['./c-special-skill-effect-data.component.scss']
})
export class CSpecialSkillEffectDataComponent {
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
          let effects: any[] = [];
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "effects").element.length; i++) {
            effects.push(item.member.find((m: any) => m["@name"] === "effects").element[i]);
          }
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: 'skillID', value: item.member.find((m: any) => m["@name"] === "skillID")["#text"] },
            { name: 'itemID', value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
            { name: 'animationID', value: item.member.find((m: any) => m["@name"] === "animationID")["#text"] },
            { name: 'soundID', value: item.member.find((m: any) => m["@name"] === "soundID")["#text"] },
            { name: 'effects', value: effects },
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        let effects: any[] = [];
        for (let i = 0; i < parsed.member.find((m: any) => m["@name"] === "effects").element.length; i++) {
          effects.push(parsed.member.find((m: any) => m["@name"] === "effects").element[i]);
        }
        return [[
          { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'skillID', value: parsed.member.find((m: any) => m["@name"] === "skillID")["#text"] },
          { name: 'parsedID', value: parsed.member.find((m: any) => m["@name"] === "parsedID")["#text"] },
          { name: 'animationID', value: parsed.member.find((m: any) => m["@name"] === "animationID")["#text"] },
          { name: 'soundID', value: parsed.member.find((m: any) => m["@name"] === "soundID")["#text"] },
          { name: 'effects', value: effects },
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
      let effects: any[] = [];
      for (let i = 0; i < this.selectedItem[5].value.length; i++) {
        effects.push(this.selectedItem[5].value[i]);
      }

      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: 'skillID', value: this.selectedItem[1].value },
        { name: 'itemID', value: this.selectedItem[2].value },
        { name: 'animationID', value: this.selectedItem[3].value },
        { name: 'soundID', value: this.selectedItem[4].value },
        { name: 'effects', value: effects }]
      //console.log(this.editingItem)
    }
    else {
      let effects: any[] = [];
      for (let i = 0; i < 20; i++) {
        effects.push("");
      }
      this.editingItem = [
        { name: "ID", value: null },
        { name: 'skillID', value: 0 },
        { name: 'itemID', value: 0 },
        { name: 'animationID', value: 0 },
        { name: 'soundID', value: 0 },
        { name: 'effects', value: effects }];


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
      this.content.forEach((item: cSpecialSkillEffectDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCSpecialSkillEffectData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="skillID">${item[1].value}</member>\n`;
        xml += `    <member name="itemID">${item[2].value}</member>\n`;
        xml += `    <member name="animationID">${item[3].value}</member>\n`;
        xml += `    <member name="soundID">${item[4].value}</member>\n`;
        xml += `    <member name="effects">\n`;
        for (let i = 0; i < item[5].value.length; i++) {
          xml += `      <element><![CDATA[${item[5].value[i] || ""}]]></element>\n`;
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
