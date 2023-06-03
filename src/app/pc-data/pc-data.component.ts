import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type pcDataStructure = [
  { name: 'ID', value: number },
  { name: 'unknown1', value: number },
  { name: 'unknown2', value: number },
  { name: 'unknown3', value: number },
  { name: 'unknown4', value: number },
  { name: 'unknown5', value: number },
  { name: 'unknown6', value: number },
  { name: 'unknown7', value: number },
  { name: 'appearance1', value: number },
  { name: 'appearance2', value: number },
  { name: 'appearance3', value: number },
  { name: 'appearance4', value: number },
  { name: 'appearance5', value: number },
  { name: 'appearance6', value: number },
  { name: 'appearance7', value: number },
  { name: 'appearance8', value: number },
  { name: 'appearance9', value: boolean },
  { name: 'appearance10', value: number },
  { name: 'appearance11', value: number },
  { name: 'equipment', value: number[] },//15
  { name: 'skillTable', value: number[] },
  { name: 'bunknown1', value: number },
  { name: 'bunknown2', value: number },
  { name: 'bunknown3', value: number },
  { name: 'bunknown4', value: number },
  { name: 'bunknown5', value: number },
  { name: 'bunknown6', value: number[] }
];
@Component({
  selector: 'app-pc-data',
  templateUrl: './pc-data.component.html',
  styleUrls: ['./pc-data.component.scss']
})
export class PcDataComponent {
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
          let skillTable: any[] = [];
          if (item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.length) {
            item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.forEach((m: any) => {
              skillTable.push(m["#text"]);
            })
          }
          else skillTable.push(item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member["#text"]);
          let bu6: any = [];
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown6").element.length; i++) {
            bu6.push(item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown6").element[i])
          }
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: 'unknown1', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
            { name: 'unknown2', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
            { name: 'unknown3', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
            { name: 'unknown4', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
            { name: 'unknown5', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
            { name: 'unknown6', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown6")["#text"] },
            { name: 'unknown7', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown7")["#text"] },
            { name: 'appearance1', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance1")["#text"] },
            { name: 'appearance2', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance2")["#text"] },
            { name: 'appearance3', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance3")["#text"] },
            { name: 'appearance4', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance4")["#text"] },
            { name: 'appearance5', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance5")["#text"] },
            { name: 'appearance6', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance6")["#text"] },
            { name: 'appearance7', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance7")["#text"] },
            { name: 'appearance8', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance8")["#text"] },
            { name: 'appearance9', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance9")["#text"] },
            { name: 'appearance10', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance10")["#text"] },
            { name: 'appearance11', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance11")["#text"] },
            {
              name: 'equipment', value: [item.member.find((m: any) => m["@name"] === "equipment").element[0],
              item.member.find((m: any) => m["@name"] === "equipment").element[1],
              item.member.find((m: any) => m["@name"] === "equipment").element[2],
              item.member.find((m: any) => m["@name"] === "equipment").element[3],
              item.member.find((m: any) => m["@name"] === "equipment").element[4],
              item.member.find((m: any) => m["@name"] === "equipment").element[5],
              item.member.find((m: any) => m["@name"] === "equipment").element[6],
              item.member.find((m: any) => m["@name"] === "equipment").element[7],
              item.member.find((m: any) => m["@name"] === "equipment").element[8],
              item.member.find((m: any) => m["@name"] === "equipment").element[9],
              item.member.find((m: any) => m["@name"] === "equipment").element[10],
              item.member.find((m: any) => m["@name"] === "equipment").element[11],
              item.member.find((m: any) => m["@name"] === "equipment").element[12],
              item.member.find((m: any) => m["@name"] === "equipment").element[13],
              item.member.find((m: any) => m["@name"] === "equipment").element[14]]
            },
            { name: 'skillTable', value: skillTable },
            { name: 'bunknown1', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
            { name: 'bunknown2', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
            { name: 'bunknown3', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
            { name: 'bunknown4', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
            { name: 'bunknown5', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
            { name: 'bunknown6', value: bu6 },
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        let item = parsed;
        let skillTable: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.length) {
          item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member.forEach((m: any) => {
            skillTable.push(m["#text"]);
          })
        }
        else skillTable.push(item.member.find((m: any) => m["@name"] === "skillTbl").element.object.member["#text"]);
        let bu6: any = [];
        for (let i = 0; i < item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown6").element.length; i++) {
          bu6.push(item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown6").element[i])
        }
        return [[
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'unknown1', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
          { name: 'unknown2', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
          { name: 'unknown3', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
          { name: 'unknown4', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
          { name: 'unknown5', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
          { name: 'unknown6', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown6")["#text"] },
          { name: 'unknown7', value: item.member.find((m: any) => m["@name"] === "basic").object.member.find((m: any) => m["@name"] === "unknown7")["#text"] },
          { name: 'appearance1', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance1")["#text"] },
          { name: 'appearance2', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance2")["#text"] },
          { name: 'appearance3', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance3")["#text"] },
          { name: 'appearance4', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance4")["#text"] },
          { name: 'appearance5', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance5")["#text"] },
          { name: 'appearance6', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance6")["#text"] },
          { name: 'appearance7', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance7")["#text"] },
          { name: 'appearance8', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance8")["#text"] },
          { name: 'appearance9', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance9")["#text"] },
          { name: 'appearance10', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance10")["#text"] },
          { name: 'appearance11', value: item.member.find((m: any) => m["@name"] === "appearance").object.member.find((m: any) => m["@name"] === "appearance11")["#text"] },
          {
            name: 'equipment', value: [item.member.find((m: any) => m["@name"] === "equipment").element[0],
            item.member.find((m: any) => m["@name"] === "equipment").element[1],
            item.member.find((m: any) => m["@name"] === "equipment").element[2],
            item.member.find((m: any) => m["@name"] === "equipment").element[3],
            item.member.find((m: any) => m["@name"] === "equipment").element[4],
            item.member.find((m: any) => m["@name"] === "equipment").element[5],
            item.member.find((m: any) => m["@name"] === "equipment").element[6],
            item.member.find((m: any) => m["@name"] === "equipment").element[7],
            item.member.find((m: any) => m["@name"] === "equipment").element[8],
            item.member.find((m: any) => m["@name"] === "equipment").element[9],
            item.member.find((m: any) => m["@name"] === "equipment").element[10],
            item.member.find((m: any) => m["@name"] === "equipment").element[11],
            item.member.find((m: any) => m["@name"] === "equipment").element[12],
            item.member.find((m: any) => m["@name"] === "equipment").element[13],
            item.member.find((m: any) => m["@name"] === "equipment").element[14]]
          },
          { name: 'skillTable', value: skillTable },
          { name: 'bunknown1', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
          { name: 'bunknown2', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
          { name: 'bunknown3', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown3")["#text"] },
          { name: 'bunknown4', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown4")["#text"] },
          { name: 'bunknown5', value: item.member.find((m: any) => m["@name"] === "battle").object.member.find((m: any) => m["@name"] === "unknown5")["#text"] },
          { name: 'bunknown6', value: bu6 },
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
      let skillTable: any[] = [];

      for (let i = 0; i < this.selectedItem[20].value.length; i++) {
        skillTable.push(this.selectedItem[20].value[i]);
      }

      let bu6: any = [];
      for (let i = 0; i < this.selectedItem[26].value.length; i++) {
        bu6.push(this.selectedItem[26].value[i])
      }

      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: 'unknown1', value: this.selectedItem[1].value },
        { name: 'unknown2', value: this.selectedItem[2].value },
        { name: 'unknown3', value: this.selectedItem[3].value },
        { name: 'unknown4', value: this.selectedItem[4].value },
        { name: 'unknown5', value: this.selectedItem[5].value },
        { name: 'unknown6', value: this.selectedItem[6].value },
        { name: 'unknown7', value: this.selectedItem[7].value },
        { name: 'appearance1', value: this.selectedItem[8].value },
        { name: 'appearance2', value: this.selectedItem[9].value },
        { name: 'appearance3', value: this.selectedItem[10].value },
        { name: 'appearance4', value: this.selectedItem[11].value },
        { name: 'appearance5', value: this.selectedItem[12].value },
        { name: 'appearance6', value: this.selectedItem[13].value },
        { name: 'appearance7', value: this.selectedItem[14].value },
        { name: 'appearance8', value: this.selectedItem[15].value },
        { name: 'appearance9', value: this.selectedItem[16].value },
        { name: 'appearance10', value: this.selectedItem[17].value },
        { name: 'appearance11', value: this.selectedItem[18].value },
        {
          name: 'equipment', value: [this.selectedItem[19].value[0],
          this.selectedItem[19].value[1],
          this.selectedItem[19].value[2],
          this.selectedItem[19].value[3],
          this.selectedItem[19].value[4],
          this.selectedItem[19].value[5],
          this.selectedItem[19].value[6],
          this.selectedItem[19].value[7],
          this.selectedItem[19].value[8],
          this.selectedItem[19].value[9],
          this.selectedItem[19].value[10],
          this.selectedItem[19].value[11],
          this.selectedItem[19].value[12],
          this.selectedItem[19].value[13],
          this.selectedItem[19].value[14]]
        },
        { name: 'skillTable', value: skillTable },
        { name: 'bunknown1', value: this.selectedItem[21].value },
        { name: 'bunknown2', value: this.selectedItem[22].value },
        { name: 'bunknown3', value: this.selectedItem[23].value },
        { name: 'bunknown4', value: this.selectedItem[24].value },
        { name: 'bunknown5', value: this.selectedItem[25].value },
        { name: 'bunknown6', value: bu6 },
      ];
      //console.log(this.editingItem)
    }
    else {
      let bu6: any = [];
      for (let i = 0; i < 84; i++) {
        bu6.push(0)
      }
      this.editingItem = [
        { name: "ID", value: null },
        { name: 'unknown1', value: 0 },
        { name: 'unknown2', value: 0 },
        { name: 'unknown3', value: 0 },
        { name: 'unknown4', value: 0 },
        { name: 'unknown5', value: 0 },
        { name: 'unknown6', value: 0 },
        { name: 'unknown7', value: 0 },
        { name: 'appearance1', value: 0 },
        { name: 'appearance2', value: 0 },
        { name: 'appearance3', value: 0 },
        { name: 'appearance4', value: 0 },
        { name: 'appearance5', value: 0 },
        { name: 'appearance6', value: 0 },
        { name: 'appearance7', value: 0 },
        { name: 'appearance8', value: 0 },
        { name: 'appearance9', value: true },
        { name: 'appearance10', value: 0 },
        { name: 'appearance11', value: 0 },
        {
          name: 'equipment', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        { name: "skillTable", value: [0] },
        { name: 'bunknown1', value: 0 },
        { name: 'bunknown2', value: 0 },
        { name: 'bunknown3', value: 0 },
        { name: 'bunknown4', value: 0 },
        { name: 'bunknown5', value: 0 },
        { name: 'bunknown6', value: bu6 }
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

  removeSkill(i: number) {
    this.editingItem[20].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addSkill() {
    this.editingItem[20].value.push(0);
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
      this.content.forEach((item: pcDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiPCData">\n';

        // Write the baseData element
        xml += '		<member name="basic">\n';
        xml += `			<object name="MiPCBasicData">\n`;
        xml += `				<member name="ID">${item[0].value}</member>\n`;
        xml += `				<member name="unknown1">${item[1].value}</member>\n`;
        xml += `				<member name="unknown2">${item[2].value}</member>\n`;
        xml += `				<member name="unknown3">${item[3].value}</member>\n`;
        xml += `        <member name="unknown4">${item[4].value}</member>\n`;
        xml += `        <member name="unknown5">${item[5].value}</member>\n`;
        xml += `        <member name="unknown6">${item[6].value}</member>\n`;
        xml += `        <member name="unknown7">${item[7].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += '		<member name="appearance">\n';
        xml += `			<object name="MiAppearanceData">\n`;
        xml += `				<member name="appearance1">${item[8].value}</member>\n`;
        xml += `        <member name="appearance2">${item[9].value}</member>\n`;
        xml += `        <member name="appearance3">${item[10].value}</member>\n`;
        xml += `        <member name="appearance4">${item[11].value}</member>\n`;
        xml += `        <member name="appearance5">${item[12].value}</member>\n`;
        xml += `        <member name="appearance6">${item[13].value}</member>\n`;
        xml += `        <member name="appearance7">${item[14].value}</member>\n`;
        xml += `        <member name="appearance8">${item[15].value}</member>\n`;
        xml += `        <member name="appearance9">${item[16].value}</member>\n`;
        xml += `        <member name="appearance10">${item[17].value}</member>\n`;
        xml += `        <member name="appearance11">${item[18].value}</member>\n`;
        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += '		<member name="equipment">\n';
        for (let i = 0; i < item[19].value.length; i++) {
          xml += `		  <element>${item[19].value[i]}</element>\n`;
        }
        xml += '		</member>\n';
        xml += '		<member name="unionTbl"/>\n';
        if (item[20].value.length > 0) {
          xml += `    <member name="skillTbl">\n`;
          xml += `      <element>\n`;
          xml += `        <object name="MiSkillTbl">\n`;
          for (let i = 0; i < item[20].value.length; i++) {

            xml += `              <member name="skill">${item[20].value[i]}</member>\n`;

          }
          xml += `        </object>\n`;
          xml += `      </element>\n`;
          xml += `    </member>\n`;
        }
        else xml += `        <member name="skillTbl"/>\n`;


        xml += '		<member name="battle">\n';
        xml += `			<object name="MiPCBattleData">\n`;
        xml += `				<member name="unknown1">${item[21].value}</member>\n`;
        xml += `				<member name="unknown2">${item[22].value}</member>\n`;
        xml += `				<member name="unknown3">${item[23].value}</member>\n`;
        xml += `				<member name="unknown4">${item[24].value}</member>\n`;
        xml += `				<member name="unknown5">${item[25].value}</member>\n`;
        xml += `				<member name="unknown6">\n`;
        for (let i = 0; i < item[26].value.length; i++) {
          xml += `		    <element>${item[26].value[i]}</element>\n`;
        }
        xml += `				</member>\n`;
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
