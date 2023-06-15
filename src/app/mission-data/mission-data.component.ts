import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type missionDataStructure = [
  { name: 'ID', value: number },
  { name: 'duration', value: number },
  { name: 'instanceIDs', value: number[] },
  { name: 'exits', value: number[][] },
  { name: 'description', value: string },
  { name: 'timerType', value: number },
];

@Component({
  selector: 'app-mission-data',
  templateUrl: './mission-data.component.html',
  styleUrls: ['./mission-data.component.scss']
})
export class MissionDataComponent {
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
      const descStr = String(item[4].value).toLowerCase();
      return idStr.includes(searchStr) || descStr.includes(searchStr);
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
        let instanceIDs: number[] = [];
        if (item.member.find((m: any) => m["@name"] === "instanceIDs").element.length) {
          item.member.find((m: any) => m["@name"] === "instanceIDs").element.forEach((m: any) => {
            instanceIDs.push(m)
          });
        }
        else instanceIDs.push(item.member.find((m: any) => m["@name"] === "instanceIDs").element);

        let exit: number[][] = [];
        if (item.member[3].element.length) {
          item.member[3].element.forEach((m: any) => {
            exit.push([m.object.member[0]["#text"], m.object.member[1]["#text"], m.object.member[2]["#text"], m.object.member[3]["#text"], m.object.member[4]["#text"], m.object.member[5]["#text"]]);
          });
        }
        else {
          exit.push([item.member[3].element.object.member[0]["#text"], item.member.find((m: any) => m["@name"] === "exits").element.object.member[1]["#text"], item.member.find((m: any) => m["@name"] === "exits").element.object.member[2]["#text"],
          item.member.find((m: any) => m["@name"] === "exits").element.object.member[3]["#text"], item.member.find((m: any) => m["@name"] === "exits").element.object.member[4]["#text"], item.member.find((m: any) => m["@name"] === "exits").element.object.member[5]["#text"]]);
        }
        console.log(exit);
        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "duration", value: item.member.find((m: any) => m["@name"] === "duration")["#text"] },
          {
            name: "instanceIDs", value: instanceIDs
          },
          {
            name: "exits", value: exit
          },
          { name: "description", value: item.member.find((m: any) => m["@name"] === "description")["#text"] },
          { name: "timerType", value: item.member.find((m: any) => m["@name"] === "timerType")["#text"] },
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

      let exits: number[][] = [];
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      let instanceIDs: number[] = [];
      if (this.selectedItem[2].value.length) {
        this.selectedItem[2].value.forEach((m: any) => {
          instanceIDs.push(m)
        });
      }
      if (this.selectedItem[3].value.length) {
        this.selectedItem[3].value.forEach((m: any) => {
          exits.push([m[0], m[1], m[2], m[3], m[4], m[5]])
        });
      }
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'duration', value: this.selectedItem[1].value },
        { name: 'instanceIDs', value: instanceIDs },
        {
          name: "exits", value: exits
        },
        { name: "description", value: this.selectedItem[4].value },
        { name: "timerType", value: this.selectedItem[5].value },

      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'duration', value: 0 },
        { name: 'instanceIDs', value: [0] },
        {
          name: "exits", value: [["", 0, 0, 0, 0, 0]]
        },
        { name: "description", value: this.selectedItem[4].value },
        { name: "timerType", value: this.selectedItem[5].value }
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

  removeInstanceID(i: number) {
    this.editingItem[2].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addInstanceID() {
    this.editingItem[2].value.push(0);
    this.cd.detectChanges();
  }

  removeExit(i: number) {
    this.editingItem[3].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addExit() {
    this.editingItem[3].value.push(["", 0, 0, 0, 0, 0]);
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: missionDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiMissionData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="duration">${item[1].value}</member>\n`;
        xml += `    <member name="instanceIDs">\n`;
        item[2].value.forEach((instanceID: number) => {
          xml += `      <element>${instanceID}</element>\n`;
        });
        xml += `    </member>\n`;
        xml += `    <member name="exits">\n`;
        item[3].value.forEach((exit: any) => {
          xml += `      <element>\n`;
          xml += `        <object name="MiMissionExit">\n`;
          xml += `            <member name="name"><![CDATA[${exit[0] || ""}]]></member>\n`;
          xml += `            <member name="zoneGroup">${exit[1]}</member>\n`;
          xml += `            <member name="zoneID">${exit[2]}</member>\n`;
          xml += `            <member name="x">${exit[3]}</member>\n`;
          xml += `            <member name="y">${exit[4]}</member>\n`;
          xml += `            <member name="rotation">${exit[5]}</member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;

        })
        xml += `    </member>\n`;

        xml += `    <member name="description"><![CDATA[${item[4].value}]]></member>\n`;
        xml += `    <member name="timerType">${item[5].value}</member>\n`;

        xml += `  </object>\n`;
      });
      // Write the closing tag for the root element

      xml += '</objects>';

      if (saveMode === 'xml')
        this.saveXmlFile.emit(xml);
      else this.encryptFile.emit(xml);
    }
  }
}
