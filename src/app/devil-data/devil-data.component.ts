import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type devilDataStructure = [
  { name: 'ID', value: number },
  { name: 'name', value: string },
  { name: 'title', value: number },
  { name: 'gender', value: string },
  { name: 'fusionModifier', value: number },
  { name: 'LNC', value: number },
  { name: 'unused', value: number },
  { name: 'modelID', value: number },
  { name: 'family', value: string },
  { name: 'race', value: string },
  { name: 'type', value: number },
  { name: 'logicGroupIDs', value: number[] },
  { name: 'affabilityThreshold', value: number },
  { name: 'fearThreshold', value: number },
  { name: 'personalityType', value: number },
  { name: 'summonSpeed', value: number },
  { name: 'magModifier', value: number },
  { name: 'fusionDifficulty', value: number },
  { name: 'fusionOptions', value: number },
  { name: 'baseDemonID', value: number },
  { name: 'unionRates', value: number[] },
  { name: 'mitamaFusionID', value: number },
  { name: 'growthType', value: number },
  { name: 'baseLevel', value: number },
  { name: 'inheritanceType', value: number },
  { name: 'inheritanceRestrictions', value: number },
  { name: 'skills', value: number[] },
  { name: 'enemyOnlySkills', value: number[] },
  { name: 'traits', value: number[] },
  { name: 'acquisitionSkills', value: number[][] },
  { name: 'forceStack', value: number },
  { name: 'salesDialogue', value: string[] },
  { name: 'hitboxSize', value: number },
  { name: 'digitalizeXP', value: number },
  { name: 'enemyLevel', value: number },
  { name: 'isFloating', value: boolean },
  { name: 'correct', value: number[] },
  { name: 'enemyHP', value: number },
  { name: 'familiarityType', value: number }
];

@Component({
  selector: 'app-devil-data',
  templateUrl: './devil-data.component.html',
  styleUrls: ['./devil-data.component.scss']
})
export class DevilDataComponent {
  contentJson: string = "";
  @Input() fileMode: string = "";
  @Output() fileIsValid = new EventEmitter<boolean>();
  @Output() saveXmlFile = new EventEmitter<string>();
  @Output() encryptFile = new EventEmitter<string>();
  @Output() contentParsed = new EventEmitter<any>();

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

