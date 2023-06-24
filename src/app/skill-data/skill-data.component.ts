import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type dataStructure = [
	{ name: 'id', value: number },
	{ name: 'mainCategory', value: number },
	{ name: 'subCategory', value: number },
	{ name: 'affinity', value: number },
	{ name: 'correctTbl', value: any[][] },
	{ name: 'dependencyType', value: string },
	{ name: 'actionType', value: string },
	{ name: 'combatSkill', value: boolean },
	{ name: 'defensible', value: number },
	{ name: 'family', value: string },
	{ name: 'activationType', value: string },
	{ name: 'basic7', value: number },
	{ name: 'cooldownID', value: number },
	{ name: 'restriction1', value: number },
	{ name: 'weaponType', value: string },
	{ name: 'LNC', value: string },
	{ name: 'digitizeRestricted', value: boolean },
	{ name: 'digitizeWeaponType', value: string },
	{ name: 'costs', value: any[][] },
	{ name: 'cooldownTime', value: number },
	{ name: 'activeMPDrain', value: number },
	{ name: 'condition3', value: number },
	{ name: 'chargeTime', value: number },
	{ name: 'useCount', value: number },
	{ name: 'adjustRestrictions', value: number },
	{ name: 'damageCancel', value: boolean },
	{ name: 'knockbackCancel', value: boolean },
	{ name: 'autoCancelTime', value: number },
	{ name: 'range', value: number },
	{ name: 'type', value: string },
	{ name: 'completeDelay', value: number },
	{ name: 'projectileSpeed', value: number },
	{ name: 'hitDelay', value: number },
	{ name: 'stiffness', value: number },
	{ name: 'shotInterruptible', value: boolean },
	{ name: 'areaType', value: string },
	{ name: 'validType', value: string },
	{ name: 'aoeRange', value: number },
	{ name: 'aoeLineWidth', value: number },
	{ name: 'formula', value: string },
	{ name: 'aoeReduce', value: boolean },
	{ name: 'aoeReduction', value: number },
	{ name: 'modifier1', value: number },
	{ name: 'modifier2', value: number },
	{ name: 'HPDrainPercent', value: number },
	{ name: 'MPDrainPercent', value: number },
	{ name: 'successAffability', value: number },
	{ name: 'failureAffability', value: number },
	{ name: 'successFear', value: number },
	{ name: 'failureFear', value: number },
	{ name: 'weapon', value: number },
	{ name: 'armor', value: number },
	{ name: 'knockBackType', value: number },
	{ name: 'modifier', value: number },
	{ name: 'distance', value: number },
	{ name: 'hitStopTime', value: number },
	{ name: 'addStatuses', value: any[][] },
	{ name: 'functionID', value: number },
	{ name: 'inheritanceRestriction', value: number },
	{ name: 'inheritanceModifier', value: number },
	{ name: 'expertiseGrowth', value: any[][] },
	{ name: 'charastic', value: number[] },
	{ name: 'specialParams', value: number[] },
	{ name: 'PVPRestriction', value: string },
	{ name: 'PVPRate', value: number }
];
@Component({
	selector: 'app-skill-data',
	templateUrl: './skill-data.component.html',
	styleUrls: ['./skill-data.component.scss']
})
export class SkillDataComponent {
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
			const depStr = String(item[5].value).toLowerCase();
			const actionStr = String(item[6].value).toLowerCase();
			const familyStr = String(item[9].value).toLowerCase();
			return idStr.includes(searchStr) || depStr.includes(searchStr) || actionStr.includes(searchStr) || familyStr.includes(searchStr);
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

