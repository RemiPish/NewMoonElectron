import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { PgMakerComponent } from '../pg-maker/pg-maker.component';
import { ShopMakerComponent } from '../shop-maker/shop-maker.component';


@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent {
  comphackPath: string = "";
  binaryDataPath: string = "";
  title: string = "";
  rawXmlTxt: string = "";
  filePath: string = "";
  toolTypeList: string[] = ['PG Maker', 'Shop Maker'];
  searchTxt: string = "";
  selectedToolType = "None";
  tooltypeIsSelected = false;
  currentPage = 1;
  formMsg = "";
  contentJsonList: string[] = [];
  loadingTable = false;
  parsedList: string[] = [];
  openedTool = false;
  @ViewChild('pgMakerComponent', { static: false })
  pgMakerComponent!: PgMakerComponent;
  @ViewChild('shopMakerComponent', { static: false })
  shopMakerComponent!: ShopMakerComponent;

  constructor(private cd: ChangeDetectorRef, private readonly ipc: IpcService) {

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
    /**/
  }

  openCompHackPathDialog() {
    this.ipc.send('open-comphack-path-dialog');
    this.cd.detectChanges();
  }

  openBinaryDataPathDialog() {
    this.ipc.send('open-binarydata-path-dialog');
    this.cd.detectChanges();
  }

  changeToolType(str: string) {
    this.openedTool = false;
    this.selectedToolType = str;
    (this.selectedToolType != "None") ? this.tooltypeIsSelected = true : this.tooltypeIsSelected = false;
    this.cd.detectChanges();
  }

  openTool() {
    this.openedTool = true;
    this.cd.detectChanges();
  }
}
