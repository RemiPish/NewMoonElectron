import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type actionLogicDataStructure = [
	{ name: 'ID', value: number },
	{ name: 'table', value: number[][] },
];

@Component({
	selector: 'app-action-logic-data',
	templateUrl: './action-logic-data.component.html',
	styleUrls: ['./action-logic-data.component.scss']
})
export class ActionLogicDataComponent {
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
	showTable: boolean[] = [];

	constructor(private cd: ChangeDetectorRef) {
		for (let i = 0; i < 14; i++) {
			this.showTable.push(false);
		}
	}

	async startParsing(json: string) {
		this.loadingTable = true;
		this.inEdition = false
		this.contentJson = json;
		this.content = await this.parseActionLogicData(this.contentJson);
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

	async parseActionLogicData(json: string) {
		try {
			const parsed = JSON.parse(json);
			console.log(parsed)
			const items = await Promise.all(parsed.map(async (item: any) => {
				let values: any = [];
				item.member.find((m: any) => m["@name"] === "actionTbl").element.forEach((data: any) => {
					let unknownTable: number[] = [];
					data.object.member.element.forEach((elt: number) => unknownTable.push(elt));
					values.push(unknownTable);
				});
				return [
					{ name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
					{ name: "table", value: values }
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

	openEdition(id?: any) {
		this.inEdition = true;
		if (id) {
			this.filteredContent = this.content.filter((item: { value: any; }[]) => item[0].value === id);
			this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
			this.editingItem = [
				{ name: 'ID', value: this.selectedItem[0].value },
				{ name: 'line', value: [] }

			];
			this.selectedItem[1].value.forEach((data: any) => {
				let eltTable: number[] = [];
				data.forEach((elt: number) => eltTable.push(elt));
				this.editingItem[1].value.push(eltTable);
			})
		}
		else {
			this.editingItem = [
				{ name: 'ID', value: null },
				{ name: 'line', value: [] },
			];
			for (let i = 0; i < 14; i++) {
				this.editingItem[1].value.push([]);
				for (let j = 0; j < 26; j++) {
					this.editingItem[1].value[i].push(0)
				}

			}
		}

		this.cd.detectChanges();
	}

	cancelEdit() {
		this.formMsg = "";
		this.editingItem = null;
		this.selectedItem = null;
		this.inEdition = false;
		this.filteredContent = this.content;
		for (let i = 0; i < 14; i++) {
			this.showTable[i] = false;
		}
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

	changeShow(i: number) {
		this.showTable[i] = !this.showTable[i];
		this.cd.detectChanges();
	}

	onSearch() {
		if (this.searchTableText === "" || !this.searchTableText) {
			this.filteredContent = this.content;
		}

		const searchStr = this.searchTableText.toLowerCase();
		this.filteredContent = this.content.filter((item) => {
			const idStr = String(item[0].value).toLowerCase();
			return idStr.includes(searchStr);
		});

		this.currentPage = 1;
		this.cd.detectChanges();
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
			this.content.forEach((item: actionLogicDataStructure) => {
				xml += '	<object name="MiActionLogicData">\n';
				xml += `		<member name="ID">${item[0].value || ''}</member>\n`;
				xml += `		<member name="actionTbl">\n`;


				item[1].value.forEach(data => {
					xml += `			<element>\n`;
					xml += `				<object name="MiActionTblData">\n`;
					xml += `					<member name="unknown">\n`;
					data.forEach(elt => {
						xml += `						<element>${elt}</element>\n`;
					})
					xml += `					</member>\n`;
					xml += `				</object>\n`;
					xml += `			</element>\n`;
				})
				xml += `		</member>\n`;
				xml += `	</object>\n`;
			})
			xml += '</objects>';

			if (saveMode === 'xml')
				this.saveXmlFile.emit(xml);
			else this.encryptFile.emit(xml);
		}
	}
}
