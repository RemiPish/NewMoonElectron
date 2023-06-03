import { Component, Output, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

export type item = [
	{ name: 'ID', value: number },
	{ name: 'stackSize', value: number },
];

export type data = [
	{ name: 'optionDataName', value: string },
	{ name: 'items', value: item[] }
];

export type exchangeDataStructure = [
	{ name: 'ID', value: number },
	{ name: 'datas', value: data[] }

];

@Component({
	selector: 'app-exchange-data',
	templateUrl: './exchange-data.component.html',
	styleUrls: ['./exchange-data.component.scss']
})


export class ExchangeDataComponent {

	contentJson: string = "";
	@Input() fileMode?: string = "";
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

	constructor(private cd: ChangeDetectorRef) {

	}

	async parseContent(json: string) {
		let res = await this.parseExchangeData(json);
		this.contentParsed.emit(res);
	}

	async startParsing(json: string) {
		this.loadingTable = true;
		this.inEdition = false
		this.contentJson = json;
		this.content = await this.parseExchangeData(this.contentJson);
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
			const nameStr = item[1].value ? item[1].value.toLowerCase() : '';
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

	async parseExchangeData(json: string) {
		try {
			const parsed = JSON.parse(json);
			console.log(parsed)
			const items = await Promise.all(parsed.map(async (item: any) => {
				let datas: data[] = [];
				if (item.member.find((m: any) => m["@name"] === "options").element.length) {
					item.member.find((m: any) => m["@name"] === "options").element.forEach((opt: any) => {
						let nameD = opt.object.member.find((m: any) => m["@name"] === "name")["#text"];
						let itemList: item[] = [];
						if (!!opt.object.member.find((m: any) => m["@name"] === "items").element && opt.object.member.find((m: any) => m["@name"] === "items").element?.length > 1) {
							opt.object.member.find((m: any) => m["@name"] === "items").element.forEach((it: any) => {
								itemList.push([{ name: "ID", value: it.object.member.find((m: any) => m["@name"] === "ID")["#text"] },
								{ name: "stackSize", value: it.object.member.find((m: any) => m["@name"] === "stackSize")["#text"] }])
							})
						}
						else if (!!opt.object.member.find((m: any) => m["@name"] === "items").element) {
							itemList.push([{ name: "ID", value: opt.object.member.find((m: any) => m["@name"] === "items").element.object.member.find((m: any) => m["@name"] === "ID")["#text"] },
							{ name: "stackSize", value: opt.object.member.find((m: any) => m["@name"] === "items").element.object.member.find((m: any) => m["@name"] === "stackSize")["#text"] }])
						}

						datas.push([{ name: 'optionDataName', value: nameD },
						{ name: 'items', value: itemList }])
					})
				}
				else {

					let nameD = item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "name")["#text"];
					let itemList: item[] = [];
					if (!!item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element && item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element?.length > 1) {
						item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element.forEach((it: any) => {
							itemList.push([{ name: "ID", value: it.object.member.find((m: any) => m["@name"] === "ID")["#text"] },
							{ name: "stackSize", value: it.object.member.find((m: any) => m["@name"] === "stackSize")["#text"] }])
						})
					}
					else if (!!item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element) {
						itemList.push([{ name: "ID", value: item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element.object.member.find((m: any) => m["@name"] === "ID")["#text"] },
						{ name: "stackSize", value: item.member.find((m: any) => m["@name"] === "options").element.object.member.find((m: any) => m["@name"] === "items").element.object.member.find((m: any) => m["@name"] === "stackSize")["#text"] }])
					}

					datas.push([{ name: 'optionDataName', value: nameD },
					{ name: 'items', value: itemList }])

				}

				return [
					{ name: "ID", value: item.member.find((m: any) => m["@name"] === "ID")["#text"] },
					{ name: "datas", value: datas },
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
			let datas = [];

			for (let i = 0; i < this.selectedItem[1].value.length; i++) {
				let itemList: item[] = [];
				let name = this.selectedItem[1].value[i][0].value;
				for (let j = 0; j < this.selectedItem[1].value[i][1].value.length; j++) {
					itemList.push([{ name: "ID", value: this.selectedItem[1].value[i][1].value[j][0].value || 0 },
					{ name: "stackSize", value: this.selectedItem[1].value[i][1].value[j][1].value || 0 }])
				}
				datas.push([{ name: 'optionDataName', value: name },
				{ name: 'items', value: itemList }])
			}
			this.editingItem = [
				{ name: 'ID', value: this.selectedItem[0].value },
				{ name: 'datas', value: datas }
			];
		}
		else {
			let datas = [];

			let itemList: item[] = [];
			let itemList2: item[] = [];
			itemList.push([{ name: "ID", value: 0 },
			{ name: "stackSize", value: 0 }])
			itemList2.push([{ name: "ID", value: 0 },
			{ name: "stackSize", value: 0 }])

			datas.push([{ name: 'optionDataName', value: "" },
			{ name: 'items', value: itemList }])
			datas.push([{ name: 'optionDataName', value: "" },
			{ name: 'items', value: itemList2 }])


			this.editingItem = [
				{ name: 'ID', value: null },
				{
					name: "datas", value: datas
				}
			];
		}
		//console.log(this.editingItem)
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

	addDtContent() {
		let itemList: item[] = [];
		itemList.push([{ name: "ID", value: 0 },
		{ name: "stackSize", value: 0 }]);

		this.editingItem[1].value.push([
			{ name: 'optionDataName', value: "" },
			{
				name: 'items', value: itemList
			}]);
		this.cd.detectChanges();
	}

	removeDtContent(i: number) {
		this.editingItem[1].value.splice(i, 1);
		this.cd.detectChanges();
	}

	removeDtItem(i: number, j: number) {
		this.editingItem[1].value[i][1].value.splice(j, 1);
		this.cd.detectChanges();

	}

	addDtItem(i: number) {

		this.editingItem[1].value[i][1].value.push([
			{ name: "ID", value: 0 },
			{ name: "stackSize", value: 1 }
		]);
		this.cd.detectChanges();
	}

	changeTablePage(event: number) {
		this.currentPage = event;
		this.cd.detectChanges();
	}

	writeXmlFile(saveMode: string, content: any) {
		const confirmation = confirm('Save this ExchangeData file? (The file will be overwritten by this change)');
		if (confirmation) {
			// Create the root XML element
			let xml = '<objects>\n';

			// Loop through each item in this.content array
			content.forEach((item: exchangeDataStructure) => {
				// Write the opening tag for the item
				xml += '	<object name="MiExchangeData">\n';
				xml += `    <member name="ID">${item[0].value}</member>\n`;
				xml += `    <member name="options">\n`;
				for (let i = 0; i < item[1].value.length; i++) {
					xml += `      <element>\n`;
					xml += `        <object name="MiExchangeOptionData">\n`;
					xml += `         <member name="name"><![CDATA[${item[1].value[i][0].value || ""}]]></member>\n`;
					xml += `         <member name="items">\n`;
					for (let j = 0; j < item[1].value[i][1].value.length; j++) {
						xml += `          <element>\n`;
						xml += `            <object name="MiExchangeObjectData">\n`;
						xml += `              <member name="ID">${item[1].value[i][1].value[j][0].value || 0}</member>\n`;
						xml += `              <member name="stackSize">${item[1].value[i][1].value[j][1].value || 0}</member>\n`;
						xml += `            </object>\n`;
						xml += `          </element>\n`;
					}
					xml += `         </member>\n`;
					xml += `        </object>\n`;
					xml += `       </element>\n`;
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
