import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type EnchantDataStructure = [
  { name: 'ID', value: number },
  { name: 'demonID', value: number },
  { name: 'itemID', value: number },
  { name: 'difficulty', value: number },
  { name: 'usage', value: number },
  { name: 'tarotName', value: string },
  { name: 'tarotDesc', value: string },
  { name: 'tarotEquipLevel', value: number },
  { name: 'tarotDifficulty', value: number },
  { name: 'tarotEquipTypes', value: number },
  { name: 'tarotTokusei', value: number[] },
  { name: 'tarotConditions', value: any[] },
  { name: 'soulName', value: string },
  { name: 'soulDesc', value: string },
  { name: 'soulEquipLevel', value: number },
  { name: 'soulDifficulty', value: number },
  { name: 'soulEquipTypes', value: number },
  { name: 'soulTokusei', value: number[] },
  { name: 'soulConditions', value: any[] }
];


@Component({
  selector: 'app-enchant-data',
  templateUrl: './enchant-data.component.html',
  styleUrls: ['./enchant-data.component.scss']
})
export class EnchantDataComponent {
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
      const demonIDStr = String(item[1].value).toLowerCase();
      const itemIDStr = String(item[2].value).toLowerCase();
      const tnameStr = String(item[5].value).toLowerCase();
      const tdescStr = String(item[6].value).toLowerCase();
      const snameStr = String(item[12].value).toLowerCase();
      const sdescStr = String(item[13].value).toLowerCase();
      return idStr.includes(searchStr) || tnameStr.includes(searchStr) || tdescStr.includes(searchStr) || snameStr.includes(searchStr) || sdescStr.includes(searchStr) || demonIDStr.includes(searchStr) || itemIDStr.includes(searchStr);
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
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "demonID", value: item.member[1].object.member.find((m: any) => m["@name"] === "demonID")["#text"] },
            { name: "itemID", value: item.member[1].object.member.find((m: any) => m["@name"] === "itemID")["#text"] },
            { name: "difficulty", value: item.member[1].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
            { name: "usage", value: item.member[1].object.member.find((m: any) => m["@name"] === "usage")["#text"] },
            { name: "tarotName", value: item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "tarotDesc", value: item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
            { name: "tarotEquipLevel", value: item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "equipLevel")["#text"] },
            { name: "tarotDifficulty", value: item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
            { name: "tarotEquipTypes", value: item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "equipTypes")["#text"] },
            { name: "tarotTokusei", value: [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "tokusei").element[0], item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "tokusei").element[1]] },
            {
              name: "tarotConditions", value: [[item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[0]["#text"], [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[0], item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[1]], [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[0], item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[1]]],
              [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[0]["#text"], [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[0], item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[1]], [item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[0], item.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[1]]]]

            },
            { name: "soulName", value: item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "soulDesc", value: item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
            { name: "soulEquipLevel", value: item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "equipLevel")["#text"] },
            { name: "soulDifficulty", value: item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
            { name: "soulEquipTypes", value: item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "equipTypes")["#text"] },
            { name: "soulTokusei", value: [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "tokusei").element[0], item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "tokusei").element[1]] },
            {
              name: "soulConditions", value: [[item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[0]["#text"], [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[0], item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[1]], [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[0], item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[1]]],
              [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[0]["#text"], [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[0], item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[1]], [item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[0], item.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[1]]]]
            }
          ];
        }));
      }
      else items = [{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
      { name: "demonID", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "demonID")["#text"] },
      { name: "parsedID", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "parsedID")["#text"] },
      { name: "difficulty", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
      { name: "usage", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "usage")["#text"] },
      { name: "tarotName", value: parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "name")["#text"] },
      { name: "tarotDesc", value: parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
      { name: "tarotEquipLevel", value: parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "equipLevel")["#text"] },
      { name: "tarotDifficulty", value: parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
      { name: "tarotEquipTypes", value: parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "equipTypes")["#text"] },
      { name: "tarotTokusei", value: [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "tokusei").element[0], parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "tokusei").element[1]] },
      {
        name: "tarotConditions", value: [[parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[0], [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[0], parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[1]], [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[0], parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[1]]],
        [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[0]["#text"], [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[0], parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[1]], [parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[0], parsed.member[1].object.member[4].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[1]]]]
      },
      { name: "soulName", value: parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "name")["#text"] },
      { name: "soulDesc", value: parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "desc")["#text"] },
      { name: "soulEquipLevel", value: parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "equipLevel")["#text"] },
      { name: "soulDifficulty", value: parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
      { name: "soulEquipTypes", value: parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "equipTypes")["#text"] },
      { name: "soulTokusei", value: [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "tokusei").element[0], parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "tokusei").element[1]] },
      {
        name: "soulConditions", value: [[parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[0]["#text"], [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[0], parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[1].element[1]], [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[0], parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[0].object.member[2].element[1]]],
        [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[0]["#text"], [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[0], parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[1].element[1]], [parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[0], parsed.member[1].object.member[5].object.member.find((m: any) => m["@name"] === "conditions").element[1].object.member[2].element[1]]]]
      }]

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
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'demonID', value: this.selectedItem[1].value },
        { name: 'itemID', value: this.selectedItem[2].value },
        { name: 'difficulty', value: this.selectedItem[3].value },
        { name: 'usage', value: this.selectedItem[4].value },
        { name: 'tarotName', value: this.selectedItem[5].value },
        { name: 'tarotDesc', value: this.selectedItem[6].value },
        { name: 'tarotEquipLevel', value: this.selectedItem[7].value },
        { name: 'tarotDifficulty', value: this.selectedItem[8].value },
        { name: 'tarotEquipTypes', value: this.selectedItem[9].value },
        { name: 'tarotTokusei', value: [this.selectedItem[10].value[0], this.selectedItem[10].value[1]] },
        { name: 'tarotConditions', value: [[this.selectedItem[11].value[0][0], [this.selectedItem[11].value[0][1][0], this.selectedItem[11].value[0][1][1]], [this.selectedItem[11].value[0][2][0], this.selectedItem[11].value[0][2][1]]], [this.selectedItem[11].value[1][0], [this.selectedItem[11].value[1][1][0], this.selectedItem[11].value[1][1][1]], [this.selectedItem[11].value[1][2][0], this.selectedItem[11].value[1][2][1]]]] },
        { name: 'soulName', value: this.selectedItem[12].value },
        { name: 'soulDesc', value: this.selectedItem[13].value },
        { name: 'soulEquipLevel', value: this.selectedItem[14].value },
        { name: 'soulDifficulty', value: this.selectedItem[15].value },
        { name: 'soulEquipTypes', value: this.selectedItem[16].value },
        { name: 'soulTokusei', value: [this.selectedItem[17].value[0], this.selectedItem[17].value[1]] },
        { name: 'soulConditions', value: [[this.selectedItem[18].value[0][0], [this.selectedItem[18].value[0][1][0], this.selectedItem[18].value[0][1][1]], [this.selectedItem[18].value[0][2][0], this.selectedItem[18].value[0][2][1]]], [this.selectedItem[18].value[1][0], [this.selectedItem[18].value[1][1][0], this.selectedItem[18].value[1][1][1]], [this.selectedItem[18].value[1][2][0], this.selectedItem[18].value[1][2][1]]]] }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'demonID', value: 0 },
        { name: 'itemID', value: 0 },
        { name: 'difficulty', value: 0 },
        { name: 'usage', value: 2 },
        { name: 'tarotName', value: '' },
        { name: 'tarotDesc', value: '' },
        { name: 'tarotEquipLevel', value: 0 },
        { name: 'tarotDifficulty', value: 0 },
        { name: 'tarotEquipTypes', value: 0 },
        { name: 'tarotTokusei', value: [0, 0] },
        { name: 'tarotConditions', value: [[0, [0, 0]], [0, [0, 0]]] },
        { name: 'soulName', value: '' },
        { name: 'soulDesc', value: '' },
        { name: 'soulEquipLevel', value: 0 },
        { name: 'soulDifficulty', value: 0 },
        { name: 'soulEquipTypes', value: 0 },
        { name: 'soulTokusei', value: [0, 0] },
        { name: 'soulConditions', value: [[0, [0, 0]], [0, [0, 0]]] }
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
          console.log(this.editingItem);
          this.content.push(this.editingItem);
          console.log(this.content)
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
      this.content.forEach((item: EnchantDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiEnchantData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="devilCrystal">\n`;
        xml += '	    <object name="MiDevilCrystalData">\n';
        xml += `        <member name="demonID">${item[1].value}</member>\n`;
        xml += `        <member name="itemID">${item[2].value}</member>\n`;
        xml += `        <member name="difficulty">${item[3].value}</member>\n`;
        xml += `        <member name="usage">${item[4].value}</member>\n`;
        xml += `        <member name="tarot">\n`;
        xml += `            <object name="MiEnchantCharasticData">\n`;
        xml += `                <member name="name"><![CDATA[${item[5].value || ''}]]></member>\n`;
        xml += `                <member name="desc"><![CDATA[${item[6].value || ''}]]></member>\n`;
        xml += `                <member name="equipLevel">${item[7].value}</member>\n`;
        xml += `                <member name="difficulty">${item[8].value}</member>\n`;
        xml += `                <member name="equipTypes">${item[9].value}</member>\n`;
        xml += `                <member name="tokusei">\n`;
        item[10].value.forEach((i: any) => {
          xml += `                    <element>${i}</element>\n`;
        });
        xml += `                </member>\n`;
        xml += `                <member name="conditions">\n`;
        item[11].value.forEach((i: any) => {
          xml += `                    <element>\n`;
          xml += `                        <object name="MiSpecialConditionData">\n`;
          xml += `                            <member name="type">${i[0]}</member>\n`;
          xml += `                            <member name="params">\n`;
          xml += `                                <element>${i[1][0]}</element>\n`;
          xml += `                                <element>${i[1][1]}</element>\n`;
          xml += `                            </member>\n`;
          xml += `                            <member name="tokusei">\n`;
          xml += `                                <element>${i[2][0]}</element>\n`;
          xml += `                                <element>${i[2][1]}</element>\n`;
          xml += `                            </member>\n`;
          xml += `                        </object>\n`;
          xml += `                    </element>\n`;
        });
        xml += `                </member>\n`;
        xml += `            </object>\n`;
        xml += `        </member>\n`;
        xml += `        <member name="soul">\n`;
        xml += `            <object name="MiEnchantCharasticData">\n`;
        xml += `                <member name="name"><![CDATA[${item[12].value || ''}]]></member>\n`;
        xml += `                <member name="desc"><![CDATA[${item[13].value || ''}]]></member>\n`;
        xml += `                <member name="equipLevel">${item[14].value}</member>\n`;
        xml += `                <member name="difficulty">${item[15].value}</member>\n`;
        xml += `                <member name="equipTypes">${item[16].value}</member>\n`;
        xml += `                <member name="tokusei">\n`;
        item[17].value.forEach((i: any) => {
          xml += `                    <element>${i}</element>\n`;
        });
        xml += `                </member>\n`;
        xml += `                <member name="conditions">\n`;
        item[18].value.forEach((i: any) => {
          xml += `                    <element>\n`;
          xml += `                        <object name="MiSpecialConditionData">\n`;
          xml += `                            <member name="type">${i[0]}</member>\n`;
          xml += `                            <member name="params">\n`;
          xml += `                                <element>${i[1][0]}</element>\n`;
          xml += `                                <element>${i[1][1]}</element>\n`;
          xml += `                            </member>\n`;
          xml += `                            <member name="tokusei">\n`;
          xml += `                                <element>${i[2][0]}</element>\n`;
          xml += `                                <element>${i[2][1]}</element>\n`;
          xml += `                            </member>\n`;
          xml += `                        </object>\n`;
          xml += `                    </element>\n`;
        });
        xml += `                </member>\n`;
        xml += `            </object>\n`;
        xml += `        </member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        // Write the closing tag for the item
        xml += '	</object>\n';

        // Write the closing tag for the root element
      });
      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
