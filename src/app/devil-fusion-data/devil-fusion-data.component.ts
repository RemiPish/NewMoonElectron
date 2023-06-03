import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
export type devilFusionDataStructure = [
  { name: 'skillID', value: number },
  { name: 'type', value: number },
  { name: 'requiredDemons', value: number[] },
  { name: 'type', value: number },
  { name: 'stockCost', value: number },
  { name: 'magCost', value: number },
  { name: 'secondarySkillID', value: number },
  { name: 'fusionDemonID', value: number }
];

@Component({
  selector: 'app-devil-fusion-data',
  templateUrl: './devil-fusion-data.component.html',
  styleUrls: ['./devil-fusion-data.component.scss']
})
export class DevilFusionDataComponent {
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

      const items = await Promise.all(parsed.map(async (item: any) => {
        return [
          { name: "skillID", value: item.member.find((m: any) => m["@name"] === "skillID")["#text"] },
          { name: "type", value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
          {
            name: "requiredDemons", value: [item.member.find((m: any) => m["@name"] === "requiredDemons").element[0],
            item.member.find((m: any) => m["@name"] === "requiredDemons").element[1],
            item.member.find((m: any) => m["@name"] === "requiredDemons").element[2],
            item.member.find((m: any) => m["@name"] === "requiredDemons").element[3],
            item.member.find((m: any) => m["@name"] === "requiredDemons").element[4],
            item.member.find((m: any) => m["@name"] === "requiredDemons").element[5],
            ]
          },
          { name: "stockCost", value: item.member.find((m: any) => m["@name"] === "stockCost")["#text"] },
          { name: "magCost", value: item.member.find((m: any) => m["@name"] === "magCost")["#text"] },
          { name: "secondarySkillID", value: item.member.find((m: any) => m["@name"] === "secondarySkillID")["#text"] },
          { name: "fusionDemonID", value: item.member.find((m: any) => m["@name"] === "fusionDemonID")["#text"] }
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

      this.editingItem = [
        { name: 'skillID', value: this.selectedItem[0].value },
        { name: 'type', value: this.selectedItem[1].value },
        {
          name: "requiredDemons", value: [this.selectedItem[2].value[0],
          this.selectedItem[2].value[1],
          this.selectedItem[2].value[2],
          this.selectedItem[2].value[3],
          this.selectedItem[2].value[4],
          this.selectedItem[2].value[5],
          ]
        },
        { name: "stockCost", value: this.selectedItem[3].value },
        { name: "magCost", value: this.selectedItem[4].value },
        { name: "secondarySkillID", value: this.selectedItem[5].value },
        { name: "fusionDemonID", value: this.selectedItem[6].value }
      ];
    }
    else {
      this.editingItem = [
        { name: 'skillID', value: null },
        { name: 'type', value: 0 },
        { name: "requiredDemons", value: [0, 0, 0, 0, 0, 0] },
        { name: "stockCost", value: 0 },
        { name: "magCost", value: 0 },
        { name: "secondarySkillID", value: 0 },
        { name: "fusionDemonID", value: 0 }
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
      if (this.content[i].find((item: { name: string; }) => item.name === 'skillID').value === editId) {
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
      this.content.forEach((item: devilFusionDataStructure) => {
        // Write the opening tag for the item

        xml += '  <object name="MiDevilFusionData">\n';

        xml += `    <member name="skillID">${item[0].value}</member>\n`;
        xml += `    <member name="type">${item[1].value}</member>\n`;
        xml += `    <member name="requiredDemons">\n`;
        for (let i = 0; i < item[2].value.length; i++) {
          xml += `      <element>${item[2].value[i]}</element>\n`;
        }
        xml += `    </member>\n`;
        xml += `    <member name="stockCost">${item[3].value}</member>\n`;
        xml += `    <member name="magCost">${item[4].value}</member>\n`;
        xml += `    <member name="secondarySkillID">${item[5].value}</member>\n`;
        xml += `    <member name="fusionDemonID">${item[6].value}</member>\n`;
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
