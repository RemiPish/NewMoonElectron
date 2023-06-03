import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type ultimateBattleBaseDataStructure = [
  { name: 'ID', value: number },
  { name: 'unknown11', value: number },
  { name: 'unknown12', value: number },
  { name: 'enabled', value: boolean },
  { name: 'zoneID', value: number },
  { name: 'zoneSpotID', value: number },
  { name: 'zoneSpot2', value: number },
  { name: 'lobbyID', value: number },
  { name: 'playerCount', value: number },
  { name: 'unknown9', value: number },
  { name: 'unknown10', value: number },
  { name: 'unknown11', value: number },
  { name: 'unknown12', value: number },
  { name: 'unknown13', value: number },
  { name: 'restTime', value: number },
  { name: 'unknown15', value: number },
  { name: 'unknown16', value: number },
  { name: 'coinMultiplier', value: number },
  { name: 'unknown18', value: number },
  { name: 'schedule', value: number[] }
];

@Component({
  selector: 'app-ultimate-battle-base-data',
  templateUrl: './ultimate-battle-base-data.component.html',
  styleUrls: ['./ultimate-battle-base-data.component.scss']
})
export class UltimateBattleBaseDataComponent {
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
    this.content = await this.parseItemData(this.contentJson);
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

  async parseItemData(json: string) {
    try {
      const parsed = JSON.parse(json);
      if (parsed.length) {
        const items = await Promise.all(parsed.map(async (item: any) => {
          let schedule: any[] = [];
          for (let i = 0; i < item.member.find((m: any) => m["@name"] === "schedule").element.length; i++) {
            schedule.push(item.member.find((m: any) => m["@name"] === "schedule").element[i]);
          }
          return [
            { name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
            { name: 'unknown1', value: item.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
            { name: 'unknown2', value: item.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
            { name: 'enabled', value: item.member.find((m: any) => m["@name"] === "enabled")["#text"] },
            { name: 'zoneID', value: item.member.find((m: any) => m["@name"] === "zoneID")["#text"] },
            { name: 'zoneSpotID', value: item.member.find((m: any) => m["@name"] === "zoneSpotID")["#text"] },
            { name: 'zoneSpot2', value: item.member.find((m: any) => m["@name"] === "zoneSpot2")["#text"] },
            { name: 'lobbyID', value: item.member.find((m: any) => m["@name"] === "lobbyID")["#text"] },
            { name: 'playerCount', value: item.member.find((m: any) => m["@name"] === "playerCount")["#text"] },
            { name: 'unknown9', value: item.member.find((m: any) => m["@name"] === "unknown9")["#text"] },
            { name: 'unknown10', value: item.member.find((m: any) => m["@name"] === "unknown10")["#text"] },
            { name: 'unknown11', value: item.member.find((m: any) => m["@name"] === "unknown11")["#text"] },
            { name: 'unknown12', value: item.member.find((m: any) => m["@name"] === "unknown12")["#text"] },
            { name: 'unknown13', value: item.member.find((m: any) => m["@name"] === "unknown13")["#text"] },
            { name: 'restTime', value: item.member.find((m: any) => m["@name"] === "restTime")["#text"] },
            { name: 'unknown15', value: item.member.find((m: any) => m["@name"] === "unknown15")["#text"] },
            { name: 'unknown16', value: item.member.find((m: any) => m["@name"] === "unknown16")["#text"] },
            { name: 'coinMultiplier', value: item.member.find((m: any) => m["@name"] === "coinMultiplier")["#text"] },
            { name: 'unknown18', value: item.member.find((m: any) => m["@name"] === "unknown18")["#text"] },
            { name: 'schedule', value: schedule },
          ];
        }));
        console.log(items);
        return items;
      }
      else {
        let schedule: any[] = [];
        for (let i = 0; i < parsed.member.find((m: any) => m["@name"] === "schedule").element.length; i++) {
          schedule.push(parsed.member.find((m: any) => m["@name"] === "schedule").element[i]);
        }
        return [[
          { name: "ID", value: parsed.member.find((m: any) => m["@name"] === "ID")["#text"] },
          { name: 'unknown1', value: parsed.member.find((m: any) => m["@name"] === "unknown1")["#text"] },
          { name: 'unknown2', value: parsed.member.find((m: any) => m["@name"] === "unknown2")["#text"] },
          { name: 'enabled', value: parsed.member.find((m: any) => m["@name"] === "enabled")["#text"] },
          { name: 'zoneID', value: parsed.member.find((m: any) => m["@name"] === "zoneID")["#text"] },
          { name: 'zoneSpotID', value: parsed.member.find((m: any) => m["@name"] === "zoneSpotID")["#text"] },
          { name: 'zoneSpot2', value: parsed.member.find((m: any) => m["@name"] === "zoneSpot2")["#text"] },
          { name: 'lobbyID', value: parsed.member.find((m: any) => m["@name"] === "lobbyID")["#text"] },
          { name: 'playerCount', value: parsed.member.find((m: any) => m["@name"] === "playerCount")["#text"] },
          { name: 'unknown9', value: parsed.member.find((m: any) => m["@name"] === "unknown9")["#text"] },
          { name: 'unknown10', value: parsed.member.find((m: any) => m["@name"] === "unknown10")["#text"] },
          { name: 'unknown11', value: parsed.member.find((m: any) => m["@name"] === "unknown11")["#text"] },
          { name: 'unknown12', value: parsed.member.find((m: any) => m["@name"] === "unknown12")["#text"] },
          { name: 'unknown13', value: parsed.member.find((m: any) => m["@name"] === "unknown13")["#text"] },
          { name: 'restTime', value: parsed.member.find((m: any) => m["@name"] === "restTime")["#text"] },
          { name: 'unknown15', value: parsed.member.find((m: any) => m["@name"] === "unknown15")["#text"] },
          { name: 'unknown16', value: parsed.member.find((m: any) => m["@name"] === "unknown16")["#text"] },
          { name: 'coinMultiplier', value: parsed.member.find((m: any) => m["@name"] === "coinMultiplier")["#text"] },
          { name: 'unknown18', value: parsed.member.find((m: any) => m["@name"] === "unknown18")["#text"] },
          { name: 'schedule', value: schedule },
        ]];
      }
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
      let schedule: any[] = [];
      for (let i = 0; i < this.selectedItem[19].value.length; i++) {
        schedule.push(this.selectedItem[19].value[i]);
      }

      this.editingItem = [
        { name: "ID", value: this.selectedItem[0].value },
        { name: 'unknown1', value: this.selectedItem[1].value },
        { name: 'unknown2', value: this.selectedItem[2].value },
        { name: 'enabled', value: this.selectedItem[3].value },
        { name: 'zoneID', value: this.selectedItem[4].value },
        { name: 'zoneSpotID', value: this.selectedItem[5].value },
        { name: 'zoneSpot2', value: this.selectedItem[6].value },
        { name: 'lobbyID', value: this.selectedItem[7].value },
        { name: 'playerCount', value: this.selectedItem[8].value },
        { name: 'unknown9', value: this.selectedItem[9].value },
        { name: 'unknown10', value: this.selectedItem[10].value },
        { name: 'unknown11', value: this.selectedItem[11].value },
        { name: 'unknown12', value: this.selectedItem[12].value },
        { name: 'unknown13', value: this.selectedItem[13].value },
        { name: 'restTime', value: this.selectedItem[14].value },
        { name: 'unknown15', value: this.selectedItem[15].value },
        { name: 'unknown16', value: this.selectedItem[16].value },
        { name: 'coinMultiplier', value: this.selectedItem[17].value },
        { name: 'unknown18', value: this.selectedItem[18].value },
        { name: 'schedule', value: schedule },
      ];
      //console.log(this.editingItem)
    }
    else {
      let schedule: any[] = [];
      for (let i = 0; i < 24; i++) {
        schedule.push(0);
      }
      this.editingItem = [
        { name: "ID", value: null },
        { name: 'unknown1', value: 0 },
        { name: 'unknown2', value: 0 },
        { name: 'enabled', value: true },
        { name: 'zoneID', value: 0 },
        { name: 'zoneSpotID', value: 0 },
        { name: 'zoneSpot2', value: 0 },
        { name: 'lobbyID', value: 0 },
        { name: 'playerCount', value: 0 },
        { name: 'unknown9', value: 0 },
        { name: 'unknown10', value: 0 },
        { name: 'unknown11', value: 0 },
        { name: 'unknown12', value: 0 },
        { name: 'unknown13', value: 0 },
        { name: 'restTime', value: 0 },
        { name: 'unknown15', value: 0 },
        { name: 'unknown16', value: 0 },
        { name: 'coinMultiplier', value: 0 },
        { name: 'unknown18', value: 0 },
        { name: 'schedule', value: schedule }
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
      this.content.forEach((item: ultimateBattleBaseDataStructure) => {
        // Write the opening tag for the item
        xml += '	<object name="MiUltimateBattleBaseData">\n';

        // Write the baseData element

        xml += `    <member name="ID">${item[0].value}</member>\n`;
        xml += `    <member name="unknown1">${item[1].value}</member>\n`;
        xml += `    <member name="unknown2">${item[2].value}</member>\n`;
        xml += `    <member name="enabled">${item[3].value}</member>\n`;
        xml += `    <member name="zoneID">${item[4].value}</member>\n`;
        xml += `    <member name="zoneSpotID">${item[5].value}</member>\n`;
        xml += `    <member name="zoneSpot2">${item[6].value}</member>\n`;
        xml += `    <member name="lobbyID">${item[7].value}</member>\n`;
        xml += `    <member name="playerCount">${item[8].value}</member>\n`;
        xml += `    <member name="unknown9">${item[9].value}</member>\n`;
        xml += `    <member name="unknown10">${item[10].value}</member>\n`;
        xml += `    <member name="unknown11">${item[11].value}</member>\n`;
        xml += `    <member name="unknown12">${item[12].value}</member>\n`;
        xml += `    <member name="unknown13">${item[13].value}</member>\n`;
        xml += `    <member name="restTime">${item[14].value}</member>\n`;
        xml += `    <member name="unknown15">${item[15].value}</member>\n`;
        xml += `    <member name="unknown16">${item[16].value}</member>\n`;
        xml += `    <member name="coinMultiplier">${item[17].value}</member>\n`;
        xml += `    <member name="unknown18">${item[18].value}</member>\n`;
        xml += `    <member name="schedule">\n`;
        for (let i = 0; i < item[19].value.length; i++) {
          xml += `      <element>${item[19].value[i]}</element>\n`;
        }

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
