import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { CItemDataComponent } from '../c-item-data/c-item-data.component';
import { CEventMessageDataComponent } from '../c-event-message-data/c-event-message-data.component';
import { CSkillComponent } from '../c-skill/c-skill.component';
import { ActionLogicDataComponent } from '../action-logic-data/action-logic-data.component';
import { ExchangeDataComponent } from '../exchange-data/exchange-data.component';
const { XMLParser } = require("fast-xml-parser");

@Component({
	selector: 'app-xml-editor',
	templateUrl: './xml-editor.component.html',
	styleUrls: ['./xml-editor.component.scss']
})
export class XmlEditorComponent {

	comphackPath: string = "";
	binaryDataPath: string = "";
	fileMode: string = "";
	decryptedFileName: string = "";

	title: string = "";
	rawXmlTxt: string = "";
	filePath: string = "";
	selectedFileType = "None";
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
	@ViewChild('actionLogicDataComponent', { static: false })
	actionLogicDataComponent!: ActionLogicDataComponent;
	@ViewChild('exchangeDataComponent', { static: false })
	exchangeDataComponent!: ExchangeDataComponent;

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
		this.ipc.on('binarydata-path-selected', async (event: any, arg?: any) => {
			this.binaryDataPath = arg;
			this.cd.detectChanges();
		});
		this.ipc.on('binarydata-path-error', async (event: any, arg?: any) => {
			this.binaryDataPath = "";
			alert(arg);
			this.cd.detectChanges();
		});

		this.ipc.on('comphack-path-selected', async (event: any, arg?: any) => {
			this.comphackPath = arg;
			this.cd.detectChanges();
		});
		this.ipc.on('comphack-path-error', async (event: any, arg?: any) => {
			this.comphackPath = "";
			alert(arg);
			this.cd.detectChanges();
		});
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
					case "CEventMessageData2":
						this.cEventMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CSkillData":
						this.cSkillComponent.startParsing(this.contentJson);
						break;
					case "ActionLogicData":
						this.actionLogicDataComponent.startParsing(this.contentJson);
						break;
					case "ExchangeData":
						this.exchangeDataComponent.startParsing(this.contentJson);
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
		this.cd.detectChanges();
	}

	startDecrypt() {
		if (this.decryptedFileName != "") {
			this.ipc.send('start-decrypt', { comphack: this.comphackPath, binary: this.binaryDataPath, file: this.selectedFileType, fileName: this.decryptedFileName });
			this.cd.detectChanges();
		}
		else {
			alert("The name cannot be empty");
		}

	}

	openCompHackPathDialog() {
		this.ipc.send('open-comphack-path-dialog');
		this.cd.detectChanges();
	}

	openBinaryDataPathDialog() {
		this.ipc.send('open-binarydata-path-dialog');
		this.cd.detectChanges();
	}

	changeFileType(str: string) {
		this.selectedFileType = str;
		(this.selectedFileType != "None") ? this.filetypeIsSelected = true : this.filetypeIsSelected = false;
		this.isValidFile = false;
		this.testedFile = false;
		this.filePath = "";
		this.cd.detectChanges();

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

	encryptFile(xml: string) {
		this.ipc.send('encrypt-file', { filePath: this.filePath, file: xml, fileType: this.selectedFileType, folder: this.comphackPath });
	}

	changeFileMode(str: string) {
		this.fileMode = str;
		this.selectedFileType = "";
		this.filetypeIsSelected = false;
		this.filePath = "";
	}
}

