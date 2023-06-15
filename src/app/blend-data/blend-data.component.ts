import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type npcBarterGroupDataStructure = [
  { name: 'ID', value: number },
  { name: 'inputItems', value: number[][] },
  { name: 'resultItems', value: number[][] },
  { name: 'probabilities', value: number[] },
  { name: "materialLossRate", value: number },
  { name: "expertiseID", value: number },
  { name: "requiredClass", value: number },
  { name: "requiredRank", value: number },
  { name: "failExpertUp", value: number },
  { name: "successExpertUp", value: number },
  { name: "greatSuccessExpertUp", value: number },
  { name: "expertSuccessBoost", value: number },
  { name: "expertGreatSuccessBoost", value: number },
  { name: "hidden", value: number },
  { name: "questID", value: number },
  { name: "extensionGroupID", value: number },
];

@Component({
  selector: 'app-blend-data',
  templateUrl: './blend-data.component.html',
  styleUrls: ['./blend-data.component.scss']
})
export class BlendDataComponent {
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
    this.filteredContent = this.content.filter((item: any[]) => {
      const idStr = String(item[0].value).toLowerCase();
      const inputList: any[] = [];
      item[1].value.forEach((elt: any[]) => {
        inputList.push(elt[0].value)
      })
      const resultList: any[] = [];
      item[2].value.forEach((elt: any[]) => {
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
        let inputList: any[] = [];
        if (item.member[1].element.length) {
          item.member[1].element.forEach((m: any) => {
            inputList.push([
              m.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
              m.object.member.find((n: any) => n["@name"] === "min")["#text"],
              m.object.member.find((n: any) => n["@name"] === "max")["#text"],
            ])
          });
        }
        else {
          inputList.push([
            item.member[1].element.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
            item.member[1].element.object.member.find((n: any) => n["@name"] === "min")["#text"],
            item.member[1].element.object.member.find((n: any) => n["@name"] === "max")["#text"],
          ])
        }

        let resultList: any[] = [];
        if (item.member[2].element.length) {
          item.member[2].element.forEach((m: any) => {
            resultList.push([
              m.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
              m.object.member.find((n: any) => n["@name"] === "min")["#text"],
              m.object.member.find((n: any) => n["@name"] === "max")["#text"],
            ])
          });
        }
        else {
          resultList.push([
            item.member[2].element.object.member.find((n: any) => n["@name"] === "itemID")["#text"],
            item.member[2].element.object.member.find((n: any) => n["@name"] === "min")["#text"],
            item.member[2].element.object.member.find((n: any) => n["@name"] === "max")["#text"],
          ])
        }

        let probTbl: any[] = [];
        if (item.member[3].element.length) {
          item.member[3].element.forEach((m: any) => {
            probTbl.push(m)
          })
        }
        else {
          probTbl.push(item.member[3].element);

        }
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "inputItems", value: inputList },
          { name: 'resultItems', value: resultList },
          { name: "probabilities", value: probTbl },
          { name: "materialLossRate", value: item.member.find((m: any) => m["@name"] === "materialLossRate")["#text"] },
          { name: "expertiseID", value: item.member.find((m: any) => m["@name"] === "expertiseID")["#text"] },
          { name: "requiredClass", value: item.member.find((m: any) => m["@name"] === "requiredClass")["#text"] },
          { name: "requiredRank", value: item.member.find((m: any) => m["@name"] === "requiredRank")["#text"] },
          { name: "failExpertUp", value: item.member.find((m: any) => m["@name"] === "failExpertUp")["#text"] },
          { name: "successExpertUp", value: item.member.find((m: any) => m["@name"] === "successExpertUp")["#text"] },
          { name: "greatSuccessExpertUp", value: item.member.find((m: any) => m["@name"] === "greatSuccessExpertUp")["#text"] },
          { name: "expertSuccessBoost", value: item.member.find((m: any) => m["@name"] === "expertSuccessBoost")["#text"] },
          { name: "expertGreatSuccessBoost", value: item.member.find((m: any) => m["@name"] === "expertGreatSuccessBoost")["#text"] },
          { name: "hidden", value: item.member.find((m: any) => m["@name"] === "hidden")["#text"] },
          { name: "questID", value: item.member.find((m: any) => m["@name"] === "questID")["#text"] },
          { name: "extensionGroupID", value: item.member.find((m: any) => m["@name"] === "extensionGroupID")["#text"] },
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
      this.selectedItem[1].value.forEach((elt: any) => {
        inputList.push([elt[0], elt[1], elt[2]]);
      })
      this.selectedItem[2].value.forEach((elt: any) => {
        resultList.push([elt[0], elt[1], elt[2]]);
      })
      this.selectedItem[3].value.forEach((elt: any) => {
        prob.push(elt);
      })

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'inputItems', value: inputList },
        { name: 'resultItems', value: resultList },
        { name: 'probabilities', value: prob },
        { name: 'materialLossRate', value: this.selectedItem[4].value },
        { name: 'expertiseID', value: this.selectedItem[5].value },
        { name: 'requiredClass', value: this.selectedItem[6].value },
        { name: 'requiredRank', value: this.selectedItem[7].value },
        { name: 'failExpertUp', value: this.selectedItem[8].value },
        { name: 'successExpertUp', value: this.selectedItem[9].value },
        { name: 'greatSuccessExpertUp', value: this.selectedItem[10].value },
        { name: 'expertSuccessBoost', value: this.selectedItem[11].value },
        { name: 'expertGreatSuccessBoost', value: this.selectedItem[12].value },
        { name: 'hidden', value: this.selectedItem[13].value },
        { name: 'questID', value: this.selectedItem[14].value },
        { name: 'extensionGroupID', value: this.selectedItem[15].value },
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'inputItems', value: [[0, 0, 0], [0, 0, 0]] },
        { name: 'resultItems', value: [[0, 0, 0], [0, 0, 0]] },
        { name: 'probabilities', value: [0, 0] },
        { name: 'materialLossRate', value: 0 },
        { name: 'expertiseID', value: 0 },
        { name: 'requiredClass', value: 0 },
        { name: 'requiredRank', value: 0 },
        { name: 'failExpertUp', value: 0 },
        { name: 'successExpertUp', value: 0 },
        { name: 'greatSuccessExpertUp', value: 0 },
        { name: 'expertSuccessBoost', value: 0 },
        { name: 'expertGreatSuccessBoost', value: 0 },
        { name: 'hidden', value: 0 },
        { name: 'questID', value: -1 },
        { name: 'extensionGroupID', value: 0 },
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
        xml += '	<object name="MiBlendData">\n';
        xml += `    	<member name="ID">${item[0].value}</member>\n`;
        xml += `    	<member name="inputItems">\n`;
        for (let i = 0; i < item[1].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiBlendData_Item">\n`;
          xml += `    	        <member name="itemID">${item[1].value[i][0]}</member>\n`;
          xml += `    	        <member name="min">${item[1].value[i][1]}</member>\n`;
          xml += `    	        <member name="max">${item[1].value[i][2]}</member>\n`;
          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="resultItems">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `    	<element>\n`;
          xml += `        	<object name="MiBlendData_Item">\n`;
          xml += `    	        <member name="itemID">${item[2].value[i][0]}</member>\n`;
          xml += `    	        <member name="min">${item[2].value[i][1]}</member>\n`;
          xml += `    	        <member name="max">${item[2].value[i][2]}</member>\n`;
          xml += `        	</object>\n`;
          xml += `       	</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="probabilities">\n`;
        for (let i = 0; i < item[3].value.length; i++) {
          xml += `    	<element>${item[3].value[i]}</element>\n`;
        }
        xml += `    	</member>\n`;
        xml += `    	<member name="materialLossRate">${item[4].value}</member>\n`;
        xml += `    	<member name="expertiseID">${item[5].value}</member>\n`;
        xml += `    	<member name="requiredClass">${item[6].value}</member>\n`;
        xml += `    	<member name="requiredRank">${item[7].value}</member>\n`;
        xml += `    	<member name="failExpertUp">${item[8].value}</member>\n`;
        xml += `    	<member name="successExpertUp">${item[9].value}</member>\n`;
        xml += `    	<member name="greatSuccessExpertUp">${item[10].value}</member>\n`;
        xml += `    	<member name="expertSuccessBoost">${item[11].value}</member>\n`;
        xml += `    	<member name="expertGreatSuccessBoost">${item[12].value}</member>\n`;
        xml += `    	<member name="hidden">${item[13].value}</member>\n`;
        xml += `    	<member name="questID">${item[14].value}</member>\n`;
        xml += `    	<member name="extensionGroupID">${item[15].value}</member>\n`;
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
