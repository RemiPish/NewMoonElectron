import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';


export type cItemDataStructure = [
  { name: 'ID', value: number },
  { name: 'name', value: string },
  { name: 'name2', value: string },
  { name: 'desc', value: string },
  { name: 'icon', value: number },
  { name: 'category', value: number },
  { name: 'tradeList', value: boolean },
  { name: 'modelID', value: number },

  { name: 'idle', value: number },
  { name: 'combatIdle', value: number },
  { name: 'walk', value: number },
  { name: 'run', value: number },

  { name: 'shotEffectFile', value: string },
  { name: 'swingEffectFile', value: string },
  { name: 'element1', value: number },
  { name: 'element2', value: number },
  { name: 'element3', value: number }
];

@Component({
  selector: 'app-c-item-data',
  templateUrl: './c-item-data.component.html',
  styleUrls: ['./c-item-data.component.scss']
})
export class CItemDataComponent {

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
    this.content = await this.parseCItemData(this.contentJson);
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
      const nameStr = item[1].value ? item[1].value.toLowerCase() : '';
      const descStr = item[3].value ? item[1].value.toLowerCase() : '';
      return idStr.includes(searchStr) || nameStr.includes(searchStr) || descStr.includes(searchStr);
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

  async parseCItemData(json: string) {
    try {
      const parsed = JSON.parse(json);
      const items = await Promise.all(parsed.map(async (item: any) => {
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "name", value: item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "name")["#text"] },
          { name: "name2", value: item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "name2")["#text"] },
          { name: "desc", value: item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "desc")["#text"] },
          { name: "icon", value: Number(item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "icon")["#text"]) },
          { name: "category", value: Number(item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "category")["#text"]) },
          { name: "tradeList", value: Boolean(Number(item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "tradeList")["#text"])) },
          { name: "modelID", value: Number(item.member.find((m: any) => m["@name"] === "baseData").object.member.find((m: any) => m["@name"] === "modelID")["#text"]) },

          { name: "idle", value: Number(item.member.find((m: any) => m["@name"] === "motionData").object.member.find((m: any) => m["@name"] === "idle")["#text"]) },
          { name: "combatIdle", value: Number(item.member.find((m: any) => m["@name"] === "motionData").object.member.find((m: any) => m["@name"] === "combatIdle")["#text"]) },
          { name: "walk", value: Number(item.member.find((m: any) => m["@name"] === "motionData").object.member.find((m: any) => m["@name"] === "walk")["#text"]) },
          { name: "run", value: Number(item.member.find((m: any) => m["@name"] === "motionData").object.member.find((m: any) => m["@name"] === "run")["#text"]) },
          { name: "shotEffectFile", value: item.member.find((m: any) => m["@name"] === "specialEffectData").object.member.find((m: any) => m["@name"] === "shotEffectFile")["#text"] ?? "" },
          { name: "swingEffectFile", value: item.member.find((m: any) => m["@name"] === "specialEffectData").object.member.find((m: any) => m["@name"] === "swingEffectFile")["#text"] ?? "" },
          { name: "element1", value: Number(item.member.find((m: any) => m["@name"] === "specialEffectData").object.member.find((m: any) => m["@name"] === "effectColor").element[0]) || 0 },
          { name: "element2", value: Number(item.member.find((m: any) => m["@name"] === "specialEffectData").object.member.find((m: any) => m["@name"] === "effectColor").element[1]) || 0 },
          { name: "element3", value: Number(item.member.find((m: any) => m["@name"] === "specialEffectData").object.member.find((m: any) => m["@name"] === "effectColor").element[2]) || 0 }
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

  openEdition(id?: any) {
    this.inEdition = true;
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'name', value: this.selectedItem[1].value },
        { name: 'name2', value: this.selectedItem[2].value },
        { name: 'desc', value: this.selectedItem[3].value },
        { name: 'icon', value: this.selectedItem[4].value },
        { name: 'category', value: this.selectedItem[5].value },
        { name: 'tradeList', value: this.selectedItem[6].value },
        { name: 'modelID', value: this.selectedItem[7].value },

        { name: 'idle', value: this.selectedItem[8].value },
        { name: 'combatIdle', value: this.selectedItem[9].value },
        { name: 'walk', value: this.selectedItem[10].value },
        { name: 'run', value: this.selectedItem[11].value },

        { name: 'shotEffectFile', value: this.selectedItem[12].value },
        { name: 'swingEffectFile', value: this.selectedItem[13].value },
        { name: 'element1', value: this.selectedItem[14].value },
        { name: 'element2', value: this.selectedItem[15].value },
        { name: 'element3', value: this.selectedItem[16].value }
      ];
      console.log(this.editingItem)
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'name', value: '' },
        { name: 'name2', value: '' },
        { name: 'desc', value: '' },
        { name: 'icon', value: 0 },
        { name: 'category', value: 0 },
        { name: 'tradeList', value: true },
        { name: 'modelID', value: 0 },

        { name: 'idle', value: 0 },
        { name: 'combatIdle', value: 0 },
        { name: 'walk', value: 0 },
        { name: 'run', value: 0 },

        { name: 'shotEffectFile', value: "" },
        { name: 'swingEffectFile', value: "" },
        { name: 'element1', value: 0 },
        { name: 'element2', value: 0 },
        { name: 'element3', value: 0 }
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
      this.content.forEach((item: cItemDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiCItemData">\n';

        // Write the baseData element
        xml += '		<member name="baseData">\n';
        xml += `			<object name="MiCItemBaseData">\n`;
        xml += `				<member name="ID">${item[0].value || ''}</member>\n`;
        xml += `        		<member name="name"><![CDATA[${item[1].value || ''}]]></member>\n`;
        xml += `        		<member name="name2"><![CDATA[${item[2].value || ''}]]></member>\n`;
        xml += `       			<member name="desc"><![CDATA[${item[3].value || ''}]]></member>\n`;
        xml += `        		<member name="icon">${item[4].value || '0'}</member>\n`;
        xml += `        		<member name="category">${item[5].value || '0'}</member>\n`;
        xml += `        		<member name="tradeList">${item[6].value || 'false'}</member>\n`;
        xml += `        		<member name="modelID">${item[7].value || '0'}</member>\n`;
        xml += `      		</object>\n`;
        xml += '    	</member>\n';

        // Write the motionData element
        xml += '		<member name="motionData">\n';
        xml += `      		<object name="MiCItemMotionData">\n`;
        xml += `        		<member name="idle">${item[8].value || '0'}</member>\n`;
        xml += `        		<member name="combatIdle">${item[9].value || '0'}</member>\n`;
        xml += `        		<member name="walk">${item[10].value || '0'}</member>\n`;
        xml += `        		<member name="run">${item[11].value || '0'}</member>\n`;
        xml += `      		</object>\n`;
        xml += '    	</member>\n';

        // Write the specialEffectData element
        xml += '    	<member name="specialEffectData">\n';
        xml += `      		<object name="MiCItemSPEffectData">\n`;
        xml += `        		<member name="shotEffectFile"><![CDATA[${item[12].value || ''}]]></member>\n`;
        xml += `        		<member name="swingEffectFile"><![CDATA[${item[13].value || ''}]]></member>\n`;
        xml += `        		<member name="effectColor">\n`;
        xml += `          			<element>${item[14].value || '0'}</element>\n`;
        xml += `          			<element>${item[16].value || '0'}</element>\n`;
        xml += `          			<element>${item[16].value || '0'}</element>\n`;
        xml += `        		</member>\n`;
        xml += `     		</object>\n`;
        xml += '   		</member>\n';

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
