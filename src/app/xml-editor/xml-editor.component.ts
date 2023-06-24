import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { CItemDataComponent } from '../c-item-data/c-item-data.component';
import { CEventMessageDataComponent } from '../c-event-message-data/c-event-message-data.component';
import { CSkillComponent } from '../c-skill/c-skill.component';
import { ActionLogicDataComponent } from '../action-logic-data/action-logic-data.component';
import { ExchangeDataComponent } from '../exchange-data/exchange-data.component';
import { CMessageDataComponent } from '../c-message-data/c-message-data.component';
import { NpcBarterGroupDataComponent } from '../npc-barter-group-data/npc-barter-group-data.component';
import { TriUnionKreuzItemDataComponent } from '../tri-union-kreuz-item-data/tri-union-kreuz-item-data.component';
import { CultureItemDataComponent } from '../culture-item-data/culture-item-data.component';
import { CChanceItemDataComponent } from '../c-chance-item-data/c-chance-item-data.component';
import { CSynthesisCatalystDataComponent } from '../c-synthesis-catalyst-data/c-synthesis-catalyst-data.component';
import { CValuableComponent } from '../c-valuable/c-valuable.component';
import { DeunionItemCatalystDataComponent } from '../deunion-item-catalyst-data/deunion-item-catalyst-data.component';
import { NpcBarterDataComponent } from '../npc-barter-data/npc-barter-data.component';
import { CModelDataComponent } from '../c-model-data/c-model-data.component';
import { ItemDataComponent } from '../item-data/item-data.component';
import { GvgDataComponent } from '../gvg-data/gvg-data.component';
import { CCultureDataComponent } from '../c-culture-data/c-culture-data.component';
import { ModificationExtCatalystDataComponent } from '../modification-ext-catalyst-data/modification-ext-catalyst-data.component';
import { PcDataComponent } from '../pc-data/pc-data.component';
import { ChanceItemDataComponent } from '../chance-item-data/chance-item-data.component';
import { AutoLiveDataComponent } from '../auto-live-data/auto-live-data.component';
import { CUraFieldDataComponent } from '../c-ura-field-data/c-ura-field-data.component';
import { CHouraiDataComponent } from '../c-hourai-data/c-hourai-data.component';
import { SlotPiercingDataComponent } from '../slot-piercing-data/slot-piercing-data.component';
import { WorldDataComponent } from '../world-data/world-data.component';
import { QuestBonusCodeDataComponent } from '../quest-bonus-code-data/quest-bonus-code-data.component';
import { CIconDataComponent } from '../c-icon-data/c-icon-data.component';
import { GuardianUnlockDataComponent } from '../guardian-unlock-data/guardian-unlock-data.component';
import { UltimateBattleBaseDataComponent } from '../ultimate-battle-base-data/ultimate-battle-base-data.component';
import { BazaarClerkNpcDataComponent } from '../bazaar-clerk-npc-data/bazaar-clerk-npc-data.component';
import { UraFieldTowerDataComponent } from '../ura-field-tower-data/ura-field-tower-data.component';
import { MitamaReunionBonusDataComponent } from '../mitama-reunion-bonus-data/mitama-reunion-bonus-data.component';
import { CSpecialSkillEffectDataComponent } from '../c-special-skill-effect-data/c-special-skill-effect-data.component';
import { QuestBonusDataComponent } from '../quest-bonus-data/quest-bonus-data.component';
import { CGuideDataComponent } from '../c-guide-data/c-guide-data.component';
import { AiDataComponent } from '../ai-data/ai-data.component';
import { CAppearanceEquipDataComponent } from '../c-appearance-equip-data/c-appearance-equip-data.component';
import { DevilEquipmentItemDataComponent } from '../devil-equipment-item-data/devil-equipment-item-data.component';
import { CDevilEquipmentExclusiveDataComponent } from '../c-devil-equipment-exclusive-data/c-devil-equipment-exclusive-data.component';
import { TankDataComponent } from '../tank-data/tank-data.component';
import { CDevilBookBonusMitamaDataComponent } from '../c-devil-book-bonus-mitama-data/c-devil-book-bonus-mitama-data.component';
import { CDevilBoostIconDataComponent } from '../c-devil-boost-icon-data/c-devil-boost-icon-data.component';
import { DevilFusionDataComponent } from '../devil-fusion-data/devil-fusion-data.component';
import { BlendDataComponent } from '../blend-data/blend-data.component';
import { BlendExtDataComponent } from '../blend-ext-data/blend-ext-data.component';
import { DevilBoostLotDataComponent } from '../devil-boost-lot-data/devil-boost-lot-data.component';
import { DisassemblyTriggerDataComponent } from '../disassembly-trigger-data/disassembly-trigger-data.component';
import { ModifiedEffectDataComponent } from '../modified-effect-data/modified-effect-data.component';
import { MitamaReunionSetBonusDataComponent } from '../mitama-reunion-set-bonus-data/mitama-reunion-set-bonus-data.component';
import { MissionDataComponent } from '../mission-data/mission-data.component';
import { CLoadingCommercialDataComponent } from '../c-loading-commercial-data/c-loading-commercial-data.component';
import { MitamaUnionBonusDataComponent } from '../mitama-union-bonus-data/mitama-union-bonus-data.component';
import { GuardianAssistDataComponent } from '../guardian-assist-data/guardian-assist-data.component';
import { CDevilDungeonDataComponent } from '../c-devil-dungeon-data/c-devil-dungeon-data.component';
import { ModificationExtRecipeDataComponent } from '../modification-ext-recipe-data/modification-ext-recipe-data.component';
import { CNakamaQuestRewardDataComponent } from '../c-nakama-quest-reward-data/c-nakama-quest-reward-data.component';
import { WarpPointDataComponent } from '../warp-point-data/warp-point-data.component';
import { GvgTrophyDataComponent } from '../gvg-trophy-data/gvg-trophy-data.component';
import { DevilBoostItemDataComponent } from '../devil-boost-item-data/devil-boost-item-data.component';
import { TriUnionSpecialDataComponent } from '../tri-union-special-data/tri-union-special-data.component';
import { TimeLimitDataComponent } from '../time-limit-data/time-limit-data.component';
import { CTitleDataComponent } from '../c-title-data/c-title-data.component';
import { DevilDataComponent } from '../devil-data/devil-data.component';
import { HNpcDataComponent } from '../h-npc-data/h-npc-data.component';
import { NpcBarterConditionDataComponent } from '../npc-barter-condition-data/npc-barter-condition-data.component';
import { CTransformedModelDataComponent } from '../c-transformed-model-data/c-transformed-model-data.component';
import { ZoneDataComponent } from '../zone-data/zone-data.component';
import { SkillDataComponent } from '../skill-data/skill-data.component';
import { CKeyItemDataComponent } from '../c-key-item-data/c-key-item-data.component';
import { DevilEquipmentDataComponent } from '../devil-equipment-data/devil-equipment-data.component';
import { ModificationDataComponent } from '../modification-data/modification-data.component';
import { CEquipModelDataComponent } from '../c-equip-model-data/c-equip-model-data.component';
import { DevilLvupRateDataComponent } from '../devil-lvup-rate-data/devil-lvup-rate-data.component';
import { CHouraiMessageDataComponent } from '../c-hourai-message-data/c-hourai-message-data.component';
import { GuardianLevelDataComponent } from '../guardian-level-data/guardian-level-data.component';
import { EnchantDataComponent } from '../enchant-data/enchant-data.component';
import { ExpertTitleDataComponent } from '../expert-title-data/expert-title-data.component';
import { QuestDataComponent } from '../quest-data/quest-data.component';
import { SynthesisDataComponent } from '../synthesis-data/synthesis-data.component';
import { CStatusDataComponent } from '../c-status-data/c-status-data.component';
import { NpcBarterTextDataComponent } from '../npc-barter-text-data/npc-barter-text-data.component';
import { CBattleTalkDataComponent } from '../c-battle-talk-data/c-battle-talk-data.component';
import { CFortuneDataComponent } from '../c-fortune-data/c-fortune-data.component';
import { CHelpDataComponent } from '../c-help-data/c-help-data.component';
import { CModifiedEffectDataComponent } from '../c-modified-effect-data/c-modified-effect-data.component';
import { CQuestDataComponent } from '../c-quest-data/c-quest-data.component';
import { CTimeAttackDataComponent } from '../c-time-attack-data/c-time-attack-data.component';
import { CValuablesDataComponent } from '../c-valuables-data/c-valuables-data.component';
import { CZoneRelationDataComponent } from '../c-zone-relation-data/c-zone-relation-data.component';
import { DevilBookDataComponent } from '../devil-book-data/devil-book-data.component';
import { DevilBoostDataComponent } from '../devil-boost-data/devil-boost-data.component';
import { DevilBoostExtraDataComponent } from '../devil-boost-extra-data/devil-boost-extra-data.component';
import { DisassemblyDataComponent } from '../disassembly-data/disassembly-data.component';
import { EquipmentSetDataComponent } from '../equipment-set-data/equipment-set-data.component';
import { ModificationExtEffectDataComponent } from '../modification-ext-effect-data/modification-ext-effect-data.component';
import { ONpcDataComponent } from '../o-npc-data/o-npc-data.component';
import { SItemDataComponent } from '../s-item-data/s-item-data.component';
import { ShopProductDataComponent } from '../shop-product-data/shop-product-data.component';
import { StatusDataComponent } from '../status-data/status-data.component';
import { NPCInvisibleDataComponent } from '../npc-invisible-data/npc-invisible-data.component';
import { ExpertClassDataComponent } from '../expert-class-data/expert-class-data.component';


