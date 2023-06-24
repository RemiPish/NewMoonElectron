import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type synthesisDataStructure = [
  { name: 'ID', value: number },
  { name: 'baseSkillID', value: number },
  { name: 'skillID', value: number },
  { name: 'itemID', value: number },
  { name: 'count', value: number },
  { name: 'difficulty', value: number },
  { name: 'type', value: number },
  { name: 'order', value: number },
  { name: 'slotMin', value: number },
  { name: 'slotMax', value: number },
  { name: 'expertBoosts', value: any[] },
  { name: 'materials', value: any[][] },
  { name: 'rateScaling', value: any[] }
];

@Component({
  selector: 'app-synthesis-data',
  templateUrl: './synthesis-data.component.html',
  styleUrls: ['./synthesis-data.component.scss']
})
export class SynthesisDataComponent {
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
    ;
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
      const itemStr = String(item[3].value).toLowerCase();
      return idStr.includes(searchStr) || itemStr.includes(searchStr);
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
        let materials: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "materials").element.length) {
          item.member.find((m: any) => m["@name"] === "materials").element.forEach((m: any) => {
            materials.push([m.object.member[0]["#text"], m.object.member[1]["#text"]]);
          });
        }
        else materials.push([item.member.find((m: any) => m["@name"] === "materials").element.object.member[0]["#text"], item.member.find((m: any) => m["@name"] === "materials").element.object.member[1]["#text"]]);

        let rateScaling: number[] = [];
        if (item.member.find((m: any) => m["@name"] === "rateScaling").element.length) {
          item.member.find((m: any) => m["@name"] === "rateScaling").element.forEach((m: any) => {
            rateScaling.push(m);
          });
        }
        else {
          rateScaling.push(item.member.find((m: any) => m["@name"] === "rateScaling").element);
        }

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "baseSkillID", value: item.member.find((m: any) => m["@name"] === "baseSkillID")["#text"] },
          { name: "skillID", value: item.member.find((m: any) => m["@name"] === "skillID")["#text"] },
          { name: "itemID", value: item.member.find((m: any) => m["@name"] === "itemID")["#text"] },
          { name: "count", value: item.member.find((m: any) => m["@name"] === "count")["#text"] },
          { name: "difficulty", value: item.member.find((m: any) => m["@name"] === "difficulty")["#text"] },
          { name: "type", value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
          { name: "order", value: item.member.find((m: any) => m["@name"] === "order")["#text"] },
          { name: "slotMin", value: item.member.find((m: any) => m["@name"] === "slotMin")["#text"] },
          { name: "slotMax", value: item.member.find((m: any) => m["@name"] === "slotMax")["#text"] },
          { name: "expertBoosts", value: [item.member.find((m: any) => m["@name"] === "expertBoosts").element[0], item.member.find((m: any) => m["@name"] === "expertBoosts").element[1]] },
          { name: "materials", value: materials },
          { name: "rateScaling", value: rateScaling }
        ];
      }));
      console.log(items)
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
      let materials: any[] = [];
      this.selectedItem[11].value.forEach((m: any) => {
        materials.push([m[0], m[1]]);
      });

      let rateScaling: number[] = [];

      this.selectedItem[12].value.forEach((m: any) => {
        rateScaling.push(m);
      });

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'baseSkillID', value: this.selectedItem[1].value },
        { name: 'skillID', value: this.selectedItem[2].value },
        { name: 'itemID', value: this.selectedItem[3].value },
        { name: 'count', value: this.selectedItem[4].value },
        { name: 'difficulty', value: this.selectedItem[5].value },
        { name: 'type', value: this.selectedItem[6].value },
        { name: 'order', value: this.selectedItem[7].value },
        { name: 'slotMin', value: this.selectedItem[8].value },
        { name: 'slotMax', value: this.selectedItem[9].value },
        { name: 'expertBoosts', value: [this.selectedItem[10].value[0], this.selectedItem[10].value[1]] },
        { name: 'materials', value: materials },
        { name: 'rateScaling', value: rateScaling }
      ];
    }
    else {
      let materials: any[] = [];
      for (let i = 0; i < 8; i++) {
        materials.push([0, 0]);
      };

      let rateScaling: number[] = [];
      for (let i = 0; i < 16; i++) {
        rateScaling.push(0);
      };

      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'baseSkillID', value: 0 },
        { name: 'skillID', value: 0 },
        { name: 'itemID', value: 0 },
        { name: 'count', value: 0 },
        { name: 'difficulty', value: 0 },
        { name: 'type', value: 0 },
        { name: 'order', value: 0 },
        { name: 'slotMin', value: 0 },
        { name: 'slotMax', value: 0 },
        { name: 'expertBoosts', value: [0, 0] },
        { name: 'materials', value: materials },
        { name: 'rateScaling', value: rateScaling }

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
      this.content.forEach((item: synthesisDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiSynthesisData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="baseSkillID">${item[1].value}</member>\n`;
        xml += `    <member name="skillID">${item[2].value}</member>\n`;
        xml += `    <member name="itemID">${item[3].value}</member>\n`;
        xml += `    <member name="count">${item[4].value}</member>\n`;
        xml += `    <member name="difficulty">${item[5].value}</member>\n`;
        xml += `    <member name="type">${item[6].value}</member>\n`;
        xml += `    <member name="order">${item[7].value}</member>\n`;
        xml += `    <member name="slotMin">${item[8].value}</member>\n`;
        xml += `    <member name="slotMax">${item[9].value}</member>\n`;
        xml += `    <member name="expertBoosts">\n`;
        xml += `      <element>${item[10].value[0]}</element>\n`;
        xml += `      <element>${item[10].value[1]}</element>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="materials">\n`;
        item[11].value.forEach((m: any) => {
          xml += `      <element>\n`;
          xml += `        <object name="MiSynthesisItemData">\n`;
          xml += `          <member name="itemID">${m[0]}</member>\n`;
          xml += `          <member name="amount">${m[1]}</member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
        });
        xml += `    </member>\n`;
        xml += `    <member name="rateScaling">\n`;
        item[12].value.forEach((m: any) => {
          xml += `      <element>${m}</element>\n`;
        });
        xml += `    </member>\n`;
        xml += `  </object>\n`;
      });
      // Write the closing tag for the root element

      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
