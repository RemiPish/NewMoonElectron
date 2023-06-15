import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type npcBarterGroupDataStructure = [
  { name: 'ID', value: number },
  { name: "itemDependency", value: number },
  { name: "groupID", value: number },
  { name: "restrictedID", value: number },
  { name: 'srcItems', value: number[][] },
  { name: 'dstItems', value: number[][] },
  { name: 'probabilities', value: number[] },
  { name: "materialLoss", value: number },
  { name: "expertiseID", value: number },
  { name: "requiredClass", value: number },
  { name: "requiredRank", value: number },
  { name: "failExpertUp", value: number },
  { name: "successExpertUp", value: number },
  { name: "greatSuccessExpertUp", value: number },
  { name: "expertSuccessBoost", value: number },
  { name: "expertGreatSuccessBoost", value: number },
  { name: "questID", value: number },

];

@Component({
  selector: 'app-blend-ext-data',
  templateUrl: './blend-ext-data.component.html',
  styleUrls: ['./blend-ext-data.component.scss']
})
export class BlendExtDataComponent {
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
    console.log('started parsing');
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
    this.filteredContent = this.content.filter((item: any[]) => {
      const idStr = String(item[0].value).toLowerCase();
      const inputList: any[] = [];
      item[4].value.forEach((elt: any[]) => {
        inputList.push(elt[0].value)
      })
      const resultList: any[] = [];
      item[5].value.forEach((elt: any[]) => {
        resultList.push(elt[0].value)
      })
      return idStr.includes(searchStr) || inputList.includes(searchStr) || resultList.includes(searchStr);
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
        let srcList: any[] = [];
        if (item.member[4].element.length) {
          item.member[4].element.forEach((m: any) => {
            srcList.push([
              m.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
              m.object.member.find((n: any) => n["@name"] === "minScale")["#text"],
             
            ])
          });
        }
        else {
          srcList.push([
            item.member[4].element.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
            item.member[4].element.object.member.find((n: any) => n["@name"] === "minScale")["#text"],
           
          ])
        }

        let dstList: any[] = [];
        if (item.member[5].element.length) {
          item.member[5].element.forEach((m: any) => {
            dstList.push([
              m.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
              m.object.member.find((n: any) => n["@name"] === "minScale")["#text"],
              m.object.member.find((n: any) => n["@name"] === "maxScale")["#text"],
            ])
          });
        }
        else {
          dstList.push([
            item.member[5].element.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
            item.member[5].element.object.member.find((n: any) => n["@name"] === "min")["#text"],
            item.member[5].element.object.member.find((n: any) => n["@name"] === "max")["#text"],
          ])
        }

        let probTbl: any[] = [];
        if (item.member[6].element.length) {
          item.member[6].element.forEach((m: any) => {
            probTbl.push(m)
          })
        }
        else {
          probTbl.push(item.member[6].element);

        }
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "itemDependency", value: item.member.find((m: any) => m["@name"] === "itemDependency")["#text"] },
          { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
          { name: "restrictedID", value: item.member.find((m: any) => m["@name"] === "restrictedID")["#text"] },
          { name: "srcItems", value: srcList },
          { name: 'dstItems', value: dstList },
          { name: "probabilities", value: probTbl },
          { name: "materialLoss", value: item.member.find((m: any) => m["@name"] === "materialLoss")["#text"] },
          { name: "expertiseID", value: item.member.find((m: any) => m["@name"] === "expertiseID")["#text"] },
          { name: "requiredClass", value: item.member.find((m: any) => m["@name"] === "requiredClass")["#text"] },
          { name: "requiredRank", value: item.member.find((m: any) => m["@name"] === "requiredRank")["#text"] },
          { name: "failExpertUp", value: item.member.find((m: any) => m["@name"] === "failExpertUp")["#text"] },
          { name: "successExpertUp", value: item.member.find((m: any) => m["@name"] === "successExpertUp")["#text"] },
          { name: "greatSuccessExpertUp", value: item.member.find((m: any) => m["@name"] === "greatSuccessExpertUp")["#text"] },
          { name: "expertSuccessBoost", value: item.member.find((m: any) => m["@name"] === "expertSuccessBoost")["#text"] },
          { name: "expertGreatSuccessBoost", value: item.member.find((m: any) => m["@name"] === "expertGreatSuccessBoost")["#text"] },
          { name: "questID", value: item.member.find((m: any) => m["@name"] === "questID")["#text"] },
         
        ];
      }));
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
      let inputList: any[][] = [];
      let resultList: any[][] = [];
      let prob: any[] = [];
      this.selectedItem[4].value.forEach((elt: any) => {
        inputList.push([elt[0], elt[1], elt[2]]);
      })
      this.selectedItem[5].value.forEach((elt: any) => {
        resultList.push([elt[0], elt[1], elt[2]]);
      })
      this.selectedItem[6].value.forEach((elt: any) => {
        prob.push(elt);
      })

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'itemDependency', value: this.selectedItem[1].value },
        { name: 'groupID', value: this.selectedItem[2].value },
        { name: 'restrictedID', value: this.selectedItem[3].value },
        { name: 'srcItems', value: inputList },
        { name: 'dstItems', value: resultList },
        { name: 'probabilities', value: prob },
        { name: 'materialLoss', value: this.selectedItem[7].value },
        { name: 'expertiseID', value: this.selectedItem[8].value },
        { name: 'requiredClass', value: this.selectedItem[9].value },
        { name: 'requiredRank', value: this.selectedItem[10].value },
        { name: 'failExpertUp', value: this.selectedItem[11].value },
        { name: 'successExpertUp', value: this.selectedItem[12].value },
        { name: 'greatSuccessExpertUp', value: this.selectedItem[13].value },
        { name: 'expertSuccessBoost', value: this.selectedItem[14].value },
        { name: 'expertGreatSuccessBoost', value: this.selectedItem[15].value },
        { name: 'questID', value: this.selectedItem[16].value },
        
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'itemDependency', value: 0 },
        { name: 'groupID', value: 0 },
        { name: 'restrictedID', value: 0 },
        { name: 'srcItems', value: [[0, 0], [0, 0]] },
        { name: 'dstItems', value: [[0, 0, 0], [0, 0, 0]] },
        { name: 'probabilities', value: [0, 0] },
        { name: 'materialLoss', value: 0 },
        { name: 'expertiseID', value: 0 },
        { name: 'requiredClass', value: 0 },
        { name: 'requiredRank', value: 0 },
        { name: 'failExpertUp', value: 0 },
        { name: 'successExpertUp', value: 0 },
        { name: 'greatSuccessExpertUp', value: 0 },
        { name: 'expertSuccessBoost', value: 0 },
        { name: 'expertGreatSuccessBoost', value: 0 },
        { name: 'questID', value: -1 },
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
    if (!event) this.currentPage = 1;
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      let xml = '<objects>\n';

      this.content.forEach((item: npcBarterGroupDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiBlendExtData">\n';
        xml += `    	<member name="ID">${item[0].value}</member>\n`;
        xml += `    	<member name="itemDependency">${item[1].value}</member>\n`;
        xml += `      <member name="groupID">${item[2].value}</member>\n`;
        xml += `      <member name="restrictedID">${item[3].value}</member>\n`;
        xml += `    	<member name="srcItems">\n`;
        for (let i = 0; i < item[4].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiBlendExtData_SrcItemChange">\n`;
          xml += `    	        <member name="itemID">${item[4].value[i][0]}</member>\n`;
          xml += `    	        <member name="minScale">${item[4].value[i][1]}</member>\n`;
          xml += `        	</object>\n`;
          xml += `      </element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="dstItems">\n`;
        for (let i = 0; i < item[5].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiBlendExtData_DstItemChange">\n`;
          xml += `    	        <member name="itemID">${item[5].value[i][0]}</member>\n`;
          xml += `    	        <member name="minScale">${item[5].value[i][1]}</member>\n`;
          xml += `    	        <member name="maxScale">${item[5].value[i][2]}</member>\n`;
          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="probabilities">\n`;
        for (let i = 0; i < item[6].value.length; i++) {
          xml += `    	<element>${item[6].value[i]}</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="materialLoss">${item[7].value}</member>\n`;
        xml += `    	<member name="expertiseID">${item[8].value}</member>\n`;
        xml += `    	<member name="requiredClass">${item[9].value}</member>\n`;
        xml += `    	<member name="requiredRank">${item[10].value}</member>\n`;
        xml += `    	<member name="failExpertUp">${item[11].value}</member>\n`;
        xml += `    	<member name="successExpertUp">${item[12].value}</member>\n`;
        xml += `    	<member name="greatSuccessExpertUp">${item[13].value}</member>\n`;
        xml += `    	<member name="expertSuccessBoost">${item[14].value}</member>\n`;
        xml += `    	<member name="expertGreatSuccessBoost">${item[15].value}</member>\n`;
        xml += `    	<member name="questID">${item[16].value}</member>\n`;
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
