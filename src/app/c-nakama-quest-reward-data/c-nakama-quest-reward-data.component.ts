import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type cNakamaQuestRewardDataStructure = [
  { name: 'ID', value: number },
  { name: 'reward1_unknown1', value: number },
  { name: 'reward1_unknown2', value: number },
  { name: 'reward1_fixedReward', value: number[] },
  { name: 'reward1_unknown3', value: number },
  { name: 'reward1_unknown4', value: number },
  { name: 'reward1_variableRewards', value: number[][] },
  { name: 'reward2_unknown1', value: number },
  { name: 'reward2_unknown2', value: number },
  { name: 'reward2_fixedReward', value: number[] },
  { name: 'reward2_unknown3', value: number },
  { name: 'reward2_unknown4', value: number },
  { name: 'reward2_variableRewards', value: number[][] },
  { name: 'reward3_unknown1', value: number },
  { name: 'reward3_unknown2', value: number },
  { name: 'reward3_fixedReward', value: number[] },
  { name: 'reward3_unknown3', value: number },
  { name: 'reward3_unknown4', value: number },
  { name: 'reward3_variableRewards', value: number[][] },
  { name: 'reward4_unknown1', value: number },
  { name: 'reward4_unknown2', value: number },
  { name: 'reward4_fixedReward', value: number[] },
  { name: 'reward4_unknown3', value: number },
  { name: 'reward4_unknown4', value: number },
  { name: 'reward4_variableRewards', value: number[][] },
];

