import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';


export type correctData = [
  { name: 'ID', value: string },
  { name: 'type', value: number },
  { name: 'value', value: number },
];

export type itemDataStructure = [
  { name: 'ID', value: number },
  { name: 'mainCategory', value: number },
  { name: 'subCategory', value: number },
  { name: 'affinity', value: number },
  { name: 'correctTable', value: correctData[] },
  { name: 'baseID', value: number },
  { name: 'buyPrice', value: number },
  { name: 'sellPrice', value: number },
  { name: 'repairPrice', value: number },
  { name: 'appearanceID', value: number },
  { name: 'weaponType', value: string },
  { name: 'equipType', value: string },
  { name: 'flags', value: number },
  { name: 'possessionType', value: number },
  { name: 'durability', value: number },
  { name: 'stackSize', value: number },
  { name: 'useSkill', value: number },
  { name: 'gender', value: number },
  { name: 'level', value: number },
  { name: 'alignment', value: string },
  { name: 'skillTable', value: number[] },
  { name: 'modSlots', value: number },
  { name: 'stock', value: number },
  { name: 'GPRequirement', value: number },
  { name: 'rental', value: number }
];

@Component({
  selector: 'app-item-data',
  templateUrl: './item-data.component.html',
  styleUrls: ['./item-data.component.scss']
})
export class ItemDataComponent {

