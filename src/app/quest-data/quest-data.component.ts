import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type questDataStructure = [
  { name: 'ID', value: number },
  { name: 'type', value: string },
  { name: 'groupID', value: number },
  { name: 'episodeType', value: string },
  { name: 'bonusEnabled', value: boolean },
  { name: 'conditionsExists', value: number },
  { name: 'conditions', value: any[][][] },
  { name: 'restrictionText', value: string },
  { name: 'phaseCount', value: number },
  { name: 'phases', value: any[][][] },

];


@Component({
  selector: 'app-quest-data',
  templateUrl: './quest-data.component.html',
  styleUrls: ['./quest-data.component.scss']
})
export class QuestDataComponent {
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
      console.log(parsed);
      const items = await Promise.all(parsed.map(async (item: any) => {

        let condition: any[] = [];
        item.member.find((m: any) => m["@name"] === "conditions").element.forEach((e: any) => {
          let clauses: any[] = [];
          e.object.member[1].element.forEach((ec: any) => {
            clauses.push([ec.object.member[0]["#text"], ec.object.member[1]["#text"], ec.object.member[2]["#text"]]);
          })
          condition.push([e.object.member[0]["#text"], clauses])
        });

        let phases: any[] = [];
        item.member.find((m: any) => m["@name"] === "phases").element.forEach((p: any) => {
          let requirements: any[] = [];
          p.object.member[2].element.forEach((r: any) => {
            requirements.push([r.object.member[0]["#text"], r.object.member[1]["#text"], r.object.member[2]["#text"]]);
          })
          phases.push([p.object.member[0]["#text"], p.object.member[1]["#text"], requirements]);
        })

        return [
          { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: "type", value: item.member.find((m: any) => m["@name"] === "type")["#text"] },
          { name: "groupID", value: item.member.find((m: any) => m["@name"] === "groupID")["#text"] },
          { name: "episodeType", value: item.member.find((m: any) => m["@name"] === "episodeType")["#text"] },
          { name: "bonusEnabled", value: item.member.find((m: any) => m["@name"] === "bonusEnabled")["#text"] },
          { name: "conditionsExist", value: item.member.find((m: any) => m["@name"] === "conditionsExist")["#text"] },
          { name: "conditions", value: condition },
          { name: "restrictionText", value: item.member.find((m: any) => m["@name"] === "restrictionText")["#text"] },
          { name: "phaseCount", value: item.member.find((m: any) => m["@name"] === "phaseCount")["#text"] },
          { name: "phases", value: phases },
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
      let condition: any[] = [];
      this.selectedItem[6].value.forEach((e: any) => {
        let clauses: any[] = [];
        e[1].forEach((ec: any) => {
          clauses.push([ec[0], ec[1], ec[2]]);
        })
        condition.push([e[0], clauses])
      });

      let phases: any[] = [];
      this.selectedItem[9].value.forEach((p: any) => {
        let requirements: any[] = [];
        p[2].forEach((r: any) => {
          requirements.push([r[0], r[1], r[2]]);
        })
        phases.push([p[0], p[1], requirements]);
      })

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: 'type', value: this.selectedItem[1].value },
        { name: 'groupID', value: this.selectedItem[2].value },
        { name: 'episodeType', value: this.selectedItem[3].value },
        { name: 'bonusEnabled', value: this.selectedItem[4].value },
        { name: 'conditionsExist', value: this.selectedItem[5].value },
        { name: 'conditions', value: condition },
        { name: 'restrictionText', value: this.selectedItem[7].value },
        { name: 'phaseCount', value: this.selectedItem[8].value },
        { name: 'phases', value: phases },
      ];
    }
    else {
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'type', value: 'NORMAL' },
        { name: 'groupID', value: 0 },
        { name: 'episodeType', value: 'NONE' },
        { name: 'bonusEnabled', value: true },
        { name: 'conditionsExist', value: 0 },
        { name: 'conditions', value: [] },
        { name: 'restrictionText', value: '' },
        { name: 'phaseCount', value: 0 },
        { name: 'phases', value: [] },
      ];
      for (let i = 0; i < 4; i++) {
        let clauses: any[] = [];
        for (let j = 0; j < 10; j++) {
          clauses.push(['NONE', 0, 0]);
        }
        this.editingItem[6].value.push([0, clauses])
      };


      for (let i = 0; i < 8; i++) {
        let requirements: any[] = [];
        for (let j = 0; j < 8; j++) {
          requirements.push(['NONE', 0, 0]);
        }
        this.editingItem[9].value.push([0, 0, requirements]);
      }

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
    this.currentPage = event;
    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      this.content.forEach((item: questDataStructure) => {
        // Write the opening tag for the item
        xml += '  <object name="MiQuestData">\n';
        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="type">${item[1].value}</member>\n`;
        xml += `    <member name="groupID">${item[2].value}</member>\n`;
        xml += `    <member name="episodeType">${item[3].value}</member>\n`;
        xml += `    <member name="bonusEnabled">${item[4].value}</member>\n`;
        xml += `    <member name="conditionsExist">${item[5].value}</member>\n`;
        xml += `    <member name="conditions">\n`;
        item[6].value.forEach((e: any) => {
          xml += `        <element>\n`;
          xml += `            <object name="MiQuestUpperCondition">\n`;
          xml += `                <member name="clauseCount">${e[0]}</member>\n`;
          xml += `                <member name="clauses">\n`;
          e[1].forEach((ec: any) => {
            xml += `                    <element>\n`;
            xml += `                        <object name="EventConditionData">\n`;
            xml += `                            <member name="type">${ec[0]}</member>\n`;
            xml += `                            <member name="value1">${ec[1]}</member>\n`;
            xml += `                            <member name="value2">${ec[2]}</member>\n`;
            xml += `                        </object>\n`;
            xml += `                    </element>\n`;
          });
          xml += `                </member>\n`;
          xml += `            </object>\n`;
          xml += `        </element>\n`;
        });
        xml += `    </member>\n`;
        xml += `    <member name="restrictionText"><![CDATA[${item[7].value}]]></member>\n`;
        xml += `    <member name="phaseCount">${item[8].value}</member>\n`;
        xml += `    <member name="phases">\n`;
        item[9].value.forEach((p: any) => {
          xml += `        <element>\n`;
          xml += `            <object name="MiQuestPhaseData">\n`;
          xml += `                <member name="phaseNumber">${p[0]}</member>\n`;
          xml += `                <member name="requirementCount">${p[1]}</member>\n`;
          xml += `                <member name="requirements">\n`;
          p[2].forEach((r: any) => {
            xml += `                    <element>\n`;
            xml += `                        <object name="QuestPhaseRequirement">\n`;
            xml += `                            <member name="type">${r[0]}</member>\n`;
            xml += `                            <member name="objectID">${r[1]}</member>\n`;
            xml += `                            <member name="objectCount">${r[2]}</member>\n`;
            xml += `                        </object>\n`;
            xml += `                    </element>\n`;
          });
          xml += `                </member>\n`;
          xml += `            </object>\n`;
          xml += `        </element>\n`;
        })
        xml += `    </member>\n`;
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