  showCorrect = false;

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
      const nameStr = String(item[1].value).toLowerCase();
      const family = String(item[8].value).toLowerCase();
      const race = String(item[9].value).toLowerCase();
      return idStr.includes(searchStr) || nameStr.includes(searchStr) || family.includes(searchStr) || race.includes(searchStr);
    });

    this.currentPage = 1;
    this.cd.detectChanges();
  }

  async parseContent(json: string) {
    let res = await this.parseData(json);
    this.contentParsed.emit(res);
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
          let skills: any[] = [];
          item.member[6].object.member.find((m: any) => m["@name"] === "skills").element.forEach((e: any) => {
            skills.push(e);
          });
          let enemyOnlySkills: any[] = [];
          item.member[6].object.member.find((m: any) => m["@name"] === "enemyOnlySkills").element.forEach((e: any) => {
            enemyOnlySkills.push(e);
          });
          let traits: any[] = [];
          item.member[6].object.member.find((m: any) => m["@name"] === "traits").element.forEach((e: any) => {
            traits.push(e);
          });
          let acquisitionSkills: any[][] = [];
          item.member[6].object.member.find((m: any) => m["@name"] === "acquisitionSkills").element.forEach((e: any) => {
            acquisitionSkills.push([e.object.member[0]["#text"], e.object.member[1]["#text"]]);
          });

          let salesDialogue: any[] = [];
          item.member[6].object.member.find((m: any) => m["@name"] === "salesDialogue").element.forEach((e: any) => {
            salesDialogue.push(e);
          });

          let correct: any[] = [];
          item.member[7].object.member.find((m: any) => m["@name"] === "correct").element.forEach((e: any) => {
            correct.push(e);
          });
          return [
            { name: "ID", value: item.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: "name", value: item.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
            { name: "title", value: item.member[0].object.member.find((m: any) => m["@name"] === "title")["#text"] },
            { name: "gender", value: item.member[0].object.member.find((m: any) => m["@name"] === "gender")["#text"] },
            { name: "fusionModifier", value: item.member[0].object.member.find((m: any) => m["@name"] === "fusionModifier")["#text"] },
            { name: "LNC", value: item.member[0].object.member.find((m: any) => m["@name"] === "LNC")["#text"] },
            { name: "unused", value: item.member[0].object.member.find((m: any) => m["@name"] === "unused")["#text"] },
            { name: "modelID", value: item.member[0].object.member.find((m: any) => m["@name"] === "modelID")["#text"] },
            { name: "family", value: item.member[1].object.member.find((m: any) => m["@name"] === "family")["#text"] },
            { name: "race", value: item.member[1].object.member.find((m: any) => m["@name"] === "race")["#text"] },
            { name: "type", value: item.member[2].object.member.find((m: any) => m["@name"] === "type")["#text"] },
            { name: "logicGroupIDs", value: [item.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[0], item.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[1], item.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[2]] },
            { name: "affabilityThreshold", value: item.member[3].object.member.find((m: any) => m["@name"] === "affabilityThreshold")["#text"] },
            { name: "fearThreshold", value: item.member[3].object.member.find((m: any) => m["@name"] === "fearThreshold")["#text"] },
            { name: "personalityType", value: item.member[3].object.member.find((m: any) => m["@name"] === "personalityType")["#text"] },
            { name: 'summonSpeed', value: item.member[4].object.member.find((m: any) => m["@name"] === "summonSpeed")["#text"] },
            { name: 'magModifier', value: item.member[4].object.member.find((m: any) => m["@name"] === "magModifier")["#text"] },
            { name: 'fusionDifficulty', value: item.member[5].object.member.find((m: any) => m["@name"] === "fusionDifficulty")["#text"] },
            { name: 'fusionOptions', value: item.member[5].object.member.find((m: any) => m["@name"] === "fusionOptions")["#text"] },
            { name: 'baseDemonID', value: item.member[5].object.member.find((m: any) => m["@name"] === "baseDemonID")["#text"] },
            { name: 'unionRates', value: [item.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[0], item.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[1], item.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[2], item.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[3], item.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[4]] },
            { name: 'mitamaFusionID', value: item.member[5].object.member.find((m: any) => m["@name"] === "mitamaFusionID")["#text"] },
            { name: 'growthType', value: item.member[6].object.member.find((m: any) => m["@name"] === "growthType")["#text"] },
            { name: 'baseLevel', value: item.member[6].object.member.find((m: any) => m["@name"] === "baseLevel")["#text"] },
            { name: 'inheritanceType', value: item.member[6].object.member.find((m: any) => m["@name"] === "inheritanceType")["#text"] },
            { name: 'inheritanceRestrictions', value: item.member[6].object.member.find((m: any) => m["@name"] === "inheritanceRestrictions")["#text"] },
            { name: 'skills', value: skills },
            { name: 'enemyOnlySkills', value: enemyOnlySkills },
            { name: 'traits', value: traits },
            { name: 'acquisitionSkills', value: acquisitionSkills },
            { name: 'forceStack', value: item.member[6].object.member.find((m: any) => m["@name"] === "forceStack")["#text"] },
            { name: 'salesDialogue', value: salesDialogue },
            { name: 'hitboxSize', value: item.member[7].object.member.find((m: any) => m["@name"] === "hitboxSize")["#text"] },
            { name: 'digitalizeXP', value: item.member[7].object.member.find((m: any) => m["@name"] === "digitalizeXP")["#text"] },
            { name: 'enemyLevel', value: item.member[7].object.member.find((m: any) => m["@name"] === "enemyLevel")["#text"] },
            { name: 'isFloating', value: item.member[7].object.member.find((m: any) => m["@name"] === "isFloating")["#text"] },
            { name: 'correct', value: correct },
            { name: 'enemyHP', value: item.member[7].object.member.find((m: any) => m["@name"] === "enemyHP").element },
            { name: 'familiarityType', value: item.member[8].object.member["#text"] }
          ];
        }));
      }
      else {
        let skills: any[] = [];
        parsed.member[6].object.member.find((m: any) => m["@name"] === "skills").element.forEach((e: any) => {
          skills.push(e);
        });
        let enemyOnlySkills: any[] = [];
        parsed.member[6].object.member.find((m: any) => m["@name"] === "enemyOnlySkills").element.forEach((e: any) => {
          enemyOnlySkills.push(e);
        });
        let traits: any[] = [];
        parsed.member[6].object.member.find((m: any) => m["@name"] === "traits").element.forEach((e: any) => {
          traits.push(e);
        });
        let acquisitionSkills: any[][] = [];
        parsed.member[6].object.member.find((m: any) => m["@name"] === "acquisitionSkills").element.forEach((e: any) => {
          acquisitionSkills.push([e.object.member[0]["#text"], e.object.member[1]["#text"]]);
        });

        let salesDialogue: any[] = [];
        parsed.member[6].object.member.find((m: any) => m["@name"] === "salesDialogue").element.forEach((e: any) => {
          salesDialogue.push(e);
        });

        let correct: any[] = [];
        parsed.member[7].object.member.find((m: any) => m["@name"] === "correct").element.forEach((e: any) => {
          correct.push(e);
        });

        items = [[{ name: "ID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "ID")["#text"] },
        { name: "name", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "name")["#text"] },
        { name: "title", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "title")["#text"] },
        { name: "gender", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "gender")["#text"] },
        { name: "fusionModifier", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "fusionModifier")["#text"] },
        { name: "LNC", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "LNC")["#text"] },
        { name: "unused", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "unused")["#text"] },
        { name: "modelID", value: parsed.member[0].object.member.find((m: any) => m["@name"] === "modelID")["#text"] },
        { name: "family", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "family")["#text"] },
        { name: "race", value: parsed.member[1].object.member.find((m: any) => m["@name"] === "race")["#text"] },
        { name: "type", value: parsed.member[2].object.member.find((m: any) => m["@name"] === "type")["#text"] },
        { name: "logicGroupIDs", value: [parsed.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[0]["#text"], parsed.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[1]["#text"], parsed.member[2].object.member.find((m: any) => m["@name"] === "logicGroupIDs").element[2]["#text"]] },
        { name: "affabilityThreshold", value: parsed.member[3].object.member.find((m: any) => m["@name"] === "affabilityThreshold")["#text"] },
        { name: "fearThreshold", value: parsed.member[3].object.member.find((m: any) => m["@name"] === "fearThreshold")["#text"] },
        { name: "personalityType", value: parsed.member[3].object.member.find((m: any) => m["@name"] === "personalityType")["#text"] },
        { name: 'summonSpeed', value: parsed.member[4].object.member.find((m: any) => m["@name"] === "summonSpeed")["#text"] },
        { name: 'magModifier', value: parsed.member[4].object.member.find((m: any) => m["@name"] === "magModifier")["#text"] },
        { name: 'fusionDifficulty', value: parsed.member[5].object.member.find((m: any) => m["@name"] === "fusionDifficulty")["#text"] },
        { name: 'fusionOptions', value: parsed.member[5].object.member.find((m: any) => m["@name"] === "fusionOptions")["#text"] },
        { name: 'baseDemonID', value: parsed.member[5].object.member.find((m: any) => m["@name"] === "baseDemonID")["#text"] },
        { name: 'unionRates', value: [parsed.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[0], parsed.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[1], parsed.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[2], parsed.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[3], parsed.member[5].object.member.find((m: any) => m["@name"] === "unionRates").element[4]] },
        { name: 'mitamaFusionID', value: parsed.member[5].object.member.find((m: any) => m["@name"] === "mitamaFusionID")["#text"] },
        { name: 'growthType', value: parsed.member[6].object.member.find((m: any) => m["@name"] === "growthType")["#text"] },
        { name: 'baseLevel', value: parsed.member[6].object.member.find((m: any) => m["@name"] === "baseLevel")["#text"] },
        { name: 'inheritanceType', value: parsed.member[6].object.member.find((m: any) => m["@name"] === "inheritanceType")["#text"] },
        { name: 'inheritanceRestrictions', value: parsed.member[6].object.member.find((m: any) => m["@name"] === "inheritanceRestrictions")["#text"] },
        { name: 'skills', value: skills },
        { name: 'enemyOnlySkills', value: enemyOnlySkills },
        { name: 'traits', value: traits },
        { name: 'acquisitionSkills', value: acquisitionSkills },
        { name: 'forceStack', value: parsed.member[6].object.member.find((m: any) => m["@name"] === "forceStack")["#text"] },
        { name: 'salesDialogue', value: salesDialogue },
        { name: 'hitboxSize', value: parsed.member[7].object.member.find((m: any) => m["@name"] === "hitboxSize")["#text"] },
        { name: 'digitalizeXP', value: parsed.member[7].object.member.find((m: any) => m["@name"] === "digitalizeXP")["#text"] },
        { name: 'enemyLevel', value: parsed.member[7].object.member.find((m: any) => m["@name"] === "enemyLevel")["#text"] },
        { name: 'isFloating', value: parsed.member[7].object.member.find((m: any) => m["@name"] === "isFloating")["#text"] },
        { name: 'correct', value: correct },
        { name: 'enemyHP', value: parsed.member[7].object.member.find((m: any) => m["@name"] === "enemyHP").element },
        { name: 'familiarityType', value: parsed.member[8].object.member["#text"] }
        ]];
      }
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
      this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);

      let skills: any[] = [];
      this.selectedItem[26].value.forEach((e: any) => {
        skills.push(e);
      });
      let enemyOnlySkills: any[] = [];
      this.selectedItem[27].value.forEach((e: any) => {
        enemyOnlySkills.push(e);
      });
      let traits: any[] = [];
      this.selectedItem[28].value.forEach((e: any) => {
        traits.push(e);
      });
      let acquisitionSkills: any[][] = [];
      this.selectedItem[29].value.forEach((e: any) => {
        acquisitionSkills.push([e[0], e[1]]);
      });

      let salesDialogue: any[] = [];
      this.selectedItem[31].value.forEach((e: any) => {
        salesDialogue.push(e);
      });

      let correct: any[] = [];
      this.selectedItem[36].value.forEach((e: any) => {
        correct.push(e);
      });

      this.editingItem = [
        { name: 'ID', value: this.selectedItem[0].value },
        { name: "name", value: this.selectedItem[1].value },
        { name: "title", value: this.selectedItem[2].value },
        { name: "gender", value: this.selectedItem[3].value },
        { name: "fusionModifier", value: this.selectedItem[4].value },
        { name: "LNC", value: this.selectedItem[5].value },
        { name: "unused", value: this.selectedItem[6].value },
        { name: "modelID", value: this.selectedItem[7].value },
        { name: "family", value: this.selectedItem[8].value },
        { name: "race", value: this.selectedItem[9].value },
        { name: "type", value: this.selectedItem[10].value },
        { name: "logicGroupIDs", value: [this.selectedItem[11].value[0], this.selectedItem[11].value[1], this.selectedItem[11].value[2]] },
        { name: "affabilityThreshold", value: this.selectedItem[12].value },
        { name: "fearThreshold", value: this.selectedItem[13].value },
        { name: "personalityType", value: this.selectedItem[14].value },
        { name: 'summonSpeed', value: this.selectedItem[15].value },
        { name: 'magModifier', value: this.selectedItem[16].value },
        { name: 'fusionDifficulty', value: this.selectedItem[17].value },
        { name: 'fusionOptions', value: this.selectedItem[18].value },
        { name: 'baseDemonID', value: this.selectedItem[19].value },
        { name: 'unionRates', value: [this.selectedItem[20].value[0], this.selectedItem[20].value[1], this.selectedItem[20].value[2], this.selectedItem[20].value[3], this.selectedItem[20].value[4]] },
        { name: 'mitamaFusionID', value: this.selectedItem[21].value },
        { name: 'growthType', value: this.selectedItem[22].value },
        { name: 'baseLevel', value: this.selectedItem[23].value },
        { name: 'inheritanceType', value: this.selectedItem[24].value },
        { name: 'inheritanceRestrictions', value: this.selectedItem[25].value },
        { name: 'skills', value: skills },
        { name: 'enemyOnlySkills', value: enemyOnlySkills },
        { name: 'traits', value: traits },
        { name: 'acquisitionSkills', value: acquisitionSkills },
        { name: 'forceStack', value: this.selectedItem[30].value },
        { name: 'salesDialogue', value: salesDialogue },
        { name: 'hitboxSize', value: this.selectedItem[32].value },
        { name: 'digitalizeXP', value: this.selectedItem[33].value },
        { name: 'enemyLevel', value: this.selectedItem[34].value },
        { name: 'isFloating', value: this.selectedItem[35].value },
        { name: 'correct', value: correct },
        { name: 'enemyHP', value: this.selectedItem[37].value },
        { name: 'familiarityType', value: this.selectedItem[38].value }];
    }
    else {
      let acquisitionSkills: any[][] = [];
      for (let i = 0; i < 16; i++) {
        acquisitionSkills.push([0, 0]);
      }

      let correct: any[] = [];
      for (let i = 0; i < 126; i++) {
        correct.push(0);
      }
      this.editingItem = [
        { name: 'ID', value: null },
        { name: 'name', value: "" },
        { name: "title", value: 0 },
        { name: "gender", value: 'MALE' },
        { name: "fusionModifier", value: 0 },
        { name: "LNC", value: 0 },
        { name: "unused", value: 0 },
        { name: "modelID", value: 0 },
        { name: "family", value: "GOD" },
        { name: "race", value: "GOD_SPIRIT" },
        { name: "type", value: 0 },
        { name: "logicGroupIDs", value: [1, 1, 1] },
        { name: "affabilityThreshold", value: 0 },
        { name: "fearThreshold", value: 0 },
        { name: "personalityType", value: 0 },
        { name: 'summonSpeed', value: 100 },
        { name: 'magModifier', value: 0 },
        { name: 'fusionDifficulty', value: 100 },
        { name: 'fusionOptions', value: 0 },
        { name: 'baseDemonID', value: 0 },
        { name: 'unionRates', value: [0, 0, 0, 0, 0] },
        { name: 'mitamaFusionID', value: 0 },
        { name: 'growthType', value: 0 },
        { name: 'baseLevel', value: 1 },
        { name: 'inheritanceType', value: 0 },
        { name: 'inheritanceRestrictions', value: 0 },
        { name: 'skills', value: [0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'enemyOnlySkills', value: [0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'traits', value: [0, 0, 0, 0] },
        { name: 'acquisitionSkills', value: acquisitionSkills },
        { name: 'forceStack', value: 0 },
        { name: 'salesDialogue', value: ['', '', '', '', '', '', '', ''] },
        { name: 'hitboxSize', value: 10 },
        { name: 'digitalizeXP', value: 0 },
        { name: 'enemyLevel', value: 0 },
        { name: 'isFloating', value: false },
        { name: 'correct', value: correct },
        { name: 'enemyHP', value: 0 },
        { name: 'familiarityType', value: 0 }

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

  changeShow() {
    this.showCorrect = !this.showCorrect;


    this.cd.detectChanges();
  }

  writeXmlFile(saveMode: string, content: any) {
    const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
    if (confirmation) {
      // Create the root XML element
      let xml = '<objects>\n';

      // Loop through each item in this.content array
      content.forEach((item: devilDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiDevilData">\n';
        xml += '	  <member name="basic">\n';
        xml += '	    <object name="MiNPCBasicData">\n';
        xml += `        <member name="ID">${item[0].value}</member>\n`;
        xml += `        <member name="name"><![CDATA[${item[1].value || ''}]]></member>\n`;
        xml += `        <member name="title">${item[2].value}</member>\n`;
        xml += `        <member name="gender">${item[3].value}</member>\n`;
        xml += `        <member name="fusionModifier">${item[4].value}</member>\n`;
        xml += `        <member name="LNC">${item[5].value}</member>\n`;
        xml += `        <member name="unused">${item[6].value}</member>\n`;
        xml += `        <member name="modelID">${item[7].value}</member>\n`;
        xml += '	    </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="category">\n';
        xml += '	    <object name="MiDCategoryData">\n';
        xml += `        <member name="family">${item[8].value}</member>\n`;
        xml += `        <member name="race">${item[9].value}</member>\n`;
        xml += '	    </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="AI">\n';
        xml += '	    <object name="MiAIRelationData">\n';
        xml += `        <member name="type">${item[10].value}</member>\n`;
        xml += `        <member name="logicGroupIDs">\n`;
        item[11].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });
        xml += `        </member>\n`;
        xml += '      </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="negotiation">\n';
        xml += '      <object name="MiNegotiationData">\n';
        xml += `        <member name="affabilityThreshold">${item[12].value}</member>\n`;
        xml += `        <member name="fearThreshold">${item[13].value}</member>\n`;
        xml += `        <member name="personalityType">${item[14].value}</member>\n`;
        xml += '      </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="summonData">\n';
        xml += '      <object name="MiSummonData">\n';
        xml += `        <member name="summonSpeed">${item[15].value}</member>\n`;
        xml += `        <member name="magModifier">${item[16].value}</member>\n`;
        xml += '      </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="unionData">\n';
        xml += '      <object name="MiUnionData">\n';
        xml += `        <member name="fusionDifficulty">${item[17].value}</member>\n`;
        xml += `        <member name="fusionOptions">${item[18].value}</member>\n`;
        xml += `        <member name="baseDemonID">${item[19].value}</member>\n`;
        xml += `        <member name="unionRates">\n`;
        item[20].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });
        xml += `        </member>\n`;
        xml += `        <member name="mitamaFusionID">${item[21].value}</member>\n`;
        xml += '      </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="growth">\n';
        xml += '      <object name="MiGrowthData">\n';
        xml += `        <member name="growthType">${item[22].value}</member>\n`;
        xml += `        <member name="baseLevel">${item[23].value}</member>\n`;
        xml += `        <member name="inheritanceType">${item[24].value}</member>\n`;
        xml += `        <member name="inheritanceRestrictions">${item[25].value}</member>\n`;
        xml += `        <member name="skills">\n`;
        item[26].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });
        xml += `        </member>\n`;
        xml += `        <member name="enemyOnlyskills">\n`;
        item[27].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });
        xml += `        </member>\n`;
        xml += `        <member name="traits">\n`;
        item[28].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });
        xml += `        </member>\n`;
        xml += `        <member name="acquisitionSkills">\n`;
        item[29].value.forEach((elt: any) => {
          xml += `        <element>\n`;
          xml += `          <object name="MiAcquisitionSkillData">\n`;
          xml += `           <member name="ID">${elt[0]}</member>\n`;
          xml += `           <member name="level">${elt[1]}</member>\n`;
          xml += `         </object>\n`;
          xml += `       </element>\n`;
        });
        xml += `        </member>\n`;
        xml += `        <member name="forceStack">${item[30].value}</member>\n`;
        xml += `        <member name="salesDialogue">\n`;
        item[31].value.forEach((id: string) => {
          xml += `          <element><![CDATA[${id || ''}]]></element>\n`;
        });
        xml += `       </member>\n`;
        xml += '      </object>\n';
        xml += '    </member>\n';
        xml += '	  <member name="battleData">\n';
        xml += '	    <object name="MiDevilBattleData">\n';
        xml += `        <member name="hitboxSize">${item[32].value}</member>\n`;
        xml += `        <member name="digitalizeXP">${item[33].value}</member>\n`;
        xml += `        <member name="enemyLevel">${item[34].value}</member>\n`;
        xml += `        <member name="isFloating">${item[35].value}</member>\n`;
        xml += `        <member name="correct">\n`;
        item[36].value.forEach((id: number) => {
          xml += `          <element>${id}</element>\n`;
        });

        xml += `        </member>\n`;
        xml += `        <member name="enemyHP">\n`;
        xml += `          <element>${item[37].value}</element>\n`;
        xml += `        </member>\n`;
        xml += '      </object>\n';
        xml += '	  </member>\n';
        xml += '	  <member name="familiarity">\n';
        xml += '	    <object name="MiDevilFamiliarityData">\n';
        xml += `        <member name="familiarityType">${item[38].value}</member>\n`;
        xml += '       </object>\n';
        xml += '    </member>\n';

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
