import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { IpcService } from './ipc.service';
import { XmlEditorComponent } from './xml-editor/xml-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SearchTablePipe } from './search-table.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CItemDataComponent } from './c-item-data/c-item-data.component';
import { CEventMessageDataComponent } from './c-event-message-data/c-event-message-data.component';
import { CSkillComponent } from './c-skill/c-skill.component';
import { ActionLogicDataComponent } from './action-logic-data/action-logic-data.component';
import { ExchangeDataComponent } from './exchange-data/exchange-data.component';
import { CMessageDataComponent } from './c-message-data/c-message-data.component';
import { NpcBarterGroupDataComponent } from './npc-barter-group-data/npc-barter-group-data.component';
import { TriUnionKreuzItemDataComponent } from './tri-union-kreuz-item-data/tri-union-kreuz-item-data.component';
import { CultureItemDataComponent } from './culture-item-data/culture-item-data.component';
import { CChanceItemDataComponent } from './c-chance-item-data/c-chance-item-data.component';
import { CSynthesisCatalystDataComponent } from './c-synthesis-catalyst-data/c-synthesis-catalyst-data.component';
import { CValuableComponent } from './c-valuable/c-valuable.component';
import { DeunionItemCatalystDataComponent } from './deunion-item-catalyst-data/deunion-item-catalyst-data.component';
import { NpcBarterDataComponent } from './npc-barter-data/npc-barter-data.component';
import { CModelDataComponent } from './c-model-data/c-model-data.component';
import { ItemDataComponent } from './item-data/item-data.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    XmlEditorComponent,
    SearchTablePipe,
    CItemDataComponent,
    CEventMessageDataComponent,
    CSkillComponent,
    ActionLogicDataComponent,
    ExchangeDataComponent,
    CMessageDataComponent,
    NpcBarterGroupDataComponent,
    TriUnionKreuzItemDataComponent,
    CultureItemDataComponent,
    CChanceItemDataComponent,
    CSynthesisCatalystDataComponent,
    CValuableComponent,
    DeunionItemCatalystDataComponent,
    NpcBarterDataComponent,
    CModelDataComponent,
    ItemDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule, NgxPaginationModule
  ],
  providers: [IpcService],
  bootstrap: [AppComponent],
})
export class AppModule { }
