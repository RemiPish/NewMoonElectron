import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type groupEntry = [
	{ name: 'barterID', value: number },
	{ name: 'flags', value: number }
];

export type npcBarterGroupDataStructure = [
	{ name: 'ID', value: number },
	{ name: 'displayMode', value: number },
	{ name: 'groupEntryList', value: groupEntry[] }
];

@Component({
	selector: 'app-npc-barter-group-data',
	templateUrl: './npc-barter-group-data.component.html',
	styleUrls: ['./npc-barter-group-data.component.scss']
})
export class NpcBarterGroupDataComponent {

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
		this.content = await this.parseNpcBarterGroupData(this.contentJson);
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
			const barterIdList: any[] = [];
			item[2].value.forEach((elt: any[]) => {
				barterIdList.push(elt[0].value)
			})
			return idStr.includes(searchStr) || barterIdList.includes(searchStr);
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

	async parseNpcBarterGroupData(json: string) {
		try {
			const parsed = JSON.parse(json);
			const items = await Promise.all(parsed.map(async (item: any) => {
				let entryList: any[] = [];
				if (item.member[2].element.length) {
					item.member[2].element.forEach((m: any) => {
						entryList.push([
							{ name: "barterID", value: m.object.member.find((n: any) => n["@name"] === "barterID")["#text"] },
							{ name: "flags", value: m.object.member.find((n: any) => n["@name"] === "flags")["#text"] }
						])
					});
				}
				else {
					entryList.push([
						{ name: "barterID", value: item.member[2].element.object.member.find((n: any) => n["@name"] === "barterID")["#text"] },
						{ name: "flags", value: item.member[2].element.object.member.find((n: any) => n["@name"] === "flags")["#text"] }
					])
				}

				return [
					{ name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
					{ name: "displayMode", value: item.member.find((m: any) => m["@name"] === "displayMode")["#text"] },
					{ name: 'groupEntryList', value: entryList }
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
			let entries: { name: string; value: any; }[][] = [];

			this.selectedItem[2].value.forEach((elt: any) => {
				entries.push([{ name: 'barterID', value: elt[0].value },
				{ name: 'flags', value: elt[1].value }])
			})


			this.editingItem = [
				{ name: 'ID', value: this.selectedItem[0].value },
				{ name: 'displayMode', value: this.selectedItem[1].value },
				{ name: 'groupEntryList', value: entries },
			];
		}
		else {
			this.editingItem = [
				{ name: 'ID', value: null },
				{ name: 'displayMode', value: 0 },
				{
					name: 'groupEntryList', value: [[{ name: 'barterID', value: 0 },
					{ name: 'flags', value: 0 }]]
				},
			];
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

	addEntry() {
		this.editingItem[2].value.push([
			{ name: 'barterID', value: 0 },
			{ name: 'flags', value: 0 }]);
		this.cd.detectChanges();
	}

	removeEntry(i: number) {
		this.editingItem[2].value.splice(i, 1);
		this.cd.detectChanges();
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
				xml += '	<object name="MiNPCBarterGroupData">\n';
				xml += `    	<member name="ID">${item[0].value}</member>\n`;
				xml += `    	<member name="displayMode">${item[1].value}</member>\n`;
				xml += `    	<member name="entries">\n`;
				for (let i = 0; i < item[2].value.length; i++) {
					xml += `    	<element>\n`;
					xml += `        	<object name="MiNPCBarterGroupEntry">\n`;
					xml += `          		<member name="barterID">${item[2].value[i][0].value}</member>\n`;
					xml += `          		<member name="flags">${item[2].value[i][1].value}</member>\n`;
					xml += `        	</object>\n`;
					xml += `       	</element>\n`;
				}
				xml += `    	</member>\n`;
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
