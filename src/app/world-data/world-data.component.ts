import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type channelTable = [{ name: 'channelUnknown1', value: number },
  { name: 'channelUnknown2', value: number },
  { name: 'name', value: string }];

export type worldDataStructure = [
  { name: 'ID', value: number },
  { name: 'unknown1', value: number },
  { name: 'createAreaID', value: number[] },
  { name: 'channelTbl', value: channelTable[] }


];

@Component({
  selector: 'app-world-data',
  templateUrl: './world-data.component.html',
  styleUrls: ['./world-data.component.scss']
})
export class WorldDataComponent {
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
      let items: any[] = [];

      if (parsed.length) {

        items = await Promise.all(parsed.map(async (item: any) => {
          let areaID: any[] = [];
          let channelTbl: any[] = [];
          if (item.member[2].element.length) {
            item.member[2].element.forEach((m: any) => {
              areaID.push(m.object.member["#text"])
            })
          }
          else {
            areaID.push(item.member[2].element.object.member["#text"]);

          }
          if (item.member[3].element.length) {
            item.member[3].element.forEach((m: any) => {
              channelTbl.push([m.object.member[0]["#text"], m.object.member[1]["#text"], m.object.member[2]["#text"]])
            })
          }
          else {

            channelTbl.push([item.member[3].element.object.member[0]["#text"], item.member[3].element.object.member[1]["#text"], item.member[3].element.object.member[2]["#text"]]);
          }

          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "unknown1", value: item.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
            { name: "createAreaID", value: areaID },
            { name: "channelTable", value: channelTbl },
          ];
        }));
      }
      else {
        let areaID: any[] = [];
        let channelTbl: any[] = [];
        if (parsed.member[2].element.length) {
          parsed.member[2].element.forEach((m: any) => {
            areaID.push(m.object.member["#text"])
          })
        }
        else {
          areaID.push(parsed.member[2].object.member["#text"]);
        }
        if (parsed.member[3].element.length) {
          parsed.member[3].element.element.forEach((m: any) => {
            channelTbl.push([m.object.member[0]["#text"], m.object.member[1]["#text"], m.object.member[2]["#text"]])
          })
        }
        else channelTbl.push([parsed.member[3].element.object.member[0]["#text"], parsed.member[3].element.object.member[1]["#text"], parsed.member[3].element.object.member[2]["#text"]]);
        items = [[{ name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "unknown1", value: parsed.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
        { name: "createAreaID", value: areaID },
        { name: "channelTable", value: channelTbl },
        ]];
      }
      //console.log(items);
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
    let areaID: any[] = [];
    let channelTbl: any[] = [];
    if (id) {
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
      this.selectedItem[2].value.forEach((m: any) => {
        areaID.push(m)
      })
      this.selectedItem[3].value.forEach((m: any) => {
        channelTbl.push([m[0], m[1], m[2]])
      })
      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'unknown1', value: this.selectedItem[1].value },
        { name: 'createAreaID', value: areaID },
        { name: 'channelTable', value: channelTbl },
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'unknown1', value: 0 },
        { name: 'createAreaID', value: [0] },
        { name: 'channelTable', value: [[0, 0, ""]] },
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
          console.log(this.editingItem);
          this.content.push(this.editingItem);
          console.log(this.content)
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

  removeCreateAreaID(i: number) {
    this.editingItem[2].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addCreateAreaID() {
    this.editingItem[2].value.push(0);
    this.cd.detectChanges();
  }

  removeChannel(i: number) {
    this.editingItem[3].value.splice(i, 1);
    this.cd.detectChanges();

  }

  addChannel() {
    this.editingItem[3].value.push([0, 0, ""]);
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: worldDataStructure) => {
        // Write the opening tag for the item

        xml += '	<object name="MiWorldData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="unknown1">${item[1].value}</member>\n`;
        xml += `    <member name="createAreaIdTbl">\n`;
        item[2].value.forEach((m: any) => {
          xml += `      <element>\n`;
          xml += `        <object name="MiCreateAreaIdTbl">\n`;
          xml += `          <member name="ID">${m}</member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
        });
        xml += `    </member>\n`;
        xml += `    <member name="channelTbl">\n`;
        item[3].value.forEach((m: any) => {
          xml += `      <element>\n`;
          xml += `        <object name="MiChannelTbl">\n`;
          xml += `          <member name="unknown1">${m[0]}</member>\n`;
          xml += `          <member name="unknown2">${m[1]}</member>\n`;
          xml += `          <member name="name"><![CDATA[${m[2] || ""}]]></member>\n`;
          xml += `        </object>\n`;
          xml += `      </element>\n`;
        });
        xml += `    </member>\n`;
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
