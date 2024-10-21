import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type dataStructure = [
  { name: 'id', value: number },
  { name: 'mainCategory', value: number },
  { name: 'subCategory', value: number },
  { name: 'affinity', value: string },
  { name: 'correctTbl', value: any[][] },
  { name: 'maxStack', value: number },
  { name: 'stackType', value: number },
  { name: 'applicationLogic', value: number },
  { name: 'primaryGroupID', value: number },
  { name: 'groupID', value: number },
  { name: 'groupRank', value: number },
  { name: 'functionID', value: number },
  { name: 'restrictions', value: number },
  { name: 'HPDamage', value: number },
  { name: 'MPDamage', value: number },
  { name: 'duration', value: number },
  { name: 'durationType', value: string },
  { name: 'cancelTypes', value: number },
];

@Component({
  selector: 'app-status-data',
  templateUrl: './status-data.component.html',
  styleUrls: ['./status-data.component.scss']
})
export class StatusDataComponent {

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

        let correctTable: any[][] = [];
        if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element) {
          if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.length) {
            item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.forEach((m: any) => {
              correctTable.push([m.object.member[0]["#text"],
              m.object.member[1]["#text"],
              m.object.member[2]["#text"]]);
            })
          }
          else
            correctTable.push([item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[0]["#text"],
            item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[1]["#text"],
            item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[2]["#text"]]);
        }


        return [
          { name: "id", value: item.member[0].object.member[0]["#text"] },
          { name: "mainCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "mainCategory")["#text"] },
          { name: "subCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "subCategory")["#text"] },
          { name: "affinity", value: String(item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "affinity")["#text"]) },
          { name: 'correctTbl', value: correctTable },
          { name: "maxStack", value: item.member[1].object.member[0]["#text"] },
          { name: "stackType", value: item.member[1].object.member[1]["#text"] },
          { name: "applicationLogic", value: item.member[1].object.member[2]["#text"] },
          { name: "primaryGroupID", value: item.member[1].object.member[3]["#text"] },
          { name: "groupID", value: item.member[1].object.member[4]["#text"] },
          { name: "groupRank", value: item.member[1].object.member[5]["#text"] },
          { name: "functionID", value: item.member[1].object.member[6]["#text"] },
          { name: "restrictions", value: item.member[2].object.member[0]["#text"] },
          { name: "HPDamage", value: item.member[2].object.member[1].object.member[0]["#text"] },
          { name: "MPDamage", value: item.member[2].object.member[1].object.member[1]["#text"] },
          { name: "duration", value: item.member[3].object.member[0]["#text"] },
          { name: "durationType", value: item.member[3].object.member[1]["#text"] },
          { name: "cancelTypes", value: item.member[3].object.member[2]["#text"] },
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

      let correctTable: any[][] = [];
      this.selectedItem[4].value.forEach((m: any) => {
        correctTable.push([m[0], m[1], m[2]]);
      })




      this.editingItem = [
        { name: 'id', value: this.selectedItem[0].value },
        { name: "mainCategory", value: this.selectedItem[1].value },
        { name: "subCategory", value: this.selectedItem[2].value },
        { name: "affinity", value: this.selectedItem[3].value },
        { name: 'correctTbl', value: correctTable },
        { name: "maxStack", value: this.selectedItem[5].value },
        { name: "stackType", value: this.selectedItem[6].value },
        { name: "applicationLogic", value: this.selectedItem[7].value },
        { name: "primaryGroupID", value: this.selectedItem[8].value },
        { name: "groupID", value: this.selectedItem[9].value },
        { name: "groupRank", value: this.selectedItem[10].value },
        { name: "functionID", value: this.selectedItem[11].value },
        { name: "restrictions", value: this.selectedItem[12].value },
        { name: "HPDamage", value: this.selectedItem[13].value },
        { name: "MPDamage", value: this.selectedItem[14].value },
        { name: "duration", value: this.selectedItem[15].value },
        { name: "durationType", value: this.selectedItem[16].value },
        { name: "cancelTypes", value: this.selectedItem[17].value }

      ];
    } else {
      let correctTable: any[][] = [];
      //correctTable.push(['STR', 0, 0]);



      this.editingItem = [
        { name: 'id', value: null },
        { name: "mainCategory", value: 0 },
        { name: "subCategory", value: 0 },
        { name: "affinity", value: '0' },
        { name: 'correctTbl', value: correctTable },
        { name: "maxStack", value: 0 },
        { name: "stackType", value: 0 },
        { name: "applicationLogic", value: 0 },
        { name: "primaryGroupID", value: 0 },
        { name: "groupID", value: 0 },
        { name: "groupRank", value: 0 },
        { name: "functionID", value: 0 },
        { name: "restrictions", value: 0 },
        { name: "HPDamage", value: 0 },
        { name: "MPDamage", value: 0 },
        { name: "duration", value: 0 },
        { name: "durationType", value: 'MS' },
        { name: "cancelTypes", value: 0 }

      ];
    }
    this.cd.detectChanges();
  }

  showAffinity(affinity: any) {
    switch (affinity) {
      case '0':
        return "NONE";
      case '1':
        return 'WEAPON';
      case '2':
        return 'SLASH';
      case '3':
        return 'CHARGE';
      case '4':
        return 'BLUNT';
      case '5':
        return 'HANDGUN';
      case '6':
        return 'PENETRATE';
      case '7':
        return 'SPREAD';
      case '8':
        return 'FIRE';
      case '9':
        return 'ICE';
      case '10':
        return 'ELEC';
      case '11':
        return 'ALMIGHTY';
      case '12':
        return 'FORCE';
      case '13':
        return 'EXPEL';
      case '14':
        return 'CURSE';
      case '15':
        return 'CURATIVE';
      case '16':
        return 'SUPPORT';
      case '17':
        return 'MYSTIC';
      case '18':
        return 'NERVE';
      case '19':
        return 'MIND';
      case '20':
        return 'KOTODAMA';
      case '21':
        return 'SPECIAL';
      case '22':
        return 'SUICIDE';
      case '23':
        return 'ALL PHYS';
      case '24':
        return 'ALL MAGIC';
      default:
        return "";
    }
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'id').value === editId) {
        return i;
      }
    }
    return -1;
  }

  changeTablePage(event: number) {
    this.currentPage = event;
    this.cd.detectChanges();
  }


  removeCorrect(i: number) {
    this.editingItem[4].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addCorrect() {
    this.editingItem[4].value.push(['STR', 0, 0]);
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
        xml += '  <object name="MiStatusData">\n';
        xml += `   	<member name="common">\n`;
        xml += `     	<object name="MiSkillItemStatusCommonData">\n`;
        xml += `     		<member name="id">${item[0].value}</member>\n`;
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
            xml += `              <member name="ID">${item[4].value[i][0]}</member>\n`;
            xml += `              <member name="Type">${item[4].value[i][1]}</member>\n`;
            xml += `              <member name="Value">${item[4].value[i][2]}</member>\n`;
            xml += `            </object>\n`;
            xml += `          </element>\n`;
          }
          xml += `        </member>\n`;
        }
        else xml += `        <member name="correctTbl"/>\n`;

        xml += `			</object>\n`;
        xml += '		</member>\n';
        xml += `    <member name="basic">\n`;
        xml += `         <object name="MiStatusBasicData">\n`;
        xml += `         	   <member name="maxStack">${item[5].value}</member>\n`;
        xml += `             <member name="stackType">${item[6].value}</member>\n`;
        xml += `             <member name="applicationLogic">${item[7].value}</member>\n`;
        xml += `             <member name="primaryGroupID">${item[8].value}</member>\n`;
        xml += `             <member name="groupID">${item[9].value}</member>\n`;
        xml += `             <member name="groupRank">${item[10].value}</member>\n`;
        xml += `             <member name="functionID">${item[11].value}</member>\n`;
        xml += `         </object>\n`;
        xml += `    </member>\n`;
        xml += `    <member name="effect">\n`;
        xml += `      	<object name="MiEffectData">\n`;
        xml += `        	<member name="restrictions">${item[12].value}</member>\n`;
        xml += `          <member name="damage">\n`;
        xml += `      			<object name="MiDoTDamageData">\n`;
        xml += `       				    <member name="HPDamage">${item[13].value}</member>\n`;
        xml += `                	<member name="MPDamage">${item[14].value}</member>\n`;
        xml += `            	</object>\n`;
        xml += `        	</member>\n`;
        xml += `		    </object>\n`;
        xml += `	  </member>\n`;
        xml += `    <member name="cancel">\n`;
        xml += `		    <object name="MiCancelData">\n`;
        xml += `            <member name="duration">${item[15].value}</member>\n`;
        xml += `            <member name="durationType">${item[16].value}</member>\n`;
        xml += `            <member name="cancelTypes">${item[17].value}</member>\n`;
        xml += `         </object>\n`;
        xml += `    </member>\n`;
        xml += `  </object>\n`;
      });
      xml += '</objects>';
      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
