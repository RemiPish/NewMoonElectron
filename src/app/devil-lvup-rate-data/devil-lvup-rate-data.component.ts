import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type devilLVUpRateDataStructure = [
  { name: 'ID', value: number },
  { name: 'groupID', value: number },
  { name: 'subID', value: number },
  { name: 'levelUpData', value: any[][] },
  { name: 'name', value: string },
  { name: 'reunionConditions', value: any[][] },

];

@Component({
  selector: 'app-devil-lvup-rate-data',
  templateUrl: './devil-lvup-rate-data.component.html',
  styleUrls: ['./devil-lvup-rate-data.component.scss']
})
export class DevilLvupRateDataComponent {
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
  showTable: boolean[] = [];

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
        let values: any = [];
        item.member.find((m: any) => m["@name"] === "levelUpData").element.forEach((data: any) => {
          values.push([data.object.member[0]["#text"], data.object.member[1]["#text"], data.object.member[2]["#text"], data.object.member[3]["#text"], data.object.member[4]["#text"], data.object.member[5]["#text"]]);
        });
        let reunionConditions: any = [];
        item.member.find((m: any) => m["@name"] === "reunionConditions").element.forEach((data: any) => {
          reunionConditions.push([data.object.member[0]["#text"], data.object.member[1]["#text"]]);
        });
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
          { name: "subID", value: item.member.find((m: any) => m["@name"] === "subID")["#text"] },
          { name: "levelUpData", value: values },
          { name: "name", value: item.member.find((m: any) => m["@name"] === "name")["#text"] },
          { name: "reunionConditions", value: reunionConditions },
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
      if (id === 'zero') {
        this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === 0);
      }
      else
        this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let lvup: any = [];
      this.selectedItem[3].value.forEach((item: any) => {
        lvup.push([item[0], item[1], item[2], item[3], item[4], item[5]]);
      });
      let reunionConditions: any = [];
      this.selectedItem[5].value.forEach((item: any) => {
        reunionConditions.push([item[0], item[1]]);
      });
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'groupID', value: this.selectedItem[1].value },
        { name: 'subID', value: this.selectedItem[2].value },
        { name: 'levelUpData', value: lvup },
        { name: 'name', value: this.selectedItem[4].value },
        { name: 'reunionConditions', value: reunionConditions },

      ];

    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'groupID', value: 0 },
        { name: 'subID', value: 0 },
        { name: 'levelUpData', value: [] },
        { name: 'name', value: "" },
        { name: 'reunionConditions', value: [] },
      ];
      for (let i = 0; i < 4; i++) {
        this.editingItem[3].value.push([0, 0, 0, 0, 0, 0]);
      }
      for (let i = 0; i < 4; i++) {
        this.editingItem[5].value.push([0, 0]);
      }
    }
    this.cd.detectChanges();
  }

  cancelEdit() {
    this.formMsg = "";
    this.editingItem = null;
    this.selectedItem = null;
    this.inEdition = false;
    this.filteredContent = this.content;
    for (let i = 0; i < 14; i++) {
      this.showTable[i] = false;
    }
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

  changeShow(i: number) {
    this.showTable[i] = !this.showTable[i];
    this.cd.detectChanges();
  }

  onSearch() {
    if (this.searchTableText === "" || !this.searchTableText) {
      this.filteredContent = this.content;
    }

    const searchStr = this.searchTableText.toLowerCase();
    this.filteredContent = this.content.filter((item) => {
      const idStr = String(item[0].value).toLowerCase();
      const nameStr = String(item[4].value).toLowerCase();
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
      this.content.forEach((item: devilLVUpRateDataStructure) => {
        xml += '	<object name="MiDevilLVUpRateData">\n';
        xml += `		<member name="ID">${item[0].value}</member>\n`;
        xml += `		<member name="groupID">${item[1].value}</member>\n`;
        xml += `		<member name="subID">${item[2].value}</member>\n`;
        xml += `		<member name="levelUpData">\n`;

        item[3].value.forEach(data => {
          xml += `			<element>\n`;
          xml += `				<object name="MiDevilLVUpData">\n`;
          xml += `					<member name="STR">${data[0]}</member>\n`;
          xml += `					<member name="MAGIC">${data[1]}</member>\n`;
          xml += `					<member name="VIT">${data[2]}</member>\n`;
          xml += `					<member name="INTEL">${data[3]}</member>\n`;
          xml += `					<member name="SPEED">${data[4]}</member>\n`;
          xml += `					<member name="LUCK">${data[5]}</member>\n`;
          xml += `				</object>\n`;
          xml += `			</element>\n`;
        })
        xml += `		</member>\n`;
        xml += `	  <member name="name"><![CDATA[${item[4].value || ''}]]></member>\n`;
        xml += `		<member name="reunionConditions">\n`;
        item[5].value.forEach(data => {
          xml += `			<element>\n`;
          xml += `				<object name="MiDevilReunionConditionData">\n`;
          xml += `					<member name="itemID">${data[0]}</member>\n`;
          xml += `					<member name="amount">${data[1]}</member>\n`;
          xml += `				</object>\n`;
          xml += `			</element>\n`;
        })
        xml += `		</member>\n`;
        xml += `	</object>\n`;
      })
      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
