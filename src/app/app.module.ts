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
import { GvgDataComponent } from './gvg-data/gvg-data.component';
import { CCultureDataComponent } from './c-culture-data/c-culture-data.component';
import { ModificationExtCatalystDataComponent } from './modification-ext-catalyst-data/modification-ext-catalyst-data.component';
import { PcDataComponent } from './pc-data/pc-data.component';
import { ChanceItemDataComponent } from './chance-item-data/chance-item-data.component';
import { AutoLiveDataComponent } from './auto-live-data/auto-live-data.component';
import { CUraFieldDataComponent } from './c-ura-field-data/c-ura-field-data.component';
import { CHouraiDataComponent } from './c-hourai-data/c-hourai-data.component';
import { SlotPiercingDataComponent } from './slot-piercing-data/slot-piercing-data.component';
import { WorldDataComponent } from './world-data/world-data.component';
import { QuestBonusCodeDataComponent } from './quest-bonus-code-data/quest-bonus-code-data.component';
import { CIconDataComponent } from './c-icon-data/c-icon-data.component';
import { GuardianUnlockDataComponent } from './guardian-unlock-data/guardian-unlock-data.component';
import { UltimateBattleBaseDataComponent } from './ultimate-battle-base-data/ultimate-battle-base-data.component';
import { CAppearanceEquipDataComponent } from './c-appearance-equip-data/c-appearance-equip-data.component';
import { BazaarClerkNpcDataComponent } from './bazaar-clerk-npc-data/bazaar-clerk-npc-data.component';
import { UraFieldTowerDataComponent } from './ura-field-tower-data/ura-field-tower-data.component';
import { MitamaReunionBonusDataComponent } from './mitama-reunion-bonus-data/mitama-reunion-bonus-data.component';
import { CSpecialSkillEffectDataComponent } from './c-special-skill-effect-data/c-special-skill-effect-data.component';
import { QuestBonusDataComponent } from './quest-bonus-data/quest-bonus-data.component';
import { CGuideDataComponent } from './c-guide-data/c-guide-data.component';
import { AiDataComponent } from './ai-data/ai-data.component';
import { DevilEquipmentItemDataComponent } from './devil-equipment-item-data/devil-equipment-item-data.component';
import { CDevilEquipmentExclusiveDataComponent } from './c-devil-equipment-exclusive-data/c-devil-equipment-exclusive-data.component';
import { TankDataComponent } from './tank-data/tank-data.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { PgMakerComponent } from './pg-maker/pg-maker.component';
import { CDevilBookBonusMitamaDataComponent } from './c-devil-book-bonus-mitama-data/c-devil-book-bonus-mitama-data.component';
import { CDevilBoostIconDataComponent } from './c-devil-boost-icon-data/c-devil-boost-icon-data.component';
import { DevilFusionDataComponent } from './devil-fusion-data/devil-fusion-data.component';
import { BlendDataComponent } from './blend-data/blend-data.component';
import { BlendExtDataComponent } from './blend-ext-data/blend-ext-data.component';
import { DevilBoostLotDataComponent } from './devil-boost-lot-data/devil-boost-lot-data.component';
import { DisassemblyTriggerDataComponent } from './disassembly-trigger-data/disassembly-trigger-data.component';
import { ModifiedEffectDataComponent } from './modified-effect-data/modified-effect-data.component';
import { MitamaReunionSetBonusDataComponent } from './mitama-reunion-set-bonus-data/mitama-reunion-set-bonus-data.component';
import { MissionDataComponent } from './mission-data/mission-data.component';
import { CLoadingCommercialDataComponent } from './c-loading-commercial-data/c-loading-commercial-data.component';
import { MitamaUnionBonusDataComponent } from './mitama-union-bonus-data/mitama-union-bonus-data.component';
import { GuardianAssistDataComponent } from './guardian-assist-data/guardian-assist-data.component';
import { CDevilDungeonDataComponent } from './c-devil-dungeon-data/c-devil-dungeon-data.component';
import { ModificationExtRecipeDataComponent } from './modification-ext-recipe-data/modification-ext-recipe-data.component';
import { CNakamaQuestRewardDataComponent } from './c-nakama-quest-reward-data/c-nakama-quest-reward-data.component';
import { WarpPointDataComponent } from './warp-point-data/warp-point-data.component';
import { GvgTrophyDataComponent } from './gvg-trophy-data/gvg-trophy-data.component';
import { DevilBoostItemDataComponent } from './devil-boost-item-data/devil-boost-item-data.component';
import { TriUnionSpecialDataComponent } from './tri-union-special-data/tri-union-special-data.component';
import { TimeLimitDataComponent } from './time-limit-data/time-limit-data.component';
import { CTitleDataComponent } from './c-title-data/c-title-data.component';
import { DevilDataComponent } from './devil-data/devil-data.component';
import { ShopMakerComponent } from './shop-maker/shop-maker.component';
import { HNpcDataComponent } from './h-npc-data/h-npc-data.component';
import { NpcBarterConditionDataComponent } from './npc-barter-condition-data/npc-barter-condition-data.component';
import { CTransformedModelDataComponent } from './c-transformed-model-data/c-transformed-model-data.component';
import { ZoneDataComponent } from './zone-data/zone-data.component';
import { SkillDataComponent } from './skill-data/skill-data.component';
import { CKeyItemDataComponent } from './c-key-item-data/c-key-item-data.component';
import { ClickedOutsideDirective } from './clicked-outside.directive';
import { DemonMakerComponent } from './demon-maker/demon-maker.component';
import { DevilEquipmentDataComponent } from './devil-equipment-data/devil-equipment-data.component';
import { ModificationDataComponent } from './modification-data/modification-data.component';
import { CEquipModelDataComponent } from './c-equip-model-data/c-equip-model-data.component';
import { DevilLvupRateDataComponent } from './devil-lvup-rate-data/devil-lvup-rate-data.component';
import { CHouraiMessageDataComponent } from './c-hourai-message-data/c-hourai-message-data.component';
import { GuardianLevelDataComponent } from './guardian-level-data/guardian-level-data.component';
import { EnchantDataComponent } from './enchant-data/enchant-data.component';
import { ExpertTitleDataComponent } from './expert-title-data/expert-title-data.component';
import { QuestDataComponent } from './quest-data/quest-data.component';
import { SynthesisDataComponent } from './synthesis-data/synthesis-data.component';
import { CStatusDataComponent } from './c-status-data/c-status-data.component';
import { NpcBarterTextDataComponent } from './npc-barter-text-data/npc-barter-text-data.component';
import { CBattleTalkDataComponent } from './c-battle-talk-data/c-battle-talk-data.component';
import { CFortuneDataComponent } from './c-fortune-data/c-fortune-data.component';
import { CHelpDataComponent } from './c-help-data/c-help-data.component';
import { CModifiedEffectDataComponent } from './c-modified-effect-data/c-modified-effect-data.component';
import { CQuestDataComponent } from './c-quest-data/c-quest-data.component';
import { CTimeAttackDataComponent } from './c-time-attack-data/c-time-attack-data.component';
import { CValuablesDataComponent } from './c-valuables-data/c-valuables-data.component';
import { CZoneRelationDataComponent } from './c-zone-relation-data/c-zone-relation-data.component';
import { DevilBookDataComponent } from './devil-book-data/devil-book-data.component';
import { DevilBoostDataComponent } from './devil-boost-data/devil-boost-data.component';
import { DevilBoostExtraDataComponent } from './devil-boost-extra-data/devil-boost-extra-data.component';
import { DisassemblyDataComponent } from './disassembly-data/disassembly-data.component';
import { EquipmentSetDataComponent } from './equipment-set-data/equipment-set-data.component';
import { ModificationExtEffectDataComponent } from './modification-ext-effect-data/modification-ext-effect-data.component';
import { ONpcDataComponent } from './o-npc-data/o-npc-data.component';
import { SItemDataComponent } from './s-item-data/s-item-data.component';
import { ShopProductDataComponent } from './shop-product-data/shop-product-data.component';
import { StatusDataComponent } from './status-data/status-data.component';
import { NPCInvisibleDataComponent } from './npc-invisible-data/npc-invisible-data.component';
import { ExpertClassDataComponent } from './expert-class-data/expert-class-data.component';
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
    ItemDataComponent,
    GvgDataComponent,
    CCultureDataComponent,
    ModificationExtCatalystDataComponent,
    PcDataComponent,
    ChanceItemDataComponent,
    AutoLiveDataComponent,
    CUraFieldDataComponent,
    CHouraiDataComponent,
    SlotPiercingDataComponent,
    WorldDataComponent,
    QuestBonusCodeDataComponent,
    CIconDataComponent,
    GuardianUnlockDataComponent,
    UltimateBattleBaseDataComponent,
    CAppearanceEquipDataComponent,
    BazaarClerkNpcDataComponent,
    UraFieldTowerDataComponent,
    MitamaReunionBonusDataComponent,
    CSpecialSkillEffectDataComponent,
    QuestBonusDataComponent,
    CGuideDataComponent,
    AiDataComponent,
    DevilEquipmentItemDataComponent,
    CDevilEquipmentExclusiveDataComponent,
    TankDataComponent,
    ToolListComponent,
    PgMakerComponent,
    CDevilBookBonusMitamaDataComponent,
    CDevilBoostIconDataComponent,
    DevilFusionDataComponent,
    BlendDataComponent,
    BlendExtDataComponent,
    DevilBoostLotDataComponent,
    DisassemblyTriggerDataComponent,
    ModifiedEffectDataComponent,
    MitamaReunionSetBonusDataComponent,
    MissionDataComponent,
    CLoadingCommercialDataComponent,
    MitamaUnionBonusDataComponent,
    GuardianAssistDataComponent,
    CDevilDungeonDataComponent,
    ModificationExtRecipeDataComponent,
    CNakamaQuestRewardDataComponent,
    WarpPointDataComponent,
    GvgTrophyDataComponent,
    DevilBoostItemDataComponent,
    TriUnionSpecialDataComponent,
    TimeLimitDataComponent,
    CTitleDataComponent,
    DevilDataComponent,
    ShopMakerComponent,
    HNpcDataComponent,
    NpcBarterConditionDataComponent,
    CTransformedModelDataComponent,
    ZoneDataComponent,
    SkillDataComponent,
    CKeyItemDataComponent,
    ClickedOutsideDirective,
    DemonMakerComponent,
    DevilEquipmentDataComponent,
    ModificationDataComponent,
    CEquipModelDataComponent,
    DevilLvupRateDataComponent,
    CHouraiMessageDataComponent,
    GuardianLevelDataComponent,
    EnchantDataComponent,
    ExpertTitleDataComponent,
    QuestDataComponent,
    SynthesisDataComponent,
    CStatusDataComponent,
    NpcBarterTextDataComponent,
    CBattleTalkDataComponent,
    CFortuneDataComponent,
    CHelpDataComponent,
    CModifiedEffectDataComponent,
    CQuestDataComponent,
    CTimeAttackDataComponent,
    CValuablesDataComponent,
    CZoneRelationDataComponent,
    DevilBookDataComponent,
    DevilBoostDataComponent,
    DevilBoostExtraDataComponent,
    DisassemblyDataComponent,
    EquipmentSetDataComponent,
    ModificationExtEffectDataComponent,
    ONpcDataComponent,
    SItemDataComponent,
    ShopProductDataComponent,
    StatusDataComponent,
    NPCInvisibleDataComponent,
    ExpertClassDataComponent
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