@Component({
  selector: 'app-c-nakama-quest-reward-data',
  templateUrl: './c-nakama-quest-reward-data.component.html',
  styleUrls: ['./c-nakama-quest-reward-data.component.scss']
})
export class CNakamaQuestRewardDataComponent {
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
        let reward1Fixed: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "reward1_fixedReward").object) {
          item.member.find((m: any) => m["@name"] === "reward1_fixedReward").object.member.forEach((m: any) => {
            reward1Fixed.push(m["#text"]);
          });
        }
        let reward1Variable: any[][] = [];


        if (item.member[6].element) {
          for (let i = 0; i < item.member[6].element.length; i++) {
            reward1Variable.push([item.member[6].element[i].object.member[0]["#text"], item.member[6].element[i].object.member[1]["#text"], item.member[6].element[i].object.member[2]["#text"], item.member[6].element[i].object.member[3]["#text"], item.member[6].element[i].object.member[4]["#text"]])
          }
        }


        let reward2Fixed: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "reward2_fixedReward").object) {
          item.member.find((m: any) => m["@name"] === "reward2_fixedReward").object.member.forEach((m: any) => {
            reward2Fixed.push(m["#text"]);
          });
        }
        let reward2Variable: any[][] = [];
        if (item.member[12].element) {
          for (let i = 0; i < item.member[12].element.length; i++) {
            reward2Variable.push([item.member[12].element[i].object.member[0]["#text"], item.member[12].element[i].object.member[1]["#text"], item.member[12].element[i].object.member[2]["#text"], item.member[12].element[i].object.member[3]["#text"], item.member[12].element[i].object.member[4]["#text"]])
          }
        }

        let reward3Fixed: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "reward3_fixedReward").object) {
          item.member.find((m: any) => m["@name"] === "reward3_fixedReward").object.member.forEach((m: any) => {
            reward3Fixed.push(m["#text"]);
          });
        }
        let reward3Variable: any[][] = [];
        if (item.member[18].element) {
          for (let i = 0; i < item.member[18].element.length; i++) {
            reward3Variable.push([item.member[18].element[i].object.member[0]["#text"], item.member[18].element[i].object.member[1]["#text"], item.member[18].element[i].object.member[2]["#text"], item.member[18].element[i].object.member[3]["#text"], item.member[18].element[i].object.member[4]["#text"]])
          }
        }

        let reward4Fixed: any[] = [];
        if (item.member.find((m: any) => m["@name"] === "reward4_fixedReward").object) {
          item.member.find((m: any) => m["@name"] === "reward4_fixedReward").object.member.forEach((m: any) => {
            reward4Fixed.push(m["#text"]);
          });
        }
        let reward4Variable: any[][] = [];
        if (item.member[24].element) {
          for (let i = 0; i < item.member[24].element.length; i++) {
            reward3Variable.push([item.member[24].element[i].object.member[0]["#text"], item.member[24].element[i].object.member[1]["#text"], item.member[24].element[i].object.member[2]["#text"], item.member[24].element[i].object.member[3]["#text"], item.member[24].element[i].object.member[4]["#text"]])
          }
        }


        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "reward1_unknown1", value: item.member.find((m: any) => m["@name"] === "reward1_unknown1")["#text"] },
          { name: "reward1_unknown2", value: item.member.find((m: any) => m["@name"] === "reward1_unknown2")["#text"] },
          { name: "reward1_fixedReward", value: reward1Fixed },
          { name: "reward1_unknown3", value: item.member.find((m: any) => m["@name"] === "reward1_unknown3")["#text"] },
          { name: "reward1_unknown4", value: item.member.find((m: any) => m["@name"] === "reward1_unknown4")["#text"] },
          { name: "reward1_variableRewards", value: reward1Variable },
          { name: "reward2_unknown1", value: item.member.find((m: any) => m["@name"] === "reward2_unknown1")["#text"] },
          { name: "reward2_unknown2", value: item.member.find((m: any) => m["@name"] === "reward2_unknown2")["#text"] },
          { name: "reward2_fixedReward", value: reward2Fixed },
          { name: "reward2_unknown3", value: item.member.find((m: any) => m["@name"] === "reward2_unknown3")["#text"] },
          { name: "reward2_unknown4", value: item.member.find((m: any) => m["@name"] === "reward2_unknown4")["#text"] },
          { name: "reward2_variableRewards", value: reward2Variable },
          { name: "reward3_unknown1", value: item.member.find((m: any) => m["@name"] === "reward3_unknown1")["#text"] },
          { name: "reward3_unknown2", value: item.member.find((m: any) => m["@name"] === "reward3_unknown2")["#text"] },
          { name: "reward3_fixedReward", value: reward3Fixed },
          { name: "reward3_unknown3", value: item.member.find((m: any) => m["@name"] === "reward3_unknown3")["#text"] },
          { name: "reward3_unknown4", value: item.member.find((m: any) => m["@name"] === "reward3_unknown4")["#text"] },
          { name: "reward3_variableRewards", value: reward3Variable },
          { name: "reward4_unknown1", value: item.member.find((m: any) => m["@name"] === "reward4_unknown1")["#text"] },
          { name: "reward4_unknown2", value: item.member.find((m: any) => m["@name"] === "reward4_unknown2")["#text"] },
          { name: "reward4_fixedReward", value: reward4Fixed },
          { name: "reward4_unknown3", value: item.member.find((m: any) => m["@name"] === "reward4_unknown3")["#text"] },
          { name: "reward4_unknown4", value: item.member.find((m: any) => m["@name"] === "reward4_unknown4")["#text"] },
          { name: "reward4_variableRewards", value: reward4Variable }
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
      let reward1Fixed: any[] = [];
      if (this.selectedItem[3].value.length) {
        this.selectedItem[3].value.forEach((m: any) => {
          reward1Fixed.push(m);
        });
      }
      let reward1Variable: any[][] = [];
      if (this.selectedItem[6].value.length) {
        this.selectedItem[6].value.forEach((elt: any) => {
          reward1Variable.push([elt[0], elt[1], elt[2], elt[3], elt[4]]);
        });
      }
      let reward2Fixed: any[] = [];
      if (this.selectedItem[9].value.length) {
        this.selectedItem[9].value.forEach((m: any) => {
          reward2Fixed.push(m);
        });
      }
      let reward2Variable: any[][] = [];
      if (this.selectedItem[12].value.length) {
        this.selectedItem[12].value.forEach((elt: any) => {
          reward2Variable.push([elt[0], elt[1], elt[2], elt[3], elt[4]]);
        });
      }

      let reward3Fixed: any[] = [];
      if (this.selectedItem[15].value.length) {
        this.selectedItem[15].value.forEach((m: any) => {
          reward3Fixed.push(m);
        });
      }

      let reward3Variable: any[][] = [];
      if (this.selectedItem[18].value.length) {
        this.selectedItem[18].value.forEach((elt: any) => {
          reward3Variable.push([elt[0], elt[1], elt[2], elt[3], elt[4]]);
        });
      }
      let reward4Fixed: any[] = [];
      if (this.selectedItem[21].value.length) {
        this.selectedItem[21].value.forEach((m: any) => {
          reward4Fixed.push(m);
        });
      }
      let reward4Variable: any[][] = [];
      if (this.selectedItem[24].value.length) {
        this.selectedItem[24].value.forEach((elt: any) => {
          reward4Variable.push([elt[0], elt[1], elt[2], elt[3], elt[4]]);
        });
      }
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'reward1_unknown1', value: this.selectedItem[1].value },
        { name: 'reward1_unknown2', value: this.selectedItem[2].value },
        { name: 'reward1_fixedReward', value: reward1Fixed },
        { name: 'reward1_unknown3', value: this.selectedItem[4].value },
        { name: 'reward1_unknown4', value: this.selectedItem[5].value },
        { name: 'reward1_variableRewards', value: reward1Variable },
        { name: 'reward2_unknown1', value: this.selectedItem[7].value },
        { name: 'reward2_unknown2', value: this.selectedItem[8].value },
        { name: 'reward2_fixedReward', value: reward2Fixed },
        { name: 'reward2_unknown3', value: this.selectedItem[10].value },
        { name: 'reward2_unknown4', value: this.selectedItem[11].value },
        { name: 'reward2_variableRewards', value: reward2Variable },
        { name: 'reward3_unknown1', value: this.selectedItem[13].value },
        { name: 'reward3_unknown2', value: this.selectedItem[14].value },
        { name: 'reward3_fixedReward', value: reward3Fixed },
        { name: 'reward3_unknown3', value: this.selectedItem[16].value },
        { name: 'reward3_unknown4', value: this.selectedItem[17].value },
        { name: 'reward3_variableRewards', value: reward3Variable },
        { name: 'reward4_unknown1', value: this.selectedItem[19].value },
        { name: 'reward4_unknown2', value: this.selectedItem[20].value },
        { name: 'reward4_fixedReward', value: reward4Fixed },
        { name: 'reward4_unknown3', value: this.selectedItem[22].value },
        { name: 'reward4_unknown4', value: this.selectedItem[23].value },
        { name: 'reward4_variableRewards', value: reward4Variable }
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'reward1_unknown1', value: 0 },
        { name: 'reward1_unknown2', value: 0 },
        { name: 'reward1_fixedReward', value: [0, 0, 0, 0, 0] },
        { name: 'reward1_unknown3', value: 0 },
        { name: 'reward1_unknown4', value: 0 },
        { name: 'reward1_variableRewards', value: [[0, 0, 0, 0, 0]] },
        { name: 'reward2_unknown1', value: 0 },
        { name: 'reward2_unknown2', value: 0 },
        { name: 'reward2_fixedReward', value: [0, 0, 0, 0, 0] },
        { name: 'reward2_unknown3', value: 0 },
        { name: 'reward2_unknown4', value: 0 },
        { name: 'reward2_variableRewards', value: [[0, 0, 0, 0, 0]] },
        { name: 'reward3_unknown1', value: 0 },
        { name: 'reward3_unknown2', value: 0 },
        { name: 'reward3_fixedReward', value: [0, 0, 0, 0, 0] },
        { name: 'reward3_unknown3', value: 0 },
        { name: 'reward3_unknown4', value: 0 },
        { name: 'reward3_variableRewards', value: [[0, 0, 0, 0, 0]] },
        { name: 'reward4_unknown1', value: 0 },
        { name: 'reward4_unknown2', value: 0 },
        { name: 'reward4_fixedReward', value: [0, 0, 0, 0, 0] },
        { name: 'reward4_unknown3', value: 0 },
        { name: 'reward4_unknown4', value: 0 },
        { name: 'reward4_variableRewards', value: [[0, 0, 0, 0, 0]] }
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

  removeVariable(i: number, index: number) {
    this.editingItem[index].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addVariable(index: number) {
    this.editingItem[index].value.push([0, 0, 0, 0, 0]);
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: cNakamaQuestRewardDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiCNakamaQuestRewardData">\n';

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="reward1_unknown1">${item[1].value}</member>\n`;
        xml += `    <member name="reward1_unknown2">${item[2].value}</member>\n`;
        xml += `    <member name="reward1_fixedReward">\n`;
        xml += `        <object name="MiNakamaQuestRewardFixedData">\n`
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `            <member name="unknown${i + 1}">${item[3].value[i]}</member>\n`;
        }
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="reward1_unknown3">${item[4].value}</member>\n`;
        xml += `    <member name="reward1_unknown4">${item[5].value}</member>\n`;
        if (item[6].value.length) {
          xml += `    <member name="reward1_variableRewards">\n`;


          for (let i = 0; i < item[6].value.length; i++) {
            xml += `        <element>\n`;
            xml += `                <object name="MiNakamaQuestRewardVariableTbl">\n`
            for (let j = 0; j < item[6].value[i].length; j++) {
              xml += `                    <member name="unknown${i + 1}">${item[6].value[i][j]}</member>\n`;

            }
            xml += `                </object>\n`;
            xml += `         </element>\n`;

          }
          xml += `    </member>\n`;
        }
        else {
          xml += `    <member name="reward1_variableRewards"/>\n`;
        }
        xml += `    <member name="reward2_unknown1">${item[7].value}</member>\n`;
        xml += `    <member name="reward2_unknown2">${item[8].value}</member>\n`;
        xml += `    <member name="reward2_fixedReward">\n`;
        xml += `        <object name="MiNakamaQuestRewardFixedData">\n`
        for (let i = 0; i < item[9].value.length; i++) {
          xml += `            <member name="unknown${i + 1}">${item[9].value[i]}</member>\n`;
        }
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="reward2_unknown3">${item[10].value}</member>\n`;
        xml += `    <member name="reward2_unknown4">${item[11].value}</member>\n`;
        if (item[12].value.length) {
          xml += `    <member name="reward2_variableRewards">\n`;
          for (let i = 0; i < item[12].value.length; i++) {
            xml += `        <element>\n`;
            xml += `                <object name="MiNakamaQuestRewardVariableTbl">\n`
            for (let j = 0; j < item[12].value[i].length; j++) {
              xml += `                    <member name="unknown${i + 1}">${item[12].value[i][j]}</member>\n`;

            }
            xml += `                </object>\n`;
            xml += `         </element>\n`;
          }
          xml += `    </member>\n`;
        }
        else {
          xml += `    <member name="reward2_variableRewards"/>\n`;
        }
        xml += `    <member name="reward3_unknown1">${item[13].value}</member>\n`;
        xml += `    <member name="reward3_unknown2">${item[14].value}</member>\n`;
        xml += `    <member name="reward3_fixedReward">\n`;
        xml += `        <object name="MiNakamaQuestRewardFixedData">\n`
        for (let i = 0; i < item[15].value.length; i++) {
          xml += `            <member name="unknown${i + 1}">${item[15].value[i]}</member>\n`;
        }
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="reward3_unknown3">${item[16].value}</member>\n`;
        xml += `    <member name="reward3_unknown4">${item[17].value}</member>\n`;
        if (item[18].value.length) {
          xml += `    <member name="reward3_variableRewards">\n`;
          for (let i = 0; i < item[18].value.length; i++) {
            xml += `        <element>\n`;
            xml += `                <object name="MiNakamaQuestRewardVariableTbl">\n`
            for (let j = 0; j < item[18].value[i].length; j++) {
              xml += `                    <member name="unknown${i + 1}">${item[18].value[i][j]}</member>\n`;

            }
            xml += `                </object>\n`;
            xml += `         </element>\n`;
          }
          xml += `    </member>\n`;
        }
        else {
          xml += `    <member name="reward3_variableRewards"/>\n`;
        }
        xml += `    <member name="reward4_unknown1">${item[19].value}</member>\n`;
        xml += `    <member name="reward4_unknown2">${item[20].value}</member>\n`;
        xml += `    <member name="reward4_fixedReward">\n`;
        xml += `        <object name="MiNakamaQuestRewardFixedData">\n`
        for (let i = 0; i < item[21].value.length; i++) {
          xml += `            <member name="unknown${i + 1}">${item[21].value[i]}</member>\n`;
        }
        xml += `        </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="reward4_unknown3">${item[22].value}</member>\n`;
        xml += `    <member name="reward4_unknown4">${item[23].value}</member>\n`;
        if (item[24].value.length) {
          xml += `    <member name="reward4_variableRewards">\n`;
          for (let i = 0; i < item[24].value.length; i++) {
            xml += `        <element>\n`;
            xml += `                <object name="MiNakamaQuestRewardVariableTbl">\n`
            for (let j = 0; j < item[24].value[i].length; j++) {
              xml += `                    <member name="unknown${i + 1}">${item[24].value[i][j]}</member>\n`;

            }
            xml += `                </object>\n`;
            xml += `         </element>\n`;
          }
          xml += `    </member>\n`;
        }
        else {
          xml += `    <member name="reward4_variableRewards"/>\n`;
        }
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
