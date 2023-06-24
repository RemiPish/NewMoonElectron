import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';


export type dataStructure = [
	{ name: 'id', value: number },
	{ name: 'name', value: string },
	{ name: 'type', value: string },
	{ name: 'flags', value: number },
	{ name: 'parentID', value: number },
	{ name: 'startingSpot', value: number },
	{ name: 'modelFile', value: string },
	{ name: 'nameFile', value: string },
	{ name: 'qmpFile', value: string },
	{ name: 'spotFile', value: string },
	{ name: 'enemyFile', value: string },
	{ name: 'npcFile', value: string },
	{ name: 'eventFile', value: string },
	{ name: 'unused1', value: string },
	{ name: 'unused2', value: string },
	{ name: 'groupFile', value: string },
	{ name: 'unitFile', value: string },
	{ name: 'unused3', value: string },
	{ name: 'unused4', value: string },
	{ name: 'unused5', value: string },
	{ name: 'unused6', value: string },
	{ name: 'unused7', value: string },
	{ name: 'unused8', value: string },
	{ name: 'unused9', value: string },
	{ name: 'unused10', value: string },
	{ name: 'FogEnabled', value: boolean },
	{ name: 'dayColor', value: number[] },
	{ name: 'dayDistanceStart', value: number },
	{ name: 'dayDistanceEnd', value: number },
	{ name: 'nightColor', value: number[] },
	{ name: 'nightDistanceStart', value: number },
	{ name: 'nightDistanceEnd', value: number },
	{ name: 'maxDrawDistance', value: number },
	{ name: 'enableSkyBox', value: boolean },
	{ name: 'enableSunMoon', value: boolean },
	{ name: 'skyDoomFile', value: string },
	{ name: 'starFile', value: string },
	{ name: 'sunFile', value: string },
	{ name: 'alwaysFile', value: string },
	{ name: 'mistFile', value: string },
	{ name: 'cloudFile', value: string },
	{ name: 'always2File', value: string },
	{ name: 'lightFile', value: string },
	{ name: 'GouraudEnabled', value: boolean },
	{ name: 'bloomScale', value: number },
	{ name: 'bloomBrightness', value: number },
	{ name: 'shading', value: number[] },
	{ name: 'GouraudUnused', value: number },
	{ name: 'blur', value: number },
	{ name: 'flareEnable', value: boolean },
	{ name: 'reduction', value: number },
	{ name: 'layers', value: any[] },
	{ name: 'zoneSoundID', value: number },
	{ name: 'battleSoundID', value: number },
	{ name: 'otherUnused', value: number },
	{ name: 'characterLighting', value: number[] }
];
@Component({
	selector: 'app-zone-data',
	templateUrl: './zone-data.component.html',
	styleUrls: ['./zone-data.component.scss']
})
export class ZoneDataComponent {
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
			const nameStr = String(item[1].value).toLowerCase();
			return idStr.includes(searchStr) || nameStr.includes(searchStr);
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

