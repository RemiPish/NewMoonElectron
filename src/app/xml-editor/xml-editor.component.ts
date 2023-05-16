import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { CItemDataComponent } from '../c-item-data/c-item-data.component';
import { CEventMessageDataComponent } from '../c-event-message-data/c-event-message-data.component';
import { CSkillComponent } from '../c-skill/c-skill.component';
const { XMLParser } = require("fast-xml-parser");
export type FileType = "None" | "CItemData" | "CEventMessageData" | "CSkill";

@Component({
	selector: 'app-xml-editor',
	templateUrl: './xml-editor.component.html',
	styleUrls: ['./xml-editor.component.scss']
})
export class XmlEditorComponent {
	title: string = "";
	rawXmlTxt: string = "";
	filePath: string = "";
	selectedFileType: FileType = "None";
	filetypeIsSelected = false;
	testedFile = false;
	isValidFile = false;
	disableOpenFileBtn = false;
	selectedItem: any;
	editingItem: any;
	mode: string = "edit";
	currentPage = 1;
	formMsg = "";
	contentJson = "";
	loadingTable = false;

	@ViewChild('cItemDataComponent', { static: false })
	cItemDataComponent!: CItemDataComponent;
	@ViewChild('cEventMessageDataComponent', { static: false })
	cEventMessageDataComponent!: CEventMessageDataComponent;
	@ViewChild('cSkillComponent', { static: false })
	cSkillComponent!: CSkillComponent;

	constructor(private cd: ChangeDetectorRef, private readonly ipc: IpcService) {
		const parseConfig = {
			attributeNamePrefix: "@",
			attrNodeName: false,
			ignoreAttributes: false,
			parseAttributeValue: true,
			parseNodeValue: true,
			parseTrueNumberOnly: true,
			arrayMode: true,
		};
		const parser = new XMLParser(parseConfig);
		this.ipc.on('file-error-read', async (event: any, arg?: any) => {
			this.disableOpenFileBtn = false;
			this.testedFile = true;
			this.isValidFile = false;
			this.filePath = "";
			this.rawXmlTxt = "";
			this.title = "";
			this.cd.detectChanges();
		});

		this.ipc.on('file-selected', async (event: any, arg?: any) => {
			this.disableOpenFileBtn = true;
			this.testedFile = true;

			this.title = arg["fileName"];
			this.rawXmlTxt = arg["fileContent"];
			this.filePath = arg["filePath"];
			try {
				let parsedFile = await parser.parse(this.rawXmlTxt);
				let contentA = parsedFile.objects.object;
				this.contentJson = JSON.stringify(contentA);
				switch (this.selectedFileType) {
					case "CItemData":
						this.cItemDataComponent.startParsing(this.contentJson);
						break;
					case "CEventMessageData":
						this.cEventMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CSkill":
						this.cSkillComponent.startParsing(this.contentJson);
						break;
				}

				this.cd.detectChanges();
			}
			catch (err) {
				console.log(err)
				this.disableOpenFileBtn = false;
				this.testedFile = true;
				this.isValidFile = false;
				this.filePath = "";
				this.rawXmlTxt = "";
				this.title = "";
				this.cd.detectChanges();
			}
		});
	}
	openFileDialog() {
		this.ipc.send('open-file-dialog');
	}

	changeFileType() {
		(this.selectedFileType != "None") ? this.filetypeIsSelected = true : this.filetypeIsSelected = false;
		this.isValidFile = false;
		this.testedFile = false;
		this.filePath = "";

	}

	fileValidate(event: boolean) {
		if (event) {
			this.isValidFile = true;
		}
		else {
			this.isValidFile = false;
			this.filePath = "";
			this.rawXmlTxt = "";
			this.title = "";

		}
		this.testedFile = true;

		this.disableOpenFileBtn = false;
		this.cd.detectChanges();
	}

	saveFile(xml: string) {
		this.ipc.send('save-file', { filePath: this.filePath, file: xml });
	}
}

