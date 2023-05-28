import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

export type cEventMessageDataStructure = [
	{ name: 'ID', value: number },
	{ name: 'lines', value: string[] }
];

@Component({
	selector: 'app-c-event-message-data',
	templateUrl: './c-event-message-data.component.html',
	styleUrls: ['./c-event-message-data.component.scss']
})
export class CEventMessageDataComponent {

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
		this.content = await this.parseCEventMessageData(this.contentJson);
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


	async parseCEventMessageData(json: string) {
		try {
			const parsed = JSON.parse(json);
			const items = await Promise.all(parsed.map(async (item: any) => {

				const lines = item.member.find((m: any) => m["@name"] === "lines");

				let values = [];
				if (lines && lines.element) {
					const eltValues = Array.isArray(lines.element) ? lines.element : [lines.element];
					values = eltValues.map((e: any) => e.toString());
				}
				return [
					{ name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
					{ name: "line", value: values }
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
			this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
			this.editingItem = [
				{ name: 'ID', value: this.selectedItem[0].value },
				{ name: 'line', value: [] }

			];
			this.selectedItem[1].value.forEach((elt: any) => this.editingItem[1].value.push(elt));
		}
		else {
			this.editingItem = [
				{ name: 'ID', value: null },
				{ name: 'line', value: [] },
			];
		}

		this.cd.detectChanges();
	}

	addLine() {
		this.editingItem[1].value.push('');
		this.cd.detectChanges();
	}

	removeLine(index: number) {
		this.editingItem[1].value.splice(index, 1);
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

	onSearch() {
		if (this.searchTableText === "" || !this.searchTableText) {
			this.filteredContent = this.content;
		}

		const searchStr = this.searchTableText.toLowerCase();
		this.filteredContent = this.content.filter((item) => {
			const idStr = String(item[0].value).toLowerCase();

			return idStr.includes(searchStr) || item[1].value.some((line: string) => line.toLowerCase().includes(searchStr.toLowerCase()));
		});

		this.currentPage = 1;
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
			this.content.forEach((item: cEventMessageDataStructure) => {
				// Write the opening tag for the item
				xml += '	<object name="MiCEventMessageData">\n';
				xml += `		<member name="ID">${item[0].value || ''}</member>\n`;
				xml += `		<member name="lines">\n`;
				item[1].value.forEach(line => xml += `			<element><![CDATA[${line}]]></element>\n`)
				xml += '   		</member>\n';
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


