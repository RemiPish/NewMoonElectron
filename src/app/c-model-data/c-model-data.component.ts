import { Component, Output, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';


export type cModelDataStructure = [
  { name: 'ID', value: number },
  { name: 'iconID', value: number },
  { name: 'scale', value: number },
  { name: 'summonCircleSize', value: number },
  { name: 'unk4', value: number },
  { name: 'model', value: string },
  { name: 'texture', value: string },
  { name: 'color', value: number[] },
  { name: 'unk8', value: number },
  { name: 'unk9', value: number },
  { name: 'unk10', value: number },
  { name: 'modelView', value: number[] },
  { name: 'motionMap', value: number[][] },
];

@Component({
  selector: 'app-c-model-data',
  templateUrl: './c-model-data.component.html',
  styleUrls: ['./c-model-data.component.scss']
})
export class CModelDataComponent implements OnChanges {
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
      const modelStr = item[5].value ? item[5].value.toLowerCase() : '';
      const textureStr = item[6].value ? item[6].value.toLowerCase() : '';
      return idStr.includes(searchStr) || modelStr.includes(searchStr) || textureStr.includes(searchStr);
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
      //console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {
        let modelView: number[] = [];
        item.member.find((m: any) => m["@name"] === "view").object.member.forEach((m: any) =>
          modelView.push(m["#text"]))

        let motionMap: number[][] = [];
        if (item.member.find((m: any) => m["@name"] === "motion").element) {
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "motion").element.length; i++) {
            motionMap.push([]);
            item.member.find((m: any) => m["@name"] === "motion").element[i].object.member.forEach((m: any) => {
              motionMap[i].push(m["#text"])
            });

          }
        }


        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "iconID", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "iconID")["#text"] },
          { name: "scale", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "scale")["#text"] },
          { name: "summonCircleSize", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "summonCircleSize")["#text"] },
          { name: "unk4", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "unk4")["#text"] },
          { name: "model", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "model")["#text"] },
          { name: "texture", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "texture")["#text"] },
          { name: "color", value: [item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "color").element[0] || 0, item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "color").element[1] || 0, item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "color").element[2] || 0] },
          { name: "unk8", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "unk8")["#text"] },
          { name: "unk9", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "unk9")["#text"] },
          { name: "unk10", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "unk10")["#text"] },
          { name: "modelView", value: modelView },
          { name: "motionMap", value: motionMap }
        ];
      }));

      console.log(items);
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
      let modelView: number[] = [];
      this.selectedItem[11].value.forEach((m: any) =>
        modelView.push(m))

      let motionMap: number[][] = [];
      for (let i = 0; i < this.selectedItem[12].value.length; i++) {
        motionMap.push([]);
        this.selectedItem[12].value[i].forEach((m: any) => {
          motionMap[i].push(m)
        });

      }

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'iconID', value: this.selectedItem[1].value },
        { name: 'scale', value: this.selectedItem[2].value },
        { name: 'summonCircleSize', value: this.selectedItem[3].value },
        { name: 'unk4', value: this.selectedItem[4].value },
        { name: 'model', value: this.selectedItem[5].value },
        { name: 'texture', value: this.selectedItem[6].value },
        { name: 'color', value: [this.selectedItem[7].value[0], this.selectedItem[7].value[1], this.selectedItem[7].value[2]] },
        { name: 'unk8', value: this.selectedItem[8].value },
        { name: 'unk9', value: this.selectedItem[9].value },
        { name: 'unk10', value: this.selectedItem[10].value },
        { name: "modelView", value: modelView },
        { name: "motionMap", value: motionMap }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'iconID', value: 0 },
        { name: 'scale', value: 0 },
        { name: 'summonCircleSize', value: 0 },
        { name: 'unk4', value: 0 },
        { name: 'model', value: "" },
        { name: 'texture', value: "" },
        { name: 'color', value: [0, 0, 0] },
        { name: 'unk8', value: 0 },
        { name: 'unk9', value: 0 },
        { name: 'unk10', value: 0 },
        { name: 'modelView', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'motionMap', value: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
      ];
    }

    console.log(this.editingItem);
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

  removeMotion(i: number) {
    this.editingItem[12].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addMotion() {
    this.editingItem[12].value.push(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
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

      // Loop through each item in this.content array
      this.content.forEach((item: cModelDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCModelData">\n';
        xml += `    <member name="base">\n`;
        xml += '	    <object name="MiCModelBase">\n';
        xml += `        <member name="ID">${item[0].value}</member>\n`;
        xml += `        <member name="iconID">${item[1].value}</member>\n`;
        xml += `        <member name="scale">${item[2].value}</member>\n`;
        xml += `        <member name="summonCircleSize">${item[3].value}</member>\n`;
        xml += `        <member name="unk4">${item[4].value}</member>\n`;
        xml += `        <member name="model"><![CDATA[${item[5].value || ""}]]></member>\n`;
        xml += `        <member name="texture"><![CDATA[${item[6].value || ""}]]></member>\n`;
        xml += `        <member name="color">\n`;
        xml += `          <element>${item[7].value[0]}</element>\n`;
        xml += `          <element>${item[7].value[1]}</element>\n`;
        xml += `          <element>${item[7].value[2]}</element>\n`;
        xml += `        </member>\n`;
        xml += `        <member name="unk8">${item[8].value}</member>\n`;
        xml += `        <member name="unk9">${item[9].value}</member>\n`;
        xml += `        <member name="unk10">${item[10].value}</member>\n`;
        xml += `      </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="view">\n`;
        xml += `	    <object name="MiCModelView">\n`;
        xml += `        <member name="unk1">${item[11].value[0]}</member>\n`;
        xml += `        <member name="unk2">${item[11].value[1]}</member>\n`;
        xml += `        <member name="unk3">${item[11].value[2]}</member>\n`;
        xml += `        <member name="unk4">${item[11].value[3]}</member>\n`;
        xml += `        <member name="unk5">${item[11].value[4]}</member>\n`;
        xml += `        <member name="unk6">${item[11].value[5]}</member>\n`;
        xml += `        <member name="unk7">${item[11].value[6]}</member>\n`;
        xml += `        <member name="unk8">${item[11].value[7]}</member>\n`;
        xml += `        <member name="unk9">${item[11].value[8]}</member>\n`;
        xml += `        <member name="unk10">${item[11].value[9]}</member>\n`;
        xml += `        <member name="unk11">${item[11].value[10]}</member>\n`;
        xml += `        <member name="unk12">${item[11].value[11]}</member>\n`;
        xml += `        <member name="unk13">${item[11].value[12]}</member>\n`;
        xml += `        <member name="unk14">${item[11].value[13]}</member>\n`;
        xml += `        <member name="unk15">${item[11].value[14]}</member>\n`;
        xml += `        <member name="unk16">${item[11].value[15]}</member>\n`;
        xml += '	    </object>\n';
        xml += `    </member>\n`;
        xml += `    <member name="motion">\n`;
        for (let i = 0; i < item[12].value.length; i++) {
          xml += `        <element>\n`;
          xml += `          <object name="MiCModelMotionMap">\n`;
          xml += `             <member name="ID">${item[12].value[i][0]}</member>\n`;
          xml += `             <member name="unk2">${item[12].value[i][1]}</member>\n`;
          xml += `             <member name="unk3">${item[12].value[i][2]}</member>\n`;
          xml += `             <member name="unk4">${item[12].value[i][3]}</member>\n`;
          xml += `             <member name="unk5">${item[12].value[i][4]}</member>\n`;
          xml += `             <member name="unk6">${item[12].value[i][5]}</member>\n`;
          xml += `             <member name="unk7">${item[12].value[i][6]}</member>\n`;
          xml += `             <member name="unk8">${item[12].value[i][7]}</member>\n`;
          xml += `             <member name="unk9">${item[12].value[i][8]}</member>\n`;
          xml += `             <member name="unk10">${item[12].value[i][9]}</member>\n`;
          xml += `          </object>\n`;
          xml += `        </element>\n`;
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
