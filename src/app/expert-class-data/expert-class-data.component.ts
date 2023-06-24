import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type classData = [
  { name: 'ID', value: number },
  { name: 'rankData', value: any[][] }
];

export type expertClassDataStructure = [
  { name: 'ID', value: number },
  { name: 'maxClass', value: number },
  { name: 'maxRank', value: number },
  { name: 'classData', value: classData[] },
  { name: 'isChain', value: boolean },
  { name: 'chainCount', value: number },
  { name: 'chainData', value: any[] }
];

@Component({
  selector: 'app-expert-class-data',
  templateUrl: './expert-class-data.component.html',
  styleUrls: ['./expert-class-data.component.scss']
})
export class ExpertClassDataComponent {
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
      const items = await Promise.all(parsed.map(async (item: any) => {
        let classList: any[] = [];
        item.member[3].element.forEach((m: any) => {
          let rankData: any[] = [];
          m.object.member[1].element.forEach((o: any) => {
            rankData.push([o.object.member[0]["#text"], [o.object.member[1].element[0], o.object.member[1].element[1], o.object.member[1].element[2], o.object.member[1].element[3]]]);
          });
          classList.push([
            { name: "ID", value: m.object.member.find((n: any) => n["@name"] === "ID")["#text"] },
            { name: "rankData", value: rankData }
          ])
        });
        let chainData: any[] = [];
        item.member.find((m: any) => m["@name"] === "chainData").element.forEach((m: any) => {
          chainData.push([m.object.member[0]["#text"], m.object.member[1]["#text"], m.object.member[2]["#text"]]);
        });

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "maxClass", value: item.member.find((m: any) => m["@name"] === "maxClass")["#text"] },
          { name: "maxRank", value: item.member.find((m: any) => m["@name"] === "maxRank")["#text"] },
          { name: 'classData', value: classList },
          { name: 'isChain', value: item.member.find((m: any) => m["@name"] === "isChain")["#text"] },
          { name: 'chainCount', value: item.member.find((m: any) => m["@name"] === "chainCount")["#text"] }
          ,
          { name: 'chainData', value: chainData }
        ];
      }));
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
      if (id === 'zero') {
        this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === 0);
      }
      else this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let classList: any[][] = [];

      this.selectedItem[3].value.forEach((elt: any) => {

        let rankData: any[] = [];
        elt[1].value.forEach((o: any) => {
          rankData.push([o[0], [o[1][0], o[1][1], o[1][2], o[1][3]]]);
        });

        classList.push([{ name: 'ID', value: elt[0].value },
        { name: 'rankData', value: rankData },
        ])
      })

      let chainData: any[] = [];
      this.selectedItem[6].value.forEach((elt: any) => {
        chainData.push([elt[0], elt[1], elt[2]]);
      });


      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: "maxClass", value: this.selectedItem[1].value },
        { name: "maxRank", value: this.selectedItem[2].value },
        { name: 'classData', value: classList },
        { name: 'isChain', value: this.selectedItem[4].value },
        { name: 'chainCount', value: this.selectedItem[5].value },
        { name: 'chainData', value: chainData }
      ];
    }
    else {
      let classList: any[][] = [];

      for (let i = 0; i < 11; i++) {

        let rankData: any[] = [];
        for (let j = 0; j < 10; j++) {
          rankData.push([0, [0, 0, 0, 0]]);
        };

        classList.push([{ name: 'ID', value: i },
        { name: 'rankData', value: rankData },
        ])
      }

      let chainData: any[] = [];
      for (let k = 0; k < 4; k++) {
        chainData.push([0, 0, 0]);
      };


      this.editingItem = [
        { name: 'ID', value: null },
        { name: "maxClass", value: 0 },
        { name: "maxRank", value: 0 },
        { name: 'classData', value: classList },
        { name: 'isChain', value: false },
        { name: 'chainCount', value: 0 },
        { name: 'chainData', value: chainData }
      ];
    }
    console.log(this.editingItem)
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
    if (!event) this.currentPage = 1;
    this.currentPage = event;
    this.cd.detectChanges();
  }


  findExpertiseName(n: number) {
    let list = ['Attack',
      'Spin',
      'Rush',
      'Shot',
      'Rapid',
      'Guard',
      'Counter',
      'Dodge',
      'Curative Magic',
      'Destruction Magic',
      'Support Magic',
      'Curse Magic',
      'Talk',
      'Threaten',
      'Taunt',
      'Summon',
      'Occultism',
      'Fusion',
      'Demonology',
      'Weapon Knowledge',
      'Survival Techniques',
      'Psychology',
      'Medical Sciences',
      'Crushing Technique',
      'Mineralogy',
      'Biology',
      'Botany',
      'Mechanical Engineering',
      'Information Engineering',
      'Blades',
      'Sketching',
      'Creation',
      'Crafts',
      'Firearms Knowledge',
      'Gun Knowledge',
      'Pursuit',
      'Magic Control',
      'Bless']

    return list[n] || '';
  }

  writeXmlFile(saveMode: string, content: any) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      let xml = '<objects>\n';

      content.forEach((item: expertClassDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiExpertData">\n';
        xml += `    	<member name="ID">${item[0].value}</member>\n`;
        xml += `    	<member name="maxClass">${item[1].value}</member>\n`;
        xml += `      <member name="maxRank">${item[2].value}</member>\n`;
        xml += `    	<member name="classData">\n`;
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiExpertClassData">\n`;
          xml += `          		<member name="ID">${item[3].value[i][0].value}</member>\n`;
          xml += `          		<member name="rankData">\n`;
          for (let j = 0; j < item[3].value[i][1].value.length; j++) {
            xml += `    	           <element>\n`;
            xml += `    	                <object name="MiExpertRankData">\n`;
            xml += `                         <member name="skillCount">${item[3].value[i][1].value[j][0]}</member>\n`;
            xml += `                         <member name="skill">\n`;
            xml += `    	                        <element>${item[3].value[i][1].value[j][1][0]}</element>\n`;
            xml += `                              <element>${item[3].value[i][1].value[j][1][1]}</element>\n`;
            xml += `                              <element>${item[3].value[i][1].value[j][1][2]}</element>\n`;
            xml += `                              <element>${item[3].value[i][1].value[j][1][3]}</element>\n`;
            xml += `                         </member>\n`;
            xml += `                      </object>\n`;
            xml += `                </element>\n`;
          }
          xml += `              </member>\n`;

          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `      <member name="isChain">${item[4].value}</member>\n`;
        xml += `      <member name="chainCount">${item[5].value}</member>\n`;
        xml += `      <member name="chainData">\n`;
        for (let k = 0; k < item[6].value.length; k++) {
          xml += `        <element>\n`;
          xml += `          <object name="MiExpertChainData">\n`;
          xml += `            <member name="ID">${item[6].value[k][0]}</member>\n`;
          xml += `            <member name="rankRequired">${item[6].value[k][1]}</member>\n`;
          xml += `            <member name="chainPercent">${item[6].value[k][2]}</member>\n`;
          xml += `          </object>\n`;
          xml += `        </element>\n`;
        }
        xml += `     </member>\n`;
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