const { XMLParser } = require("fast-xml-parser");

@Component({
	selector: 'app-xml-editor',
	templateUrl: './xml-editor.component.html',
	styleUrls: ['./xml-editor.component.scss']
})
export class XmlEditorComponent {

	comphackPath: string = "";
	fileMode: string = "";
	decryptedFileName: string = "";
	title: string = "";
	rawXmlTxt: string = "";
	filePath: string = "";
	filteredFileTypeList: string[] = [];
	searchTxt: string = "";
	fileTypeMode: string = "ALL";
	fileTypeClientList = ['CIconData_Skill', 'CIconData_Status', 'CIconData_Item', 'CIconData_Devil', 'CIconData_ItemClass', 'CIconData_Valuable', 'CIconData_UIImageList', 'CIconData_SkillSort', 'CIconData_Emote',
		'CEquipEyeData', 'CEquipFaceData(Client)', 'CEquipHairData', 'CModelData1(Client)', 'CModelData2(Client)', 'CModelData3(Client)', 'CSkillData'];
	fileTypeShieldList = ['ActionLogicData', 'AIData', 'AutoLiveData', 'BazaarClerkNPCData', 'BlendData', 'BlendExtData', 'CBattleTalk',
		'CChanceItemData', 'CCultureData', 'CDevilBookBonusData', 'CDevilBookBonusMitamaData', 'CDevilBoostIconData', 'CDevilDungeonData',
		'CDevilEquipmentExclusiveData', 'CEquipFaceData', 'CEquipModelData', 'CEventMessageData', 'CEventMessageData2', 'CFortuneData',
		'CGuardianAssistData', 'CGuideData', 'ChanceItemData', 'CHelpData',
		'CHouraiData', 'CHouraiMessageData', 'CIconData_COMPShopCategory', 'CItemData', 'CKeyItemData',
		'CLoadingCommercialData', 'CMessageData', 'CMessageData_klan-category', 'CMessageData_klan-character', 'CMessageData_klan-playstyle', 'CMessageData_klan-series',
		"CMessageData_party-playstyle", "CMessageData_party-purpose", "CMessageData_reunion", "CMessageData_Shop", "CMessageData_SysHelp", 'CMessageData_System',
		'CMessageData_yorosiku', "CMessageData_party-free", "CMessageData_omedeto", "CMessageData_NakamaQuest", "CMessageData_NakamaQuest",
		"CMessageData_Expert", "CMessageData_DevilPresent", "CMessageData_DevilBook", "CMessageData_Charastic", "CMessageData_Bazaar",
		'CModelData1', 'CModelData2', 'CModelData3', 'CModifiedEffectData', 'CNakamaQuestRewardData', 'CodeNameData',
		'CQuestData', 'CSpecialSkillEffectData', 'CSynthesisCatalystData', 'CTimeAttackData', 'CTitleData', 'CTransformedModelData',
		'CultureItemData', 'CUraFieldData', 'CStatusData', 'CValuable', 'CValuablesData', 'CZoneRelationData',
		'DeunionItemCatalystData', 'DevilBookData', 'DevilBookBonusData', 'DevilBookBonusMitamaData', 'DevilBoostData', 'DevilBoostExtraData', 'DevilBoostItemData', 'DevilBoostLotData', 'DevilData',
		'DevilEquipmentData', 'DevilEquipmentItemData', 'DevilFusionData', 'DevilLVUpRateData', 'DisassemblyData',
		'DisassemblyTriggerData', 'EnchantData', 'EnchantInitializeData', 'EnchantPiercingData', 'EquipmentSetData',
		'ExchangeData', 'ExpertClassData', 'ExpertTitleData', 'GuardianUnlockData', 'GuardianAssistData', 'GuardianLevelData', 'GuardianSpecialData',
		'GvGData', 'GvGTrophyData',
		'HNPCData', 'ItemData', 'ModificationData', 'MissionData', 'MitamaUnionBonusData',
		'MitamaReunionBonusData', 'MitamaReunionSetBonusData', 'ModificationCatalystData', 'ModificationExtEffectData', 'ModificationExtRecipeData', 'ModificationExtCatalystData', 'ModificationTriggerData', 'ModifiedEffectData', 'NPCBarterData',
		'NPCBarterConditionData', 'NPCBarterGroupData', 'NPCBarterTextData', 'NPCInvisibleData', 'ONPCData', 'PCData', 'QuestData', 'QuestBonusData', 'QuestBonusCodeData', 'ShopProductData',
		'SItemData', 'SkillData', 'SlotInitializeData', 'SlotPiercingData', 'StatusData', 'SynthesisData', 'TankData', 'TimeLimitData',
		'TriUnionSpecialData', 'TriUnionKreuzItemData', 'UltimateBattleBaseData', 'UnionItemsHelperData',
		'UraFieldTowerData', 'WarpPointData', 'WorldData', 'ZoneData'];
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
	@ViewChild('cMessageDataComponent', { static: false })
	cMessageDataComponent!: CMessageDataComponent;
	@ViewChild('npcBarterGroupDataComponent', { static: false })
	npcBarterGroupDataComponent!: NpcBarterGroupDataComponent;
	@ViewChild('npcBarterTextDataComponent', { static: false })
	npcBarterTextDataComponent!: NpcBarterTextDataComponent;
	@ViewChild('triUnionKreuzItemDataComponent', { static: false })
	triUnionKreuzItemDataComponent!: TriUnionKreuzItemDataComponent;
	@ViewChild('cultureItemDataComponent', { static: false })
	cultureItemDataComponent!: CultureItemDataComponent;
	@ViewChild('cChanceItemDataComponent', { static: false })
	cChanceItemDataComponent!: CChanceItemDataComponent;
	@ViewChild('cSynthesisCatalystDataComponent', { static: false })
	cSynthesisCatalystDataComponent!: CSynthesisCatalystDataComponent;
	@ViewChild('cValuableComponent', { static: false })
	cValuableComponent!: CValuableComponent;
	@ViewChild('deunionItemCatalystDataComponent', { static: false })
	deunionItemCatalystDataComponent!: DeunionItemCatalystDataComponent;
	@ViewChild('npcBarterDataComponent', { static: false })
	npcBarterDataComponent!: NpcBarterDataComponent;
	@ViewChild('cModelDataComponent', { static: false })
	cModelDataComponent!: CModelDataComponent;
	@ViewChild('itemDataComponent', { static: false })
	itemDataComponent!: ItemDataComponent;
	@ViewChild('gvgDataComponent', { static: false })
	gvgDataComponent!: GvgDataComponent;
	@ViewChild('cCultureDataComponent', { static: false })
	cCultureDataComponent!: CCultureDataComponent;
	@ViewChild('modificationExtCatalystDataComponent', { static: false })
	modificationExtCatalystDataComponent!: ModificationExtCatalystDataComponent;
	@ViewChild('pcDataComponent', { static: false })
	pcDataComponent!: PcDataComponent;
	@ViewChild('chanceItemDataComponent', { static: false })
	chanceItemDataComponent!: ChanceItemDataComponent;
	@ViewChild('autoLiveDataComponent', { static: false })
	autoLiveDataComponent!: AutoLiveDataComponent;
	@ViewChild('cUraFieldDataComponent', { static: false })
	cUraFieldDataComponent!: CUraFieldDataComponent;
	@ViewChild('cHouraiDataComponent', { static: false })
	cHouraiDataComponent!: CHouraiDataComponent;
	@ViewChild('cHouraiMessageDataComponent', { static: false })
	cHouraiMessageDataComponent!: CHouraiMessageDataComponent;
	@ViewChild('slotPiercingDataComponent', { static: false })
	slotPiercingDataComponent!: SlotPiercingDataComponent;
	@ViewChild('worldDataComponent', { static: false })
	worldDataComponent!: WorldDataComponent;
	@ViewChild('questBonusCodeDataComponent', { static: false })
	questBonusCodeDataComponent!: QuestBonusCodeDataComponent;
	@ViewChild('cIconDataComponent', { static: false })
	cIconDataComponent!: CIconDataComponent;
	@ViewChild('guardianUnlockDataComponent', { static: false })
	guardianUnlockDataComponent!: GuardianUnlockDataComponent;
	@ViewChild('ultimateBattleBaseDataComponent', { static: false })
	ultimateBattleBaseDataComponent!: UltimateBattleBaseDataComponent;
	@ViewChild('bazaarClerkNpcDataComponent', { static: false })
	bazaarClerkNpcDataComponent!: BazaarClerkNpcDataComponent;
	@ViewChild('uraFieldTowerDataComponent', { static: false })
	uraFieldTowerDataComponent!: UraFieldTowerDataComponent;
	@ViewChild('mitamaReunionBonusDataComponent', { static: false })
	mitamaReunionBonusDataComponent!: MitamaReunionBonusDataComponent;
	@ViewChild('cSpecialSkillEffectDataComponent', { static: false })
	cSpecialSkillEffectDataComponent!: CSpecialSkillEffectDataComponent;
	@ViewChild('questBonusDataComponent', { static: false })
	questBonusDataComponent!: QuestBonusDataComponent;
	@ViewChild('cGuideDataComponent', { static: false })
	cGuideDataComponent!: CGuideDataComponent;
	@ViewChild('aiDataComponent', { static: false })
	aiDataComponent!: AiDataComponent;
	@ViewChild('cAppearanceEquipDataComponent', { static: false })
	cAppearanceEquipDataComponent!: CAppearanceEquipDataComponent;
	@ViewChild('devilEquipmentItemDataComponent', { static: false })
	devilEquipmentItemDataComponent!: DevilEquipmentItemDataComponent;
	@ViewChild('cDevilEquipmentExclusiveDataComponent', { static: false })
	cDevilEquipmentExclusiveDataComponent!: CDevilEquipmentExclusiveDataComponent;
	@ViewChild('tankDataComponent', { static: false })
	tankDataComponent!: TankDataComponent;
	@ViewChild('cDevilBookBonusMitamaDataComponent', { static: false })
	cDevilBookBonusMitamaDataComponent!: CDevilBookBonusMitamaDataComponent;
	@ViewChild('cDevilBoostIconDataComponent', { static: false })
	cDevilBoostIconDataComponent!: CDevilBoostIconDataComponent;
	@ViewChild('devilFusionDataComponent', { static: false })
	devilFusionDataComponent!: DevilFusionDataComponent;
	@ViewChild('blendDataComponent', { static: false })
	blendDataComponent!: BlendDataComponent;
	@ViewChild('blendExtDataComponent', { static: false })
	blendExtDataComponent!: BlendExtDataComponent;
	@ViewChild('devilBoostLotDataComponent', { static: false })
	devilBoostLotDataComponent!: DevilBoostLotDataComponent;
	@ViewChild('disassemblyTriggerDataComponent', { static: false })
	disassemblyTriggerDataComponent!: DisassemblyTriggerDataComponent;
	@ViewChild('modifiedEffectDataComponent', { static: false })
	modifiedEffectDataComponent!: ModifiedEffectDataComponent;
	@ViewChild('mitamaReunionSetBonusDataComponent', { static: false })
	mitamaReunionSetBonusDataComponent!: MitamaReunionSetBonusDataComponent;
	@ViewChild('missionDataComponent', { static: false })
	missionDataComponent!: MissionDataComponent;
	@ViewChild('cLoadingCommercialDataComponent', { static: false })
	cLoadingCommercialDataComponent!: CLoadingCommercialDataComponent;
	@ViewChild('mitamaUnionBonusDataComponent', { static: false })
	mitamaUnionBonusDataComponent!: MitamaUnionBonusDataComponent;
	@ViewChild('guardianAssistDataComponent', { static: false })
	guardianAssistDataComponent!: GuardianAssistDataComponent;
	@ViewChild('cDevilDungeonDataComponent', { static: false })
	cDevilDungeonDataComponent!: CDevilDungeonDataComponent;
	@ViewChild('modificationExtRecipeDataComponent', { static: false })
	modificationExtRecipeDataComponent!: ModificationExtRecipeDataComponent;
	@ViewChild('cNakamaQuestRewardDataComponent', { static: false })
	cNakamaQuestRewardDataComponent!: CNakamaQuestRewardDataComponent;
	@ViewChild('warpPointDataComponent', { static: false })
	warpPointDataComponent!: WarpPointDataComponent;
	@ViewChild('gvgTrophyDataComponent', { static: false })
	gvgTrophyDataComponent!: GvgTrophyDataComponent;
	@ViewChild('devilBoostItemDataComponent', { static: false })
	devilBoostItemDataComponent!: DevilBoostItemDataComponent;
	@ViewChild('triUnionSpecialDataComponent', { static: false })
	triUnionSpecialDataComponent!: TriUnionSpecialDataComponent;
	@ViewChild('timeLimitDataComponent', { static: false })
	timeLimitDataComponent!: TimeLimitDataComponent;
	@ViewChild('cTitleDataComponent', { static: false })
	cTitleDataComponent!: CTitleDataComponent;
	@ViewChild('devilDataComponent', { static: false })
	devilDataComponent!: DevilDataComponent;
	@ViewChild('hNpcDataComponent', { static: false })
	hNpcDataComponent!: HNpcDataComponent;
	@ViewChild('oNpcDataComponent', { static: false })
	oNpcDataComponent!: ONpcDataComponent;
	@ViewChild('npcBarterConditionDataComponent', { static: false })
	npcBarterConditionDataComponent!: NpcBarterConditionDataComponent;
	@ViewChild('cTransformedModelDataComponent', { static: false })
	cTransformedModelDataComponent!: CTransformedModelDataComponent;
	@ViewChild('zoneDataComponent', { static: false })
	zoneDataComponent!: ZoneDataComponent;
	@ViewChild('skillDataComponent', { static: false })
	skillDataComponent!: SkillDataComponent;
	@ViewChild('cKeyItemDataComponent', { static: false })
	cKeyItemDataComponent!: CKeyItemDataComponent;
	@ViewChild('devilEquipmentDataComponent', { static: false })
	devilEquipmentDataComponent!: DevilEquipmentDataComponent;
	@ViewChild('modificationDataComponent', { static: false })
	modificationDataComponent!: ModificationDataComponent;
	@ViewChild('cEquipModelDataComponent', { static: false })
	cEquipModelDataComponent!: CEquipModelDataComponent;
	@ViewChild('devilLVUpRateDataComponent', { static: false })
	devilLVUpRateDataComponent!: DevilLvupRateDataComponent;
	@ViewChild('guardianLevelDataComponent', { static: false })
	guardianLevelDataComponent!: GuardianLevelDataComponent;
	@ViewChild('enchantDataComponent', { static: false })
	enchantDataComponent!: EnchantDataComponent;
	@ViewChild('expertTitleDataComponent', { static: false })
	expertTitleDataComponent!: ExpertTitleDataComponent;
	@ViewChild('questDataComponent', { static: false })
	questDataComponent!: QuestDataComponent;
	@ViewChild('synthesisDataComponent', { static: false })
	synthesisDataComponent!: SynthesisDataComponent;
	@ViewChild('cStatusDataComponent', { static: false })
	cStatusDataComponent!: CStatusDataComponent;
	@ViewChild('cBattleTalkDataComponent', { static: false })
	cBattleTalkDataComponent!: CBattleTalkDataComponent;
	@ViewChild('cFortuneDataComponent', { static: false })
	cFortuneDataComponent!: CFortuneDataComponent;
	@ViewChild('cHelpDataComponent', { static: false })
	cHelpDataComponent!: CHelpDataComponent;
	@ViewChild('cModifiedEffectDataComponent', { static: false })
	cModifiedEffectDataComponent!: CModifiedEffectDataComponent;
	@ViewChild('cQuestDataComponent', { static: false })
	cQuestDataComponent!: CQuestDataComponent;
	@ViewChild('cTimeAttackDataComponent', { static: false })
	cTimeAttackDataComponent!: CTimeAttackDataComponent;
	@ViewChild('cValuablesDataComponent', { static: false })
	cValuablesDataComponent!: CValuablesDataComponent;
	@ViewChild('cZoneRelationDataComponent', { static: false })
	cZoneRelationDataComponent!: CZoneRelationDataComponent;
	@ViewChild('devilBookDataComponent', { static: false })
	devilBookDataComponent!: DevilBookDataComponent;
	@ViewChild('devilBoostDataComponent', { static: false })
	devilBoostDataComponent!: DevilBoostDataComponent;
	@ViewChild('devilBoostExtraDataComponent', { static: false })
	devilBoostExtraDataComponent!: DevilBoostExtraDataComponent;
	@ViewChild('disassemblyDataComponent', { static: false })
	disassemblyDataComponent!: DisassemblyDataComponent;
	@ViewChild('equipmentSetDataComponent', { static: false })
	equipmentSetDataComponent!: EquipmentSetDataComponent;
	@ViewChild('modificationExtEffectDataComponent', { static: false })
	modificationExtEffectDataComponent!: ModificationExtEffectDataComponent;
	@ViewChild('sItemDataComponent', { static: false })
	sItemDataComponent!: SItemDataComponent;
	@ViewChild('shopProductDataComponent', { static: false })
	shopProductDataComponent!: ShopProductDataComponent;
	@ViewChild('statusDataComponent', { static: false })
	statusDataComponent!: StatusDataComponent;
	@ViewChild('npcInvisibleDataComponent', { static: false })
	npcInvisibleDataComponent!: NPCInvisibleDataComponent;
	@ViewChild('expertClassDataComponent', { static: false })
	expertClassDataComponent!: ExpertClassDataComponent;