  contentJson: string = "";
  @Input() fileMode: string = "";
  @Output() fileIsValid = new EventEmitter<boolean>();
  @Output() saveXmlFile = new EventEmitter<string>();
  @Output() encryptFile = new EventEmitter<string>();
  @Output() contentParsed = new EventEmitter<any>();

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
      //console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {
        let skillTable: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.length) {
          item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.forEach((m: any) => {
            skillTable.push(m["#text"]);
          })
        }
        else skillTable.push(item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "skillTbl").element.object.member["#text"]);

        let correctTable: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element) {
          if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.length) {
            item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.forEach((m: any) => {
              correctTable.push([{ name: 'ID', value: m.object.member[0]["#text"] },
              { name: 'type', value: m.object.member[1]["#text"] },
              { name: 'value', value: m.object.member[2]["#text"] }]);
            })
          }
          else
            correctTable.push([{ name: 'ID', value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[0]["#text"] },
            { name: 'type', value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[1]["#text"] },
            { name: 'value', value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[2]["#text"] }]);
        }

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "id")["#text"] },
          { name: "mainCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "mainCategory")["#text"] },
          { name: "subCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "subCategory")["#text"] },
          { name: "affinity", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "affinity")["#text"] },
          { name: 'correctTbl', value: correctTable },
          { name: "baseID", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "baseID")["#text"] },
          { name: "buyPrice", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "buyPrice")["#text"] },
          { name: "sellPrice", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "sellPrice")["#text"] },
          { name: "repairPrice", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "repairPrice")["#text"] },
          { name: "appearanceID", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "appearanceID")["#text"] },
          { name: "weaponType", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "weaponType")["#text"] },
          { name: "equipType", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "equipType")["#text"] },
          { name: "flags", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "flags")["#text"] },

          { name: "possessionType", value: item.member.find((m: any) => m["@name"] === "possession").object.member.find((m: any) => m["@name"] === "type")["#text"] },
          { name: "durability", value: item.member.find((m: any) => m["@name"] === "possession").object.member.find((m: any) => m["@name"] === "durability")["#text"] },
          { name: "stackSize", value: item.member.find((m: any) => m["@name"] === "possession").object.member.find((m: any) => m["@name"] === "stackSize")["#text"] },
          { name: "useSkill", value: item.member.find((m: any) => m["@name"] === "possession").object.member.find((m: any) => m["@name"] === "useSkill")["#text"] },

          { name: "gender", value: item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "gender")["#text"] },
          { name: "level", value: item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "level")["#text"] },
          { name: "alignment", value: item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "alignment")["#text"] },
          { name: "skillTable", value: skillTable },
          { name: "modSlots", value: item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "modSlots")["#text"] },
          { name: "stock", value: item.member.find((m: any) => m["@name"] === "restriction").object.member.find((m: any) => m["@name"] === "stock")["#text"] },
          { name: "GPRequirement", value: item.member.find((m: any) => m["@name"] === "pvp").object.member["#text"] },
          { name: "rental", value: item.member.find((m: any) => m["@name"] === "rental").object.member["#text"] },

        ];
      }));

      //console.log(items);
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

  async parseContent(json: string) {
    let res = await this.parseItemData(json);
    this.contentParsed.emit(res);
  }

  openEdition(id?: any) {

    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let skillTable: any[] = [];
      let correctTable: any[] = [];
      for (let i = 0; i < this.selectedItem[20].value.length; i++) {
        skillTable.push(this.selectedItem[20].value[i]);
      }

      for (let i = 0; i < this.selectedItem[4].value.length; i++) {
        correctTable.push([{ name: 'ID', value: this.selectedItem[4].value[i][0].value },
        { name: 'type', value: this.selectedItem[4].value[i][1].value },
        { name: 'value', value: this.selectedItem[4].value[i][2].value }]);
      }
      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: "mainCategory", value: this.selectedItem[1].value },
        { name: "subCategory", value: this.selectedItem[2].value },
        { name: "affinity", value: this.selectedItem[3].value },
        { name: 'correctTbl', value: correctTable },
        { name: "baseID", value: this.selectedItem[5].value },
        { name: "buyPrice", value: this.selectedItem[6].value },
        { name: "sellPrice", value: this.selectedItem[7].value },
        { name: "repairPrice", value: this.selectedItem[8].value },
        { name: "appearanceID", value: this.selectedItem[9].value },
        { name: "weaponType", value: this.selectedItem[10].value },
        { name: "equipType", value: this.selectedItem[11].value },
        { name: "flags", value: this.selectedItem[12].value },

        { name: "possessionType", value: this.selectedItem[13].value },
        { name: "durability", value: this.selectedItem[14].value },
        { name: "stackSize", value: this.selectedItem[15].value },
        { name: "useSkill", value: this.selectedItem[16].value },

        { name: "gender", value: this.selectedItem[17].value },
        { name: "level", value: this.selectedItem[18].value },
        { name: "alignment", value: this.selectedItem[19].value },
        { name: "skillTable", value: skillTable },
        { name: "modSlots", value: this.selectedItem[21].value },
        { name: "stock", value: this.selectedItem[22].value },
        { name: "GPRequirement", value: this.selectedItem[23].value },
        { name: "rental", value: this.selectedItem[24].value }
      ];
      //console.log(this.editingItem)
    }
    else {
      this.editingItem = [
        { name: "ID", value: null },
        { name: "mainCategory", value: 0 },
        { name: "subCategory", value: 0 },
        { name: "affinity", value: 0 },
        { name: 'correctTbl', value: [] },
        { name: "baseID", value: 0 },
        { name: "buyPrice", value: 0 },
        { name: "sellPrice", value: 0 },
        { name: "repairPrice", value: 0 },
        { name: "appearanceID", value: 0 },
        { name: "weaponType", value: "NONE" },
        { name: "equipType", value: "EQUIP_TYPE_NONE" },
        { name: "flags", value: 0 },

        { name: "possessionType", value: 1 },
        { name: "durability", value: 0 },
        { name: "stackSize", value: 0 },
        { name: "useSkill", value: 0 },

        { name: "gender", value: 2 },
        { name: "level", value: 0 },
        { name: "alignment", value: "ALL" },
        { name: "skillTable", value: [0] },
        { name: "modSlots", value: 0 },
        { name: "stock", value: 0 },
        { name: "GPRequirement", value: 0 },
        { name: "rental", value: 0 }
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
    console.log(event)
    this.currentPage = event;
    this.cd.detectChanges();
  }

  removeSkill(i: number) {
    this.editingItem[20].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addSkill() {
    this.editingItem[20].value.push(0);
    this.cd.detectChanges();
  }

  removeCorrect(i: number) {
    this.editingItem[4].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addCorrect() {
    this.editingItem[4].value.push([{ name: 'ID', value: 0 },
    { name: 'type', value: 0 },
    { name: 'value', value: 0 }]);
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string, content: any) {
    const confirmation = confirm('Save this ItemData file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      content.forEach((item: itemDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiItemData">\n';

        // Write the baseData element
        xml += '		<member name="common">\n';
        xml += `			<object name="MiSkillItemStatusCommonData">\n`;
        xml += `				<member name="id">${item[0].value}</member>\n`;
        xml += `				<member name="category">\n`;
        xml += `				  <object name="MiCategoryData">\n`;
        xml += `            <member name="mainCategory">${item[1].value}</member>\n`;
        xml += `            <member name="subCategory">${item[2].value}</member>\n`;
        xml += `				  </object>\n`;
        xml += `				</member>\n`;
        xml += `        <member name="affinity">${item[3].value}</member>\n`;
        if (item[4].value.length > 0) {
          xml += `        <member name="correctTbl">\n`;
          for (let i = 0; i < item[4].value.length; i++) {
            xml += `          <element>\n`;
            xml += `            <object name="MiCorrectTbl">\n`;
            xml += `              <member name="ID">${item[4].value[i][0].value}</member>\n`;
            xml += `              <member name="Type">${item[4].value[i][1].value}</member>\n`;
            xml += `              <member name="Value">${item[4].value[i][2].value}</member>\n`;
            xml += `            </object>\n`;
            xml += `          </element>\n`;
          }
          xml += `        </member>\n`;
        }
        else xml += `        <member name="correctTbl"/>\n`;

        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += '		<member name="basic">\n';
        xml += `			<object name="MiItemBasicData">\n`;
        xml += `				<member name="baseID">${item[5].value}</member>\n`;
        xml += `        <member name="buyPrice">${item[6].value}</member>\n`;
        xml += `        <member name="sellPrice">${item[7].value}</member>\n`;
        xml += `        <member name="repairPrice">${item[8].value}</member>\n`;
        xml += `        <member name="appearanceID">${item[9].value}</member>\n`;
        xml += `        <member name="weaponType">${item[10].value}</member>\n`;
        xml += `        <member name="equipType">${item[11].value}</member>\n`;
        xml += `        <member name="flags">${item[12].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += '		<member name="possession">\n';
        xml += `			<object name="MiPossessionData">\n`;
        xml += `				<member name="type">${item[13].value}</member>\n`;
        xml += `        <member name="durability">${item[14].value}</member>\n`;
        xml += `        <member name="stackSize">${item[15].value}</member>\n`;
        xml += `        <member name="useSkill">${item[16].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += '		<member name="restriction">\n';
        xml += `			<object name="MiUseRestrictionsData">\n`;
        xml += `				<member name="gender">${item[17].value}</member>\n`;
        xml += `        <member name="level">${item[18].value}</member>\n`;
        xml += `        <member name="alignment">${item[19].value}</member>\n`;
        if (item[20].value.length > 0) {
          xml += `        <member name="skillTbl">\n`;
          xml += `          <element>\n`;
          xml += `            <object name="MiSkillTbl">\n`;
          for (let i = 0; i < item[20].value.length; i++) {

            xml += `              <member name="skill">${item[20].value[i]}</member>\n`;

          }
          xml += `            </object>\n`;
          xml += `          </element>\n`;
          xml += `        </member>\n`;
        }
        else xml += `        <member name="skillTbl"/>\n`;
        xml += `        <member name="modSlots">${item[21].value}</member>\n`;
        xml += `        <member name="stock">${item[22].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';
        if (item[23].value != null) {
          xml += '		<member name="pvp">\n';
          xml += `			<object name="MiItemPvPData">\n`;
          xml += `				<member name="GPRequirement">${item[23].value}</member>\n`;
          xml += `			</object>\n`;
          xml += '		</member>\n';
        }
        xml += '		<member name="rental">\n';
        xml += `			<object name="MiRentalData">\n`;
        xml += `				<member name="rental">${item[24].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';

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