				let correctTable: any[][] = [];
				if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element) {
					if (item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.length) {
						item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.forEach((m: any) => {
							correctTable.push([m.object.member[0]["#text"],
							m.object.member[1]["#text"],
							m.object.member[2]["#text"]]);
						})
					}
					else
						correctTable.push([item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[0]["#text"],
						item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[1]["#text"],
						item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "correctTbl").element.object.member[2]["#text"]]);
				}

				let expertGrowthTable: any[][] = [];
				if (item.member.find((m: any) => m["@name"] === "expertGrowth").element) {
					if (item.member.find((m: any) => m["@name"] === "expertGrowth").element.length) {
						item.member.find((m: any) => m["@name"] === "expertGrowth").element.forEach((m: any) => {
							expertGrowthTable.push([m.object.member[0]["#text"],
							m.object.member[1]["#text"]]);
						})
					}
					else
						expertGrowthTable.push([item.member.find((m: any) => m["@name"] === "expertGrowth").element.object.member[0]["#text"],
						item.member.find((m: any) => m["@name"] === "expertGrowth").element.object.member[1]["#text"],
						]);
				}

				let addStatusTable: any[][] = [];
				if (item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element) {
					if (item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.length) {
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.forEach((m: any) => {
							addStatusTable.push([m.object.member[0]["#text"],
							m.object.member[1]["#text"],
							m.object.member[2]["#text"],
							m.object.member[3]["#text"],
							m.object.member[4]["#text"], m.object.member[5]["#text"],
							]);
						})
					}
					else
						addStatusTable.push([item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[0]["#text"],
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[1]["#text"],
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[2]["#text"],
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[3]["#text"],
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[4]["#text"],
						item.member.find((m: any) => m["@name"] === "damage").object.member.find((m: any) => m["@name"] === "addStatuses").element.object.member[5]["#text"]]);

				}


				let costsTable: any[][] = [];
				if (item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element) {
					if (item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.length) {
						item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.forEach((m: any) => {
							costsTable.push([m.object.member[0]["#text"],
							m.object.member[1]["#text"],
							m.object.member[2]["#text"],
							m.object.member[3]["#text"]]);
						})
					}
					else
						costsTable.push([item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.object.member[0]["#text"],
						item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.object.member[1]["#text"],
						item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.object.member[2]["#text"]
							, item.member.find((m: any) => m["@name"] === "condition").object.member.find((m: any) => m["@name"] === "costs").element.object.member[3]["#text"]]);
				}

				let charastic: any[] = [];
				item.member[10].object.member.element.forEach((m: any) => {
					charastic.push(m);
				})

				let special: any[] = [];
				item.member[11].object.member.element.forEach((m: any) => {
					special.push(m);
				})
				return [
					{ name: "id", value: item.member[0].object.member[0]["#text"] },
					{ name: "mainCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "mainCategory")["#text"] },
					{ name: "subCategory", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "category").object.member.find((m: any) => m["@name"] === "subCategory")["#text"] },
					{ name: "affinity", value: item.member.find((m: any) => m["@name"] === "common").object.member.find((m: any) => m["@name"] === "affinity")["#text"] },
					{ name: 'correctTbl', value: correctTable },
					{ name: "dependencyType", value: item.member[1].object.member[0]["#text"] },
					{ name: "actionType", value: item.member[1].object.member[1]["#text"] },
					{ name: "combatSkill", value: item.member[1].object.member[2]["#text"] },
					{ name: "defensible", value: item.member[1].object.member[3]["#text"] },
					{ name: "family", value: item.member[1].object.member[4]["#text"] },
					{ name: "activationType", value: item.member[1].object.member[5]["#text"] },
					{ name: "basic7", value: item.member[1].object.member[6]["#text"] },
					{ name: "cooldownID", value: item.member[1].object.member[7]["#text"] },
					{ name: "restriction1", value: item.member[2].object.member[0].object.member[0]["#text"] },
					{ name: "weaponType", value: item.member[2].object.member[0].object.member[1]["#text"] },
					{ name: "LNC", value: item.member[2].object.member[0].object.member[2]["#text"] },
					{ name: "DigitizeRestricted", value: item.member[2].object.member[0].object.member[3]["#text"] },
					{ name: "DigitizeWeaponType", value: item.member[2].object.member[0].object.member[4]["#text"] },
					{ name: 'costs', value: costsTable },
					{ name: "cooldownTime", value: item.member[2].object.member[2]["#text"] },
					{ name: "activeMPDrain", value: item.member[2].object.member[3]["#text"] },
					{ name: "condition3", value: item.member[2].object.member[4]["#text"] },
					{ name: "chargeTime", value: item.member[3].object.member[0].object.member[0]["#text"] },
					{ name: "useCount", value: item.member[3].object.member[0].object.member[1]["#text"] },
					{ name: "adjustRestrictions", value: item.member[3].object.member[0].object.member[2]["#text"] },
					{ name: "damageCancel", value: item.member[3].object.member[1].object.member[0]["#text"] },
					{ name: "knockbackCancel", value: item.member[3].object.member[1].object.member[1]["#text"] },
					{ name: "autoCancelTime", value: item.member[3].object.member[1].object.member[2]["#text"] },
					{ name: "range", value: item.member[4].object.member[0]["#text"] },
					{ name: "type", value: item.member[4].object.member[1]["#text"] },
					{ name: "completeDelay", value: item.member[5].object.member[0]["#text"] },
					{ name: "projectileSpeed", value: item.member[5].object.member[1]["#text"] },
					{ name: "hitDelay", value: item.member[5].object.member[2]["#text"] },
					{ name: "stiffness", value: item.member[5].object.member[3]["#text"] },
					{ name: "shotInterruptible", value: item.member[5].object.member[4]["#text"] },
					{ name: "areaType", value: item.member[6].object.member[0]["#text"] },
					{ name: "validType", value: item.member[6].object.member[1]["#text"] },
					{ name: "aoeRange", value: item.member[6].object.member[2]["#text"] },
					{ name: "aoeLineWidth", value: item.member[6].object.member[3]["#text"] },
					{ name: "formula", value: item.member[7].object.member[0].object.member[0]["#text"] },
					{ name: "aoeReduce", value: item.member[7].object.member[0].object.member[1]["#text"] },
					{ name: "aoeReduction", value: item.member[7].object.member[0].object.member[2]["#text"] },
					{ name: "modifier1", value: item.member[7].object.member[0].object.member[3]["#text"] },
					{ name: "modifier2", value: item.member[7].object.member[0].object.member[4]["#text"] },
					{ name: "HPDrainPercent", value: item.member[7].object.member[0].object.member[5]["#text"] },
					{ name: "MPDrainPercent", value: item.member[7].object.member[0].object.member[6]["#text"] },
					{ name: "successAffability", value: item.member[7].object.member[1].object.member[0]["#text"] },
					{ name: "failureAffability", value: item.member[7].object.member[1].object.member[1]["#text"] },
					{ name: "successFear", value: item.member[7].object.member[1].object.member[2]["#text"] },
					{ name: "failureFear", value: item.member[7].object.member[1].object.member[3]["#text"] },
					{ name: "weapon", value: item.member[7].object.member[2].object.member[0]["#text"] },
					{ name: "armor", value: item.member[7].object.member[2].object.member[1]["#text"] },
					{ name: "knockBackType", value: item.member[7].object.member[3].object.member[0]["#text"] },
					{ name: "modifier", value: item.member[7].object.member[3].object.member[1]["#text"] },
					{ name: "distance", value: item.member[7].object.member[3].object.member[2]["#text"] },
					{ name: "hitStopTime", value: item.member[7].object.member[4]["#text"] },
					{ name: "addStatuses", value: addStatusTable },
					{ name: "functionID", value: item.member[7].object.member[6]["#text"] },
					{ name: "inheritanceRestriction", value: item.member[8].object.member[0]["#text"] },
					{ name: "inheritanceModifier", value: item.member[8].object.member[1]["#text"] },
					{ name: "expertiseGrowth", value: expertGrowthTable },
					{ name: 'charastic', value: charastic },
					{ name: 'specialParams', value: special },
					{ name: 'PVPRestriction', value: item.member[12].object.member[0]["#text"] },
					{ name: 'PVPRate', value: item.member[12].object.member[1]["#text"] }
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

			let correctTable: any[][] = [];
			this.selectedItem[4].value.forEach((m: any) => {
				correctTable.push([m[0], m[1], m[2]]);
			})


			let expertGrowthTable: any[][] = [];
			this.selectedItem[60].value.forEach((m: any) => {
				expertGrowthTable.push([m[0],
				m[1]]);
			})

			let addStatusTable: any[][] = [];
			this.selectedItem[56].value.forEach((m: any) => {
				addStatusTable.push([m[0],
				m[1],
				m[2],
				m[3],
				m[4], m[5]
				]);
			})

			let costsTable: any[][] = [];
			this.selectedItem[18].value.forEach((m: any) => {
				costsTable.push([m[0],
				m[1],
				m[2],
				m[3]]);
			})

			let charastic: any[] = [];
			this.selectedItem[61].value.forEach((m: any) => {
				charastic.push(m);
			})

			let special: any[] = [];
			this.selectedItem[62].value.forEach((m: any) => {
				special.push(m);
			})


			this.editingItem = [
				{ name: 'id', value: this.selectedItem[0].value },
				{ name: "mainCategory", value: this.selectedItem[1].value },
				{ name: "subCategory", value: this.selectedItem[2].value },
				{ name: "affinity", value: this.selectedItem[3].value },
				{ name: 'correctTbl', value: correctTable },
				{ name: "dependencyType", value: this.selectedItem[5].value },
				{ name: "actionType", value: this.selectedItem[6].value },
				{ name: "combatSkill", value: this.selectedItem[7].value },
				{ name: "defensible", value: this.selectedItem[8].value },
				{ name: "family", value: this.selectedItem[9].value },
				{ name: "activationType", value: this.selectedItem[10].value },
				{ name: "basic7", value: this.selectedItem[11].value },
				{ name: "cooldownID", value: this.selectedItem[12].value },
				{ name: "restriction1", value: this.selectedItem[13].value },
				{ name: "weaponType", value: this.selectedItem[14].value },
				{ name: "LNC", value: this.selectedItem[15].value },
				{ name: "DigitizeRestricted", value: this.selectedItem[16].value },
				{ name: "DigitizeWeaponType", value: this.selectedItem[17].value },
				{ name: 'costs', value: costsTable },
				{ name: "cooldownTime", value: this.selectedItem[19].value },
				{ name: "activeMPDrain", value: this.selectedItem[20].value },
				{ name: "condition3", value: this.selectedItem[21].value },
				{ name: "chargeTime", value: this.selectedItem[22].value },
				{ name: "useCount", value: this.selectedItem[23].value },
				{ name: "adjustRestrictions", value: this.selectedItem[24].value },
				{ name: "damageCancel", value: this.selectedItem[25].value },
				{ name: "knockbackCancel", value: this.selectedItem[26].value },
				{ name: "autoCancelTime", value: this.selectedItem[27].value },
				{ name: "range", value: this.selectedItem[28].value },
				{ name: "type", value: this.selectedItem[29].value },
				{ name: "completeDelay", value: this.selectedItem[30].value },
				{ name: "projectileSpeed", value: this.selectedItem[31].value },
				{ name: "hitDelay", value: this.selectedItem[32].value },
				{ name: "stiffness", value: this.selectedItem[33].value },
				{ name: "shotInterruptible", value: this.selectedItem[34].value },
				{ name: "areaType", value: this.selectedItem[35].value },
				{ name: "validType", value: this.selectedItem[36].value },
				{ name: "aoeRange", value: this.selectedItem[37].value },
				{ name: "aoeLineWidth", value: this.selectedItem[38].value },
				{ name: "formula", value: this.selectedItem[39].value },
				{ name: "aoeReduce", value: this.selectedItem[40].value },
				{ name: "aoeReduction", value: this.selectedItem[41].value },
				{ name: "modifier1", value: this.selectedItem[42].value },
				{ name: "modifier2", value: this.selectedItem[43].value },
				{ name: "HPDrainPercent", value: this.selectedItem[44].value },
				{ name: "MPDrainPercent", value: this.selectedItem[45].value },
				{ name: "successAffability", value: this.selectedItem[46].value },
				{ name: "failureAffability", value: this.selectedItem[47].value },
				{ name: "successFear", value: this.selectedItem[48].value },
				{ name: "failureFear", value: this.selectedItem[49].value },
				{ name: "weapon", value: this.selectedItem[50].value },
				{ name: "armor", value: this.selectedItem[51].value },
				{ name: "knockBackType", value: this.selectedItem[52].value },
				{ name: "modifier", value: this.selectedItem[53].value },
				{ name: "distance", value: this.selectedItem[54].value },
				{ name: "hitStopTime", value: this.selectedItem[55].value },
				{ name: "addStatuses", value: addStatusTable },
				{ name: "functionID", value: this.selectedItem[57].value },
				{ name: "inheritanceRestriction", value: this.selectedItem[58].value },
				{ name: "inheritanceModifier", value: this.selectedItem[59].value },
				{ name: "expertiseGrowth", value: expertGrowthTable },
				{ name: 'charastic', value: charastic },
				{ name: 'specialParams', value: special },
				{ name: 'PVPRestriction', value: this.selectedItem[63].value },
				{ name: 'PVPRate', value: this.selectedItem[64].value }
			];
		} else {
			let correctTable: any[][] = [];
			//correctTable.push(['STR', 0, 0]);

			let expertGrowthTable: any[][] = [];
			//expertGrowthTable.push([0,0]);

			let addStatusTable: any[][] = [];
			//addStatusTable.push([0,0,0,0,true, 100]);


			let costsTable: any[][] = [];
			//costsTable.push(['MP', 'NUMERIC', 0, 0]);


			let charastic: any[] = [];
			let special: any[] = [];

			for (let i = 0; i < 4; i++) {
				special.push(0);
				charastic.push(0);
			};

			this.editingItem = [
				{ name: 'id', value: null },
				{ name: "mainCategory", value: 0 },
				{ name: "subCategory", value: 0 },
				{ name: "affinity", value: 0 },
				{ name: 'correctTbl', value: correctTable },
				{ name: "dependencyType", value: 'NONE' },
				{ name: "actionType", value: 'ATTACK' },
				{ name: "combatSkill", value: false },
				{ name: "defensible", value: 0 },
				{ name: "family", value: 'SPECIAL' },
				{ name: "activationType", value: 'ON_USE' },
				{ name: "basic7", value: 1 },
				{ name: "cooldownID", value: 0 },
				{ name: "restriction1", value: 0 },
				{ name: "weaponType", value: 'NONE' },
				{ name: "LNC", value: 'ALL' },
				{ name: "DigitizeRestricted", value: true },
				{ name: "DigitizeWeaponType", value: 'NONE' },
				{ name: 'costs', value: costsTable },
				{ name: "cooldownTime", value: 0 },
				{ name: "activeMPDrain", value: 0 },
				{ name: "condition3", value: 0 },
				{ name: "chargeTime", value: 0 },
				{ name: "useCount", value: 1 },
				{ name: "adjustRestrictions", value: 0 },
				{ name: "damageCancel", value: false },
				{ name: "knockbackCancel", value: false },
				{ name: "autoCancelTime", value: 0 },
				{ name: "range", value: 0 },
				{ name: "type", value: 'NONE' },
				{ name: "completeDelay", value: 0 },
				{ name: "projectileSpeed", value: 0 },
				{ name: "hitDelay", value: 0 },
				{ name: "stiffness", value: 0 },
				{ name: "shotInterruptible", value: false },
				{ name: "areaType", value: 'NONE' },
				{ name: "validType", value: 'ENEMY' },
				{ name: "aoeRange", value: 0 },
				{ name: "aoeLineWidth", value: 0 },
				{ name: "formula", value: 'NONE' },
				{ name: "aoeReduce", value: false },
				{ name: "aoeReduction", value: 0 },
				{ name: "modifier1", value: 0 },
				{ name: "modifier2", value: 0 },
				{ name: "HPDrainPercent", value: 0 },
				{ name: "MPDrainPercent", value: 0 },
				{ name: "successAffability", value: 0 },
				{ name: "failureAffability", value: 0 },
				{ name: "successFear", value: 0 },
				{ name: "failureFear", value: 0 },
				{ name: "weapon", value: 0 },
				{ name: "armor", value: 0 },
				{ name: "knockBackType", value: 0 },
				{ name: "modifier", value: 0 },
				{ name: "distance", value: 0 },
				{ name: "hitStopTime", value: 0 },
				{ name: "addStatuses", value: addStatusTable },
				{ name: "functionID", value: 0 },
				{ name: "inheritanceRestriction", value: 0 },
				{ name: "inheritanceModifier", value: 0 },
				{ name: "expertiseGrowth", value: expertGrowthTable },
				{ name: 'charastic', value: charastic },
				{ name: 'specialParams', value: special },
				{ name: 'PVPRestriction', value: 'NONE' },
				{ name: 'PVPRate', value: 100 }

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

	removeExpertGrowth(i: number) {
		this.editingItem[60].value.splice(i, 1);
		this.cd.detectChanges();

	}

	addExpertGrowth() {
		this.editingItem[60].value.push([0, 0, 0, 0, true, 100]);
		this.cd.detectChanges();
	}

	removeStatus(i: number) {
		this.editingItem[56].value.splice(i, 1);
		this.cd.detectChanges();

	}

	addStatus() {
		this.editingItem[56].value.push([0, 0, 0, 0, true, 100]);
		this.cd.detectChanges();
	}

	removeCorrect(i: number) {
		this.editingItem[4].value.splice(i, 1);
		this.cd.detectChanges();

	}

	addCorrect() {
		this.editingItem[4].value.push(['STR', 0, 0]);
		this.cd.detectChanges();
	}

	removeCost(i: number) {
		this.editingItem[18].value.splice(i, 1);
		this.cd.detectChanges();

	}

	addCost() {
		this.editingItem[18].value.push(['MP', 'NUMERIC', 0, 0]);
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
				xml += '  <object name="MiSkillData">\n';
				xml += `   	<member name="common">\n`;
				xml += `     	<object name="MiSkillItemStatusCommonData">\n`;
				xml += `     		<member name="id">${item[0].value}</member>\n`;
				xml += `				<member name="category">\n`;
				xml += `				  <object name="MiCategoryData">\n`;
				xml += `            <member name="mainCategory">${item[1].value}</member>\n`;
				xml += `            <member name="subCategory">${item[2].value}</member>\n`;
				xml += `				  </object>\n`;
				xml += `				</member>\n`;
				xml += `        <member name="affinity">${item[3].value}</member>\n`;
				if (item[4].value.length > 0) {
					xml += `        <member name="correctTbl">\n`;
					for (let i = 0; i < item[4].value.length; i++) {
						xml += `          <element>\n`;
						xml += `            <object name="MiCorrectTbl">\n`;
						xml += `              <member name="ID">${item[4].value[i][0]}</member>\n`;
						xml += `              <member name="Type">${item[4].value[i][1]}</member>\n`;
						xml += `              <member name="Value">${item[4].value[i][2]}</member>\n`;
						xml += `            </object>\n`;
						xml += `          </element>\n`;
					}
					xml += `        </member>\n`;
				}
				else xml += `        <member name="correctTbl"/>\n`;

				xml += `			</object>\n`;
				xml += '		</member>\n';
				xml += `    <member name="basic">\n`;
				xml += `         <object name="MiSkillBasicData">\n`;
				xml += `         	<member name="dependencyType">${item[5].value}</member>\n`;
				xml += `            <member name="actionType">${item[6].value}</member>\n`;
				xml += `            <member name="combatSkill">${item[7].value}</member>\n`;
				xml += `            <member name="defensible">${item[8].value}</member>\n`;
				xml += `            <member name="family">${item[9].value}</member>\n`;
				xml += `            <member name="activationType">${item[10].value}</member>\n`;
				xml += `            <member name="basic7">${item[11].value}</member>\n`;
				xml += `            <member name="cooldownID">${item[12].value}</member>\n`;
				xml += `         </object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="condition">\n`;
				xml += `      	<object name="MiConditionData">\n`;
				xml += `        	<member name="restriction">\n`;
				xml += `      			<object name="MiRestrictionData">\n`;
				xml += `       				<member name="restriction1">${item[13].value}</member>\n`;
				xml += `                	<member name="weaponType">${item[14].value}</member>\n`;
				xml += `                	<member name="LNC">${item[15].value}</member>\n`;
				xml += `               		<member name="digitizeRestricted">${item[16].value}</member>\n`;
				xml += `           			<member name="digitizeWeaponType">${item[17].value}</member>\n`;
				xml += `            	</object>\n`;
				xml += `        	</member>\n`;
				if (item[18].value.length > 0) {
					xml += `       		<member name="costs">\n`;
					for (let i = 0; i < item[18].value.length; i++) {
						xml += `       			<element>\n`;
						xml += `       				<object name="MiCostTbl">\n`;
						xml += `       					<member name="type">${item[18].value[i][0]}</member>\n`;
						xml += `              			<member name="numType">${item[18].value[i][1]}</member>\n`;
						xml += `              			<member name="cost">${item[18].value[i][2]}</member>\n`;
						xml += `              			<member name="item">${item[18].value[i][3]}</member>\n`;
						xml += `            		</object>\n`;
						xml += `          		</element>\n`;
					}
					xml += `        </member>\n`;
				}
				else xml += `        <member name="costs"/>\n`;
				xml += `        	 <member name="cooldownTime">${item[19].value}</member>\n`;
				xml += `       		 <member name="activeMPDrain">${item[20].value}</member>\n`;
				xml += `        	 <member name="condition3">${item[21].value}</member>\n`;
				xml += `		</object>\n`;
				xml += `	</member>\n`;
				xml += `    <member name="cast">\n`;
				xml += `		<object name="MiCastData">\n`;
				xml += `			<member name="basic">\n`;
				xml += `                <object name="MiCastBasicData">\n`;
				xml += `                	<member name="chargeTime">${item[22].value}</member>\n`;
				xml += `                	<member name="useCount">${item[23].value}</member>\n`;
				xml += `                	<member name="adjustRestrictions">${item[24].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`;
				xml += `            <member name="cancel">\n`;
				xml += `                <object name="MiCastCancelData">\n`;
				xml += `                	<member name="damageCancel">${item[25].value}</member>\n`;
				xml += `                	<member name="knockbackCancel">${item[26].value}</member>\n`;
				xml += `                	<member name="autoCancelTime">${item[27].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="target">\n`;
				xml += `		<object name="MiTargetData">\n`;
				xml += `			<member name="range">${item[28].value}</member>\n`;
				xml += `            <member name="type">${item[29].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="discharge">\n`;
				xml += `		<object name="MiDischargeData">\n`;
				xml += `			<member name="completeDelay">${item[30].value}</member>\n`;
				xml += `            <member name="projectileSpeed">${item[31].value}</member>\n`;
				xml += `			<member name="hitDelay">${item[32].value}</member>\n`;
				xml += `            <member name="stiffness">${item[33].value}</member>\n`;
				xml += `			<member name="shotInterruptible">${item[34].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="range">\n`;
				xml += `		<object name="MiEffectiveRangeData">\n`;
				xml += `			<member name="areaType">${item[35].value}</member>\n`;
				xml += `            <member name="validType">${item[36].value}</member>\n`;
				xml += `			<member name="aoeRange">${item[37].value}</member>\n`;
				xml += `            <member name="aoeLineWidth">${item[38].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="damage">\n`;
				xml += `		<object name="MiDamageData">\n`;
				xml += `			<member name="battleDamage">\n`;
				xml += `                <object name="MiBattleDamageData">\n`;
				xml += `                	<member name="formula">${item[39].value}</member>\n`;
				xml += `                	<member name="aoeReduce">${item[40].value}</member>\n`;
				xml += `                	<member name="aoeReduction">${item[41].value}</member>\n`;
				xml += `                	<member name="modifier1">${item[42].value}</member>\n`;
				xml += `                	<member name="modifier2">${item[43].value}</member>\n`;
				xml += `                	<member name="HPDrainPercent">${item[44].value}</member>\n`;
				xml += `                	<member name="MPDrainPercent">${item[45].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`;
				xml += `            <member name="negotiationDamage">\n`;
				xml += `                <object name="MiNegotiationDamageData">\n`;
				xml += `                	<member name="successAffability">${item[46].value}</member>\n`;
				xml += `                	<member name="failureAffability">${item[47].value}</member>\n`;
				xml += `                	<member name="successFear">${item[48].value}</member>\n`;
				xml += `                    <member name="failureFear">${item[49].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`;
				xml += `            <member name="breakData">\n`;
				xml += `                <object name="MiBreakData">\n`;
				xml += `                	<member name="weapon">${item[50].value}</member>\n`;
				xml += `                	<member name="armor">${item[51].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`;
				xml += `            <member name="knockBack">\n`;
				xml += `                <object name="MiKnockBackData">\n`;
				xml += `                	<member name="knockBackType">${item[52].value}</member>\n`;
				xml += `                	<member name="modifier">${item[53].value}</member>\n`;
				xml += `                	<member name="distance">${item[54].value}</member>\n`;
				xml += `                </object>\n`;
				xml += `            </member>\n`
				xml += `            <member name="hitStopTime">${item[55].value}</member>\n`;
				xml += `        	<member name="addStatuses">\n`;
				for (let i = 0; i < item[56].value.length; i++) {
					xml += `      		<element>\n`;
					xml += `                <object name="MiAddStatusTbl">\n`;
					xml += `                    <member name="statusID">${item[56].value[i][0]}</member>\n`;
					xml += `                    <member name="maxStack">${item[56].value[i][1]}</member>\n`;
					xml += `                    <member name="minStack">${item[56].value[i][2]}</member>\n`;
					xml += `                    <member name="onKnockback">${item[56].value[i][3]}</member>\n`;
					xml += `                    <member name="isReplace">${item[56].value[i][4]}</member>\n`;
					xml += `                    <member name="successRate">${item[56].value[i][5]}</member>\n`;
					xml += `                </object>\n`;
					xml += `      		</element>\n`;
				}
				xml += `        	</member>\n`;
				xml += `            <member name="functionID">${item[57].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="acquisition">\n`;
				xml += `		<object name="MiAcquisitionData">\n`;
				xml += `			<member name="inheritanceRestriction">${item[58].value}</member>\n`;
				xml += `            <member name="inheritanceModifier">${item[59].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="expertGrowth">\n`;
				for (let i = 0; i < item[60].value.length; i++) {
					xml += `      		<element>\n`;
					xml += `                <object name="MiExpertGrowthTbl">\n`;
					xml += `                    <member name="expertiseID">${item[60].value[i][0]}</member>\n`;
					xml += `                    <member name="growthRate">${item[60].value[i][1]}</member>\n`;
					xml += `                </object>\n`;
					xml += `      		</element>\n`;
				}
				xml += `	</member>\n`;
				xml += `    <member name="charastic">\n`;
				xml += `    	<object name="MiSkillCharasticData">\n`;
				xml += `            <member name="charastic">\n`;
				for (let i = 0; i < item[61].value.length; i++) {
					xml += `      			<element>${item[61].value[i]}</element>\n`;
				}
				xml += `        	</member>\n`;
				xml += `    	</object>\n`;
				xml += `    </member>\n`;

				xml += `    <member name="special">\n`;
				xml += `    	<object name="MiSkillSpecialParams">\n`;
				xml += `            <member name="specialParams">\n`;
				for (let i = 0; i < item[62].value.length; i++) {
					xml += `      			<element>${item[62].value[i]}</element>\n`;
				}
				xml += `        	</member>\n`;
				xml += `    	</object>\n`;
				xml += `    </member>\n`;
				xml += `    <member name="pvp">\n`;
				xml += `    	<object name="MiSkillPvPData">\n`;
				xml += `        	<member name="PVPRestriction">${item[63].value}</member>\n`;
				xml += `            <member name="PVPRate">${item[64].value}</member>\n`;
				xml += `        </object>\n`;
				xml += `	</member>\n`;
				xml += `  </object>\n`;
			});
			xml += '</objects>';
			if (saveMode === 'xml')
				this.saveXmlFile.emit(xml);
			else this.encryptFile.emit(xml);
		}
	}
}