	constructor(private cd: ChangeDetectorRef, private readonly ipc: IpcService) {
		this.fileTypeClientList.forEach(elt => {
			this.filteredFileTypeList.push(elt);
		})
		this.fileTypeShieldList.forEach(elt => {
			this.filteredFileTypeList.push(elt);
		})
		const parseConfig = {
			attributeNamePrefix: "@",
			attrNodeName: false,
			ignoreAttributes: false,
			parseAttributeValue: true,
			parseNodeValue: true,
			parseTrueNumberOnly: true,
			arrayMode: true,
		};
		/*this.ipc.on('binarydata-path-selected', async (event: any, arg?: any) => {
			this.binaryDataPath = arg;
			this.cd.detectChanges();
		});
		this.ipc.on('binarydata-path-error', async (event: any, arg?: any) => {
			this.binaryDataPath = "";
			alert(arg);
			this.cd.detectChanges();
		});*/

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
					case "CMessageData":
						this.cMessageDataComponent.startParsing(this.contentJson);
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
					case "NPCBarterGroupData":
						this.npcBarterGroupDataComponent.startParsing(this.contentJson);
						break;
					case "TriUnionKreuzItemData":
						this.triUnionKreuzItemDataComponent.startParsing(this.contentJson);
						break;
					case "CultureItemData":
						this.cultureItemDataComponent.startParsing(this.contentJson);
						break;
					case "CChanceItemData":
						this.cChanceItemDataComponent.startParsing(this.contentJson);
						break;
					case "CSynthesisCatalystData":
						this.cSynthesisCatalystDataComponent.startParsing(this.contentJson);
						break;
					case "CValuable":
						this.cValuableComponent.startParsing(this.contentJson);
						break;
					case "DeunionItemCatalystData":
						this.deunionItemCatalystDataComponent.startParsing(this.contentJson);
						break;
					case "NPCBarterData":
						this.npcBarterDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData1":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData2":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData3":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "ItemData":
						this.itemDataComponent.startParsing(this.contentJson);
						break;
					case "GvGData":
						this.gvgDataComponent.startParsing(this.contentJson);
						break;
					case "CCultureData":
						this.cCultureDataComponent.startParsing(this.contentJson);
						break;
					case "ModificationExtCatalystData":
						this.modificationExtCatalystDataComponent.startParsing(this.contentJson);
						break;
					case 'ModificationCatalystData':
						this.modificationExtCatalystDataComponent.startParsing(this.contentJson);
						break;
					case 'PCData':
						this.pcDataComponent.startParsing(this.contentJson);
						break;
					case 'ChanceItemData':
						this.chanceItemDataComponent.startParsing(this.contentJson);
						break;
					case 'EnchantInitializeData':
						this.chanceItemDataComponent.startParsing(this.contentJson);
						break;
					case 'AutoLiveData':
						this.autoLiveDataComponent.startParsing(this.contentJson);
						break;
					case 'CUraFieldData':
						this.cUraFieldDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBookBonusMitamaData':
						this.cUraFieldDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBookBonusData':
						this.cUraFieldDataComponent.startParsing(this.contentJson);
						break;
					case 'UnionItemsHelperData':
						this.chanceItemDataComponent.startParsing(this.contentJson);
						break;
					case 'CHouraiData':
						this.cHouraiDataComponent.startParsing(this.contentJson);
						break;
					case 'EnchantPiercingData':
						this.chanceItemDataComponent.startParsing(this.contentJson);
						break;
					case 'SlotPiercingData':
						this.slotPiercingDataComponent.startParsing(this.contentJson);
						break;
					case 'CMessageData_klan-playstyle':
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'CMessageData_klan-character':
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'CMessageData_klan-category':
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'CMessageData_klan-series':
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'CMessageData_yorosiku':
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_System":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_SysHelp":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_Shop":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_reunion":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_party-purpose":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_party-playstyle":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_party-free":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_omedeto":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_NakamaQuest":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_Expert":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_DevilPresent":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_DevilBook":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_Charastic":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case "CMessageData_Bazaar":
						this.cMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'SlotInitializeData':
						this.chanceItemDataComponent.startParsing(this.contentJson);
						break;
					case 'WorldData':
						this.worldDataComponent.startParsing(this.contentJson);
						break;
					case 'QuestBonusCodeData':
						this.questBonusCodeDataComponent.startParsing(this.contentJson);
						break;
					case 'CIconData_COMPShopCategory':
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case 'GuardianUnlockData':
						this.guardianUnlockDataComponent.startParsing(this.contentJson);
						break;
					case 'GuardianSpecialData':
						this.guardianUnlockDataComponent.startParsing(this.contentJson);
						break;
					case 'UltimateBattleBaseData':
						this.ultimateBattleBaseDataComponent.startParsing(this.contentJson);
						break;
					case 'BazaarClerkNPCData':
						this.bazaarClerkNpcDataComponent.startParsing(this.contentJson);
						break;
					case 'UraFieldTowerData':
						this.uraFieldTowerDataComponent.startParsing(this.contentJson);
						break;
					case 'MitamaReunionBonusData':
						this.mitamaReunionBonusDataComponent.startParsing(this.contentJson);
						break;
					case 'CSpecialSkillEffectData':
						this.cSpecialSkillEffectDataComponent.startParsing(this.contentJson);
						break;
					case 'QuestBonusData':
						this.questBonusDataComponent.startParsing(this.contentJson);
						break;
					case 'CGuideData':
						this.cGuideDataComponent.startParsing(this.contentJson);
						break;
					case 'AIData':
						this.aiDataComponent.startParsing(this.contentJson);
						break;
					case 'CEquipFaceData':
						this.cAppearanceEquipDataComponent.startParsing(this.contentJson);
						break;
					case 'CEquipHairData':
						this.cAppearanceEquipDataComponent.startParsing(this.contentJson);
						break;
					case 'CEquipEyeData':
						this.cAppearanceEquipDataComponent.startParsing(this.contentJson);
						break;
					case 'CEquipFaceData(Client)':
						this.cAppearanceEquipDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Skill":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Status":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Item":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Devil":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_ItemClass":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Valuable":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_UIImageList":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_SkillSort":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CIconData_Emote":
						this.cIconDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData1(Client)":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData2(Client)":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "CModelData3(Client)":
						this.cModelDataComponent.startParsing(this.contentJson);
						break;
					case "DevilEquipmentItemData":
						this.devilEquipmentItemDataComponent.startParsing(this.contentJson);
						break;
					case "CDevilEquipmentExclusiveData":
						this.cDevilEquipmentExclusiveDataComponent.startParsing(this.contentJson);
						break;
					case "TankData":
						this.tankDataComponent.startParsing(this.contentJson);
						break;
					case 'CDevilBookBonusMitamaData':
						this.cDevilBookBonusMitamaDataComponent.startParsing(this.contentJson);
						break;
					case 'CDevilBookBonusData':
						this.cDevilBookBonusMitamaDataComponent.startParsing(this.contentJson);
						break;
					case 'CDevilBoostIconData':
						this.cDevilBoostIconDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilFusionData':
						this.devilFusionDataComponent.startParsing(this.contentJson);
						break;
					case 'BlendData':
						this.blendDataComponent.startParsing(this.contentJson);
						break;
					case 'BlendExtData':
						this.blendExtDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBoostLotData':
						this.devilBoostLotDataComponent.startParsing(this.contentJson);
						break;
					case 'DisassemblyTriggerData':
						this.disassemblyTriggerDataComponent.startParsing(this.contentJson);
						break;
					case 'ModificationTriggerData':
						this.disassemblyTriggerDataComponent.startParsing(this.contentJson);
						break;
					case 'ModifiedEffectData':
						this.modifiedEffectDataComponent.startParsing(this.contentJson);
						break;
					case 'MitamaReunionSetBonusData':
						this.mitamaReunionSetBonusDataComponent.startParsing(this.contentJson);
						break;
					case 'MissionData':
						this.missionDataComponent.startParsing(this.contentJson);
						break;
					case 'CLoadingCommercialData':
						this.cLoadingCommercialDataComponent.startParsing(this.contentJson);
						break;
					case 'MitamaUnionBonusData':
						this.mitamaUnionBonusDataComponent.startParsing(this.contentJson);
						break;
					case 'GuardianAssistData':
						this.guardianAssistDataComponent.startParsing(this.contentJson);
						break;
					case 'CDevilDungeonData':
						this.cDevilDungeonDataComponent.startParsing(this.contentJson);
						break;
					case 'ModificationExtRecipeData':
						this.modificationExtRecipeDataComponent.startParsing(this.contentJson);
						break;
					case 'CNakamaQuestRewardData':
						this.cNakamaQuestRewardDataComponent.startParsing(this.contentJson);
						break;
					case 'WarpPointData':
						this.warpPointDataComponent.startParsing(this.contentJson);
						break;
					case 'GvGTrophyData':
						this.gvgTrophyDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBoostItemData':
						this.devilBoostItemDataComponent.startParsing(this.contentJson);
						break;
					case 'TriUnionSpecialData':
						this.triUnionSpecialDataComponent.startParsing(this.contentJson);
						break;
					case 'TimeLimitData':
						this.timeLimitDataComponent.startParsing(this.contentJson);
						break;
					case 'CTitleData':
						this.cTitleDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilData':
						this.devilDataComponent.startParsing(this.contentJson);
						break;
					case 'HNPCData':
						this.hNpcDataComponent.startParsing(this.contentJson);
						break;
					case 'ONPCData':
						this.oNpcDataComponent.startParsing(this.contentJson);
						break;
					case 'NPCBarterConditionData':
						this.npcBarterConditionDataComponent.startParsing(this.contentJson);
						break;
					case 'CTransformedModelData':
						this.cTransformedModelDataComponent.startParsing(this.contentJson);
						break;
					case 'ZoneData':
						this.zoneDataComponent.startParsing(this.contentJson);
						break;
					case 'SkillData':
						this.skillDataComponent.startParsing(this.contentJson);
						break;
					case 'CKeyItemData':
						this.cKeyItemDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilEquipmentData':
						this.devilEquipmentDataComponent.startParsing(this.contentJson);
						break;
					case 'ModificationData':
						this.modificationDataComponent.startParsing(this.contentJson);
						break;
					case 'CodeNameData':
						this.cTitleDataComponent.startParsing(this.contentJson);
						break;
					case 'CEquipModelData':
						this.cEquipModelDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilLVUpRateData':
						this.devilLVUpRateDataComponent.startParsing(this.contentJson);
						break;
					case 'CHouraiMessageData':
						this.cHouraiMessageDataComponent.startParsing(this.contentJson);
						break;
					case 'GuardianLevelData':
						this.guardianLevelDataComponent.startParsing(this.contentJson);
						break;
					case 'CGuardianAssistData':
						this.cDevilEquipmentExclusiveDataComponent.startParsing(this.contentJson);
						break;
					case 'EnchantData':
						this.enchantDataComponent.startParsing(this.contentJson);
						break;
					case 'ExpertTitleData':
						this.expertTitleDataComponent.startParsing(this.contentJson);
						break;
					case "QuestData":
						this.questDataComponent.startParsing(this.contentJson);
						break;
					case "SynthesisData":
						this.synthesisDataComponent.startParsing(this.contentJson);
						break;
					case 'CStatusData':
						this.cStatusDataComponent.startParsing(this.contentJson);
						break;
					case 'NPCBarterTextData':
						this.npcBarterTextDataComponent.startParsing(this.contentJson);
						break;
					case 'CBattleTalk':
						this.cBattleTalkDataComponent.startParsing(this.contentJson);
						break;
					case 'CFortuneData':
						this.cFortuneDataComponent.startParsing(this.contentJson);
						break;
					case 'CHelpData':
						this.cHelpDataComponent.startParsing(this.contentJson);
						break;
					case 'CModifiedEffectData':
						this.cModifiedEffectDataComponent.startParsing(this.contentJson);
						break;
					case 'CQuestData':
						this.cQuestDataComponent.startParsing(this.contentJson);
						break;
					case 'CTimeAttackData':
						this.cTimeAttackDataComponent.startParsing(this.contentJson);
						break;
					case 'CValuablesData':
						this.cValuablesDataComponent.startParsing(this.contentJson);
						break;
					case 'CZoneRelationData':
						this.cZoneRelationDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBookData':
						this.devilBookDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBoostData':
						this.devilBoostDataComponent.startParsing(this.contentJson);
						break;
					case 'DevilBoostExtraData':
						this.devilBoostExtraDataComponent.startParsing(this.contentJson);
						break;
					case 'DisassemblyData':
						this.disassemblyDataComponent.startParsing(this.contentJson);
						break;
					case 'EquipmentSetData':
						this.equipmentSetDataComponent.startParsing(this.contentJson);
						break;
					case 'ModificationExtEffectData':
						this.modificationExtEffectDataComponent.startParsing(this.contentJson);
						break;
					case 'SItemData':
						this.sItemDataComponent.startParsing(this.contentJson);
						break;
					case 'ShopProductData':
						this.shopProductDataComponent.startParsing(this.contentJson);
						break;
					case 'StatusData':
						this.statusDataComponent.startParsing(this.contentJson);
						break;
					case 'NPCInvisibleData':
						this.npcInvisibleDataComponent.startParsing(this.contentJson);
						break;
					case 'ExpertClassData':
						this.expertClassDataComponent.startParsing(this.contentJson);
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

	searchFileType() {
		this.filteredFileTypeList = [];
		if (this.searchTxt === '') {
			switch (this.fileTypeMode) {
				case 'CLIENT':
					this.fileTypeClientList.forEach(elt => {
						this.filteredFileTypeList.push(elt);
					})
					break;
				case 'SHIELD':
					this.fileTypeShieldList.forEach(elt => {
						this.filteredFileTypeList.push(elt);
					})
					break;
				case 'ALL':
					this.fileTypeClientList.forEach(elt => {
						this.filteredFileTypeList.push(elt);
					})
					this.fileTypeShieldList.forEach(elt => {
						this.filteredFileTypeList.push(elt);
					})
					break;
			}
		}
		else {
			switch (this.fileTypeMode) {
				case 'CLIENT':
					this.filteredFileTypeList = this.fileTypeClientList.filter(elt => {
						let searchStr = this.searchTxt.toLowerCase();
						const name = elt ? elt.toLowerCase() : '';
						return name.includes(searchStr);
					})
					break;
				case 'SHIELD':
					this.filteredFileTypeList = this.fileTypeShieldList.filter(elt => {
						let searchStr = this.searchTxt.toLowerCase();
						const name = elt ? elt.toLowerCase() : '';
						return name.includes(searchStr);
					})
					break;
				case 'ALL':
					let client = [];
					let shield = [];
					client = this.fileTypeClientList.filter(elt => {
						let searchStr = this.searchTxt.toLowerCase();
						const name = elt ? elt.toLowerCase() : '';
						return name.includes(searchStr);
					})
					shield = this.fileTypeShieldList.filter(elt => {
						let searchStr = this.searchTxt.toLowerCase();
						const name = elt ? elt.toLowerCase() : '';
						return name.includes(searchStr);
					})
					this.filteredFileTypeList = client.concat(shield);
			}
		}
		this.cd.detectChanges();
	}

	openFileDialog(type: string) {
		this.ipc.send('open-file-dialog');
		this.cd.detectChanges();
	}

	startDecrypt() {
		if (this.decryptedFileName != "") {
			this.ipc.send('start-decrypt', { comphack: this.comphackPath, file: this.selectedFileType, fileName: this.decryptedFileName });
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

	changeFileTypeMode(str: string) {
		this.fileTypeMode = str;
		this.isValidFile = false;
		this.testedFile = false;
		this.filePath = "";
		this.searchFileType();
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
		this.cd.detectChanges();
	}

}

