import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type devilBoostDataStructure = [
  { name: 'ID', value: number },
  { name: 'minLevel', value: number },
  { name: 'maxLevel', value: number },
  { name: 'growthType', value: number },
  { name: 'growthRank', value: number },
  { name: 'benefitGauge', value: number },
  { name: 'requirements', value: any[][] },
  { name: 'results', value: any[][] },
  { name: 'extraID', value: number },
];

@Component({
  selector: 'app-devil-boost-data',
  templateUrl: './devil-boost-data.component.html',
  styleUrls: ['./devil-boost-data.component.scss']
})
export class DevilBoostDataComponent {
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

  async parseData(json: string) {
    try {
      const parsed = JSON.parse(json);
      const items = await Promise.all(parsed.map(async (item: any) => {
        let requirements: any = [];
        item.member.find((m: any) => m["@name"] === "requirements").element.forEach((data: any) => {
          requirements.push([data.object.member[0]["#text"], data.object.member[1]["#text"], data.object.member[2]["#text"], data.object.member[3]["#text"], data.object.member[4]["#text"]]);
        });
        let results: any = [];
        item.member.find((m: any) => m["@name"] === "results").element.forEach((data: any) => {
          results.push([data.object.member[0]["#text"], data.object.member[1]["#text"], data.object.member[2]["#text"], data.object.member[3]["#text"], data.object.member[4]["#text"], data.object.member[5]["#text"]]);
        });
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "minLevel", value: item.member.find((m: any) => m["@name"] === "minLevel")["#text"] },
          { name: "maxLevel", value: item.member.find((m: any) => m["@name"] === "maxLevel")["#text"] },
          { name: "growthType", value: item.member.find((m: any) => m["@name"] === "growthType")["#text"] },
          { name: "growthRank", value: item.member.find((m: any) => m["@name"] === "growthRank")["#text"] },
          { name: "benefitGauge", value: item.member.find((m: any) => m["@name"] === "benefitGauge")["#text"] },
          { name: "requirements", value: requirements },
          { name: "results", value: results },
          { name: "extraID", value: item.member.find((m: any) => m["@name"] === "extraID")["#text"] },
        ];
      }));
      return items;
    }
    catch (error) {
      this.loadingTable = false;
      this.isValidFile = false;
      this.fileIsValid.emit(false);
      return [];
    }
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

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let requirements: any = [];
      this.selectedItem[6].value.forEach((item: any) => {
        requirements.push([item[0], item[1], item[2], item[3], item[4]]);
      });

      let results: any = [];
      this.selectedItem[7].value.forEach((item: any) => {
        results.push([item[0], item[1], item[2], item[3], item[4], item[5]]);
      });

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'minLevel', value: this.selectedItem[1].value },
        { name: 'maxLevel', value: this.selectedItem[2].value },
        { name: 'growthType', value: this.selectedItem[3].value },
        { name: 'growthRank', value: this.selectedItem[4].value },
        { name: 'benefitGauge', value: this.selectedItem[5].value },
        { name: 'requirements', value: requirements },
        { name: 'results', value: results },
        { name: 'extraID', value: this.selectedItem[8].value },
      ];

    }
    else {

      let requirements: any = [];
      for (let i = 0; i < 3; i++) {
        requirements.push(['NONE', -1, -1, -1, -1]);
      };

      let results: any = [];
      for (let i = 0; i < 8; i++) {
        results.push([-1, -1, -1, -1, -1, 0]);
      };


      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'minLevel', value: -1 },
        { name: 'maxLevel', value: -1 },
        { name: 'growthType', value: -1 },
        { name: 'growthRank', value: -1 },
        { name: 'benefitGauge', value: -1 },
        { name: 'requirements', value: requirements },
        { name: 'results', value: results },
        { name: 'extraID', value: 0 },
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

  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.content;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.content.filter((item) => {
      const idStr = String(item[0].value).toLowerCase();
      return idStr.includes(searchStr);
    });

    this.currentPage = 1;
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
      this.content.forEach((item: devilBoostDataStructure) => {
        xml += '	<object name="MiDevilBoostData">\n';
        xml += `		<member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="minLevel">${item[1].value}</member>\n`;
        xml += `    <member name="maxLevel">${item[2].value}</member>\n`;
        xml += `    <member name="growthType">${item[3].value}</member>\n`;
        xml += `    <member name="growthRank">${item[4].value}</member>\n`;
        xml += `    <member name="benefitGauge">${item[5].value}</member>\n`;
        xml += `		<member name="requirements">\n`;


        item[6].value.forEach(data => {
          xml += `			<element>\n`;
          xml += `				<object name="MiDevilBoostRequirementData">\n`;
          xml += `					<member name="type">${data[0]}</member>\n`;
          xml += `          <member name="value1">${data[1]}</member>\n`;
          xml += `          <member name="value2">${data[2]}</member>\n`;
          xml += `          <member name="value3">${data[3]}</member>\n`;
          xml += `          <member name="value4">${data[4]}</member>\n`;
          xml += `				</object>\n`;
          xml += `			</element>\n`;
        })
        xml += `		</member>\n`;
        xml += `		<member name="results">\n`;


        item[7].value.forEach(data => {
          xml += `			<element>\n`;
          xml += `				<object name="MiDevilBoostResultData">\n`;
          xml += `					<member name="type">${data[0]}</member>\n`;
          xml += `          <member name="minPoints">${data[1]}</member>\n`;
          xml += `          <member name="maxPoints">${data[2]}</member>\n`;
          xml += `          <member name="unused1">${data[3]}</member>\n`;
          xml += `          <member name="unused2">${data[4]}</member>\n`;
          xml += `          <member name="points">${data[5]}</member>\n`;
          xml += `				</object>\n`;
          xml += `			</element>\n`;
        })
        xml += `		</member>\n`;
        xml += `    <member name="extraID">${item[8].value}</member>\n`;
        xml += `	</object>\n`;
      })
      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