				let layers: any[] = [];
				item.member[6].object.member[2].element.forEach((e: any) => {
					layers.push([e.object.member[0]["#text"], e.object.member[1]["#text"], e.object.member[2]["#text"], e.object.member[3]["#text"], e.object.member[4]["#text"]]);
				});
				return [
					{ name: "id", value: item.member[0].object.member[0]["#text"] },
					{ name: "name", value: item.member[0].object.member[1]["#text"] },
					{ name: "type", value: item.member[0].object.member[2]["#text"] },
					{ name: "flags", value: item.member[0].object.member[3]["#text"] },
					{ name: "parentID", value: item.member[0].object.member[4]["#text"] },
					{ name: "startingSpot", value: item.member[0].object.member[5]["#text"] },
					{ name: "modelFile", value: item.member[1].object.member[0]["#text"] },
					{ name: "nameFile", value: item.member[1].object.member[1]["#text"] },
					{ name: "qmpFile", value: item.member[1].object.member[2]["#text"] },
					{ name: "spotFile", value: item.member[1].object.member[3]["#text"] },
					{ name: "enemyFile", value: item.member[1].object.member[4]["#text"] },
					{ name: "npcFile", value: item.member[1].object.member[5]["#text"] },
					{ name: "eventFile", value: item.member[1].object.member[6]["#text"] },
					{ name: "unused1", value: item.member[1].object.member[7]["#text"] },
					{ name: "unused2", value: item.member[1].object.member[8]["#text"] },
					{ name: "groupFile", value: item.member[1].object.member[9]["#text"] },
					{ name: "unitFile", value: item.member[1].object.member[10]["#text"] },
					{ name: "unused3", value: item.member[1].object.member[11]["#text"] },
					{ name: "unused4", value: item.member[1].object.member[12]["#text"] },
					{ name: "unused5", value: item.member[1].object.member[13]["#text"] },
					{ name: "unused6", value: item.member[1].object.member[14]["#text"] },
					{ name: "unused7", value: item.member[1].object.member[15]["#text"] },
					{ name: "unused8", value: item.member[1].object.member[16]["#text"] },
					{ name: "unused9", value: item.member[1].object.member[17]["#text"] },
					{ name: "unused10", value: item.member[1].object.member[18]["#text"] },
					{ name: "fogEnabled", value: item.member[2].object.member[0]["#text"] },
					{ name: 'dayColor', value: [item.member[2].object.member[1].element[0], item.member[2].object.member[1].element[1], item.member[2].object.member[1].element[2]] },
					{ name: 'dayDistanceStart', value: item.member[2].object.member[2]["#text"] },
					{ name: 'dayDistanceEnd', value: item.member[2].object.member[3]["#text"] },
					{ name: 'nightColor', value: [item.member[2].object.member[4].element[0], item.member[2].object.member[4].element[1], item.member[2].object.member[4].element[2]] },
					{ name: 'nightDistanceStart', value: item.member[2].object.member[5]["#text"] },
					{ name: 'nightDistanceEnd', value: item.member[2].object.member[6]["#text"] },
					{ name: 'maxDrawDistance', value: item.member[3].object.member["#text"] },
					{ name: 'enableSkybox', value: item.member[4].object.member[0]["#text"] },
					{ name: 'enableSunMoon', value: item.member[4].object.member[1]["#text"] },
					{ name: 'skyDoomFile', value: item.member[4].object.member[2]["#text"] },
					{ name: 'starFile', value: item.member[4].object.member[3]["#text"] },
					{ name: 'sunFile', value: item.member[4].object.member[4]["#text"] },
					{ name: 'alwaysFile', value: item.member[4].object.member[5]["#text"] },
					{ name: 'mistFile', value: item.member[4].object.member[6]["#text"] },
					{ name: 'cloudFile', value: item.member[4].object.member[7]["#text"] },
					{ name: 'alwaysFile', value: item.member[4].object.member[8]["#text"] },
					{ name: 'lightFile', value: item.member[4].object.member[9]["#text"] },
					{ name: 'gouraudEnabled', value: item.member[5].object.member[0]["#text"] },
					{ name: 'bloomScale', value: item.member[5].object.member[1]["#text"] },
					{ name: 'bloomBrightness', value: item.member[5].object.member[2]["#text"] },
					{ name: 'shading', value: [item.member[5].object.member[3].element[0], item.member[5].object.member[3].element[1], item.member[5].object.member[3].element[2], item.member[5].object.member[3].element[3]] },
					{ name: 'gouraudUnused', value: item.member[5].object.member[4]["#text"] },
					{ name: 'blur', value: item.member[5].object.member[5]["#text"] },
					{ name: 'flareEnabled', value: item.member[6].object.member[0]["#text"] },
					{ name: 'reduction', value: item.member[6].object.member[1]["#text"] },
					{ name: 'layers', value: layers },
					{ name: 'zoneSoundID', value: item.member[7].object.member[0]["#text"] },
					{ name: 'battleSoundID', value: item.member[7].object.member[1]["#text"] },
					{ name: 'otherUnused', value: item.member[8].object.member[0]["#text"] },
					{ name: 'characterLighting', value: [item.member[8].object.member[1].element[0], item.member[8].object.member[1].element[1], item.member[8].object.member[1].element[2]] }
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
			let layers: any[] = [];
			this.selectedItem[51].value.forEach((e: any) => {
				layers.push([e[0], e[1], e[2], e[3], e[4]]);
			});
			this.editingItem = [
				{ name: 'id', value: this.selectedItem[0].value },
				{ name: "name", value: this.selectedItem[1].value },
				{ name: "type", value: this.selectedItem[2].value },
				{ name: "flags", value: this.selectedItem[3].value },
				{ name: "parentID", value: this.selectedItem[4].value },
				{ name: "startingSpot", value: this.selectedItem[5].value },
				{ name: "modelFile", value: this.selectedItem[6].value },
				{ name: "nameFile", value: this.selectedItem[7].value },
				{ name: "qmpFile", value: this.selectedItem[8].value },
				{ name: "spotFile", value: this.selectedItem[9].value },
				{ name: "enemyFile", value: this.selectedItem[10].value },
				{ name: "npcFile", value: this.selectedItem[11].value },
				{ name: "eventFile", value: this.selectedItem[12].value },
				{ name: "unused1", value: this.selectedItem[13].value },
				{ name: "unused2", value: this.selectedItem[14].value },
				{ name: "groupFile", value: this.selectedItem[15].value },
				{ name: "unitFile", value: this.selectedItem[16].value },
				{ name: "unused3", value: this.selectedItem[17].value },
				{ name: "unused4", value: this.selectedItem[18].value },
				{ name: "unused5", value: this.selectedItem[19].value },
				{ name: "unused6", value: this.selectedItem[20].value },
				{ name: "unused7", value: this.selectedItem[21].value },
				{ name: "unused8", value: this.selectedItem[22].value },
				{ name: "unused9", value: this.selectedItem[23].value },
				{ name: "unused10", value: this.selectedItem[24].value },
				{ name: "fogEnabled", value: this.selectedItem[25].value },
				{ name: 'dayColor', value: [this.selectedItem[26].value[0], this.selectedItem[26].value[1], this.selectedItem[26].value[2]] },
				{ name: 'dayDistanceStart', value: this.selectedItem[27].value },
				{ name: 'dayDistanceEnd', value: this.selectedItem[28].value },
				{ name: 'nightColor', value: [this.selectedItem[29].value[0], this.selectedItem[29].value[1], this.selectedItem[29].value[2]] },
				{ name: 'nightDistanceStart', value: this.selectedItem[30].value },
				{ name: 'nightDistanceEnd', value: this.selectedItem[31].value },
				{ name: 'maxDrawDistance', value: this.selectedItem[32].value },
				{ name: 'enableSkybox', value: this.selectedItem[33].value },
				{ name: 'enableSunMoon', value: this.selectedItem[34].value },
				{ name: 'skyDoomFile', value: this.selectedItem[35].value },
				{ name: 'starFile', value: this.selectedItem[36].value },
				{ name: 'sunFile', value: this.selectedItem[37].value },
				{ name: 'alwaysFile', value: this.selectedItem[38].value },
				{ name: 'mistFile', value: this.selectedItem[39].value },
				{ name: 'cloudFile', value: this.selectedItem[40].value },
				{ name: 'alwaysFile', value: this.selectedItem[41].value },
				{ name: 'lightFile', value: this.selectedItem[42].value },
				{ name: 'gouraudEnabled', value: this.selectedItem[43].value },
				{ name: 'bloomScale', value: this.selectedItem[44].value },
				{ name: 'bloomBrightness', value: this.selectedItem[45].value },
				{ name: 'shading', value: [this.selectedItem[46].value[0], this.selectedItem[46].value[1], this.selectedItem[46].value[2], this.selectedItem[46].value[3]] },
				{ name: 'gouraudUnused', value: this.selectedItem[47].value },
				{ name: 'blur', value: this.selectedItem[48].value },
				{ name: 'flareEnabled', value: this.selectedItem[49].value },
				{ name: 'reduction', value: this.selectedItem[50].value },
				{ name: 'layers', value: layers },
				{ name: 'zoneSoundID', value: this.selectedItem[52].value },
				{ name: 'battleSoundID', value: this.selectedItem[53].value },
				{ name: 'otherUnused', value: this.selectedItem[54].value },
				{ name: 'characterLighting', value: [this.selectedItem[55].value[0], this.selectedItem[55].value[1], this.selectedItem[55].value[2]] }
			];
		}
		else {
			let entries: any[][] = [];
			for (let i = 0; i < 6; i++) {
				entries.push([false, 0, 0, 0, 0]);
			};

			this.editingItem = [
				{ name: 'id', value: null },
				{ name: "name", value: "" },
				{ name: "type", value: "SHOP" },
				{ name: "flags", value: 0 },
				{ name: "parentID", value: 0 },
				{ name: "startingSpot", value: 0 },
				{ name: "modelFile", value: "" },
				{ name: "nameFile", value: "" },
				{ name: "qmpFile", value: "" },
				{ name: "spotFile", value: "" },
				{ name: "enemyFile", value: "" },
				{ name: "npcFile", value: "" },
				{ name: "eventFile", value: "" },
				{ name: "unused1", value: "" },
				{ name: "unused2", value: "" },
				{ name: "groupFile", value: "" },
				{ name: "unused3", value: "" },
				{ name: "unused4", value: "" },
				{ name: "unused5", value: "" },
				{ name: "unused6", value: "" },
				{ name: "unused7", value: "" },
				{ name: "unused8", value: "" },
				{ name: "unused9", value: "" },
				{ name: "unused10", value: "" },
				{ name: "fogEnabled", value: false },
				{ name: 'dayColor', value: [0, 0, 0] },
				{ name: 'dayDistanceStart', value: 0 },
				{ name: 'dayDistanceEnd', value: 0 },
				{ name: 'nightColor', value: [0, 0, 0] },
				{ name: 'nightDistanceStart', value: 0 },
				{ name: 'nightDistanceEnd', value: 0 },
				{ name: 'maxDrawDistance', value: 0 },
				{ name: 'enableSkybox', value: false },
				{ name: 'enableSunMoon', value: false },
				{ name: 'skyDoomFile', value: "" },
				{ name: 'starFile', value: "" },
				{ name: 'sunFile', value: "" },
				{ name: 'alwaysFile', value: "" },
				{ name: 'mistFile', value: "" },
				{ name: 'cloudFile', value: "" },
				{ name: 'alwaysFile', value: "" },
				{ name: 'lightFile', value: "" },
				{ name: 'gouraudEnabled', value: false },
				{ name: 'bloomScale', value: 0 },
				{ name: 'bloomBrightness', value: 0 },
				{ name: 'shading', value: [0, 0, 0, 0] },
				{ name: 'gouraudUnused', value: 0 },
				{ name: 'blur', value: 0 },
				{ name: 'flareEnabled', value: false },
				{ name: 'reduction', value: 0 },
				{ name: 'layers', value: [] },
				{ name: 'zoneSoundID', value: 0 },
				{ name: 'battleSoundID', value: 0 },
				{ name: 'otherUnused', value: 0 },
				{ name: 'characterLighting', value: [0, 0, 0] }

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
			if (this.content[i].find((item: { name: string; }) => item.name === 'id').value === editId) {
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
			this.content.forEach((item: dataStructure) => {
				// Write the opening tag for the item
				xml += '  <object name="MiZoneData">\n';
				xml += `   	<member name="basic">\n`;
				xml += `     	<object name="MiZoneBasicData">\n`;
				xml += `     		<member name="id">${item[0].value}</member>\n`;
				xml += `    		<member name="name"><![CDATA[${item[1].value || ""}]]></member>\n`;
				xml += `            <member name="type">${item[2].value}</member>\n`;
				xml += `            <member name="flags">${item[3].value}</member>\n`;
				xml += `            <member name="parentID">${item[4].value}</member>\n`;
				xml += `            <member name="startingSpot">${item[5].value}</member>\n`;
				xml += `     	</object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="file">\n`;
				xml += `         <object name="MiZoneFileData">\n`;
				xml += `            <member name="modelFile"><![CDATA[${item[6].value || ''}]]></member>\n`;
				xml += `            <member name="nameFile"><![CDATA[${item[7].value || ''}]]></member>\n`;
				xml += `            <member name="qmpFile"><![CDATA[${item[8].value || ''}]]></member>\n`;
				xml += `            <member name="spotFile"><![CDATA[${item[9].value || ''}]]></member>\n`;
				xml += `            <member name="enemyFile"><![CDATA[${item[10].value || ''}]]></member>\n`;
				xml += `            <member name="npcFile"><![CDATA[${item[11].value || ''}]]></member>\n`;
				xml += `            <member name="eventFile"><![CDATA[${item[12].value || ''}]]></member>\n`;
				xml += `            <member name="unused1"><![CDATA[${item[13].value || ''}]]></member>\n`;
				xml += `            <member name="unused2"><![CDATA[${item[14].value || ''}]]></member>\n`;
				xml += `            <member name="groupFile"><![CDATA[${item[15].value || ''}]]></member>\n`;
				xml += `            <member name="unitFile"><![CDATA[${item[16].value || ''}]]></member>\n`;
				xml += `            <member name="unused3"><![CDATA[${item[17].value || ''}]]></member>\n`;
				xml += `            <member name="unused4"><![CDATA[${item[18].value || ''}]]></member>\n`;
				xml += `            <member name="unused5"><![CDATA[${item[19].value || ''}]]></member>\n`;
				xml += `            <member name="unused6"><![CDATA[${item[20].value || ''}]]></member>\n`;
				xml += `            <member name="unused7"><![CDATA[${item[21].value || ''}]]></member>\n`;
				xml += `            <member name="unused8"><![CDATA[${item[22].value || ''}]]></member>\n`;
				xml += `            <member name="unused9"><![CDATA[${item[23].value || ''}]]></member>\n`;
				xml += `            <member name="unused10"><![CDATA[${item[24].value || ''}]]></member>\n`;
				xml += `         </object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="fog">\n`;
				xml += `      <object name="MiZoneFogData">\n`;
				xml += `        <member name="enabled">${item[25].value}</member>\n`;
				xml += `        <member name="dayColor">\n`;
				for (let i = 0; i < item[26].value.length; i++) {
					xml += `      <element>${item[26].value[i]}</element>\n`;
				}
				xml += `        </member>\n`;
				xml += `        <member name="dayDistanceStart">${item[27].value}</member>\n`;
				xml += `        <member name="dayDistanceEnd">${item[28].value}</member>\n`;
				xml += `        <member name="nightColor">\n`;
				for (let i = 0; i < item[29].value.length; i++) {
					xml += `      <element>${item[29].value[i]}</element>\n`;
				}
				xml += `        </member>\n`;
				xml += `        <member name="nightDistanceStart">${item[30].value}</member>\n`;
				xml += `        <member name="nightDistanceEnd">${item[31].value}</member>\n`;
				xml += `         </object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="camera">\n`;
				xml += `      <object name="MiZoneCameraData">\n`;
				xml += `        <member name="maxDrawDistance">${item[32].value}</member>\n`;
				xml += `      </object>\n`
				xml += `    </member>\n`;
				xml += `    <member name="sky">\n`;
				xml += `      <object name="MiZoneSkyData">\n`;
				xml += `        <member name="enableSkybox">${item[33].value}</member>\n`;
				xml += `        <member name="enableSunMoon">${item[34].value}</member>\n`;
				xml += `        <member name="skyDoomFile"><![CDATA[${item[35].value || ''}]]></member>\n`;
				xml += `        <member name="starFile"><![CDATA[${item[36].value || ''}]]></member>\n`;
				xml += `        <member name="sunFile"><![CDATA[${item[37].value || ''}]]></member>\n`;
				xml += `        <member name="alwaysFile"><![CDATA[${item[38].value || ''}]]></member>\n`;
				xml += `        <member name="mistFile"><![CDATA[${item[39].value || ''}]]></member>\n`;
				xml += `        <member name="cloudFile"><![CDATA[${item[40].value || ''}]]></member>\n`;
				xml += `        <member name="always2File"><![CDATA[${item[41].value || ''}]]></member>\n`;
				xml += `        <member name="lightFile"><![CDATA[${item[42].value || ''}]]></member>\n`;
				xml += `      </object>\n`
				xml += `    </member>\n`;
				xml += `    <member name="gouraud">\n`;
				xml += `      <object name="MiZoneGouraudData">\n`;
				xml += `        <member name="enabled">${item[43].value}</member>\n`;
				xml += `        <member name="bloomScale">${item[44].value}</member>\n`;
				xml += `        <member name="bloomBrightness">${item[45].value}</member>\n`;
				xml += `        <member name="shading">\n`;
				for (let i = 0; i < item[46].value.length; i++) {
					xml += `      <element>${item[46].value[i]}</element>\n`;
				}
				xml += `        </member>\n`;
				xml += `        <member name="unused">${item[47].value}</member>\n`;
				xml += `        <member name="blur">${item[48].value}</member>\n`;
				xml += `      </object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="flare">\n`;
				xml += `      <object name="MiZoneLensFlareData">\n`;
				xml += `        <member name="enabled">${item[49].value}</member>\n`;
				xml += `        <member name="reduction">${item[50].value}</member>\n`;
				xml += `        <member name="layers">\n`;
				for (let i = 0; i < item[51].value.length; i++) {
					xml += `      <element>\n`;
					xml += `      	<object name="MiZoneLensFlareLayerData">\n`;
					xml += `              <member name="enabled">${item[51].value[i][0]}</member>\n`;
					xml += `              <member name="distance">${item[51].value[i][1]}</member>\n`;
					xml += `              <member name="outerScale">${item[51].value[i][2]}</member>\n`;
					xml += `              <member name="innerScale">${item[51].value[i][3]}</member>\n`;
					xml += `              <member name="opacity">${item[51].value[i][4]}</member>\n`;
					xml += `      	</object>\n`;
					xml += `      </element>\n`;
				}
				xml += `        </member>\n`;
				xml += `      </object>\n`
				xml += `    </member>\n`
				xml += `    <member name="bgm">\n`;
				xml += `      <object name="MiZoneBGMData">\n`;
				xml += `        <member name="zoneSoundID">${item[52].value}</member>\n`;
				xml += `        <member name="battleSoundID">${item[53].value}</member>\n`;
				xml += `      </object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="other">\n`;
				xml += `      <object name="MiZoneOtherData">\n`;
				xml += `        <member name="unused">${item[54].value}</member>\n`;
				xml += `        <member name="characterLighting">\n`;
				for (let i = 0; i < item[55].value.length; i++) {
					xml += `      <element>${item[55].value[i]}</element>\n`;
				}
				xml += `        </member>\n`;
				xml += `      </object>\n`;
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
