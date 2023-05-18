import { Component, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

export type EquipTypeCategory = [
    { name: "attackAnimationID1", value: number },
    { name: "attackAnimationID2", value: number },
    { name: "attackAnimationID3", value: number },
    { name: "hardAttackAnimationID1", value: number },
    { name: "hardAttackAnimationID2", value: number },
    { name: "hardAttackAnimationID3", value: number },
    { name: "executeSoundID", value: number },
    { name: "unused", value: number },
    { name: "hitCount", value: number },
    { name: "multiHitDelay", value: number },
    { name: "hitSoundID", value: number },
];

export type cSkillStructure = [
    { name: 'ID', value: number },
    { name: 'name', value: string },
    { name: 'desc', value: string },
    { name: 'iconID', value: number },
    { name: 'useWeaponAnimation', value: boolean },
    { name: 'characterStart', value: number },
    { name: 'characterComplete', value: number },
    { name: 'demonStart', value: number },
    { name: 'demonComplete', value: number },
    { name: 'cast5', value: boolean },
    { name: 'effectScale', value: number },
    { name: 'soundID', value: number },
    { name: 'cast10', value: number },
    { name: 'castEffectLocations', value: string[] },

    { name: "hitEffectDelay", value: number },
    { name: "shoot3", value: boolean },
    { name: "shoot4", value: number },
    { name: "hitEffectLinger", value: number },
    { name: "bone", value: string },
    { name: 'shootEffectLocations', value: string[] },

    { name: "hasProjectile", value: boolean },
    { name: "hasArc", value: boolean },
    { name: "hasTrail", value: boolean },
    { name: "projectileSize", value: number },
    { name: "projectileDelay", value: number },
    { name: "bullet6", value: number },
    { name: "bullet7", value: number },
    { name: "bullet8", value: string },
    { name: "color1", value: number },
    { name: "color2", value: number },
    { name: "color3", value: number },
    { name: "effectFile", value: string },
    { name: "soundID", value: number },
    { name: "target2", value: number },
    { name: "knockbackShake", value: number },
    { name: 'targetEffectLocations', value: string[] },
    { name: "hitDelay", value: number },
    { name: "hitProcessing", value: number },
    { name: "delayProcessing", value: number },
    { name: "aoeHitDelay", value: number },
    { name: "hit6", value: number },
    { name: "hitEffectScale", value: number },
    { name: 'cSkillEquipCategory', value: EquipTypeCategory[] },
    { name: "effects", value: string[] }
];

@Component({
    selector: 'app-c-skill',
    templateUrl: './c-skill.component.html',
    styleUrls: ['./c-skill.component.scss']
})
export class CSkillComponent {

    contentJson: string = "";
    @Output() fileIsValid = new EventEmitter<boolean>();
    @Output() saveXmlFile = new EventEmitter<string>();

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

    showCast = false;
    showHit = false;
    showTarget = false;
    showBullet = false;
    showEffects = false;
    showEquip = false;
    showShoot = false;

    constructor(private cd: ChangeDetectorRef) {

    }

    async startParsing(json: string) {
        this.loadingTable = true;
        this.inEdition = false
        this.contentJson = json;
        this.content = await this.parseCSkill(this.contentJson);
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
            const descStr = item[2].value ? item[2].value.toLowerCase() : '';
            return idStr.includes(searchStr) || nameStr.includes(searchStr) || descStr.includes(searchStr);
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

    async parseCSkill(json: string) {
        try {
            const parsed = JSON.parse(json);
            //console.log(parsed)
            const items = await Promise.all(parsed.map(async (item: any) => {
                let castEffectLocations: String[] = [];
                item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "effectLocations").element.forEach((elt: String) => castEffectLocations.push(elt));
                let shootEffectLocations: String[] = [];
                item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "effectLocations").element.forEach((elt: String) => shootEffectLocations.push(elt));
                let targetEffectLocations: String[] = [];
                item.member.find((m: any) => m["@name"] === "target").object.member.find((m: any) => m["@name"] === "effectLocations").element.forEach((elt: String) => targetEffectLocations.push(elt));
                let sequipCat: EquipTypeCategory[] = [];
                item.member.find((m: any) => m["@name"] === "equip").element.forEach((elt: any) => {
                    sequipCat.push([
                        { name: "attackAnimationID1", value: elt.object.member[0].element[0] },
                        { name: "attackAnimationID2", value: elt.object.member[0].element[1] },
                        { name: "attackAnimationID3", value: elt.object.member[0].element[2] },
                        { name: "hardAttackAnimationID1", value: elt.object.member[1].element[0] },
                        { name: "hardAttackAnimationID2", value: elt.object.member[1].element[1] },
                        { name: "hardAttackAnimationID3", value: elt.object.member[1].element[2] },
                        { name: "executeSoundID", value: Number(elt.object.member[2]["#text"]) },
                        { name: "unused", value: Number(elt.object.member[3]["#text"]) },
                        { name: "hitCount", value: Number(elt.object.member[4]["#text"]) },
                        { name: "multiHitDelay", value: Number(elt.object.member[5]["#text"]) },
                        { name: "hitSoundID", value: Number(elt.object.member[6]["#text"]) }]
                    )
                });

                let effectList: any = [];
                item.member.find((m: any) => m["@name"] === "effects").element.forEach((elt: any) => effectList.push(elt))

                return [
                    { name: "ID", value: Number(item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "ID")["#text"]) },
                    { name: "name", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "name")["#text"] },
                    { name: "desc", value: item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "desc")["#text"] },
                    { name: "iconID", value: Number(item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "iconID")["#text"]) },
                    { name: "useWeaponAnimation", value: Boolean(item.member.find((m: any) => m["@name"] === "base").object.member.find((m: any) => m["@name"] === "useWeaponAnimation")["#text"]) },
                    { name: "characterStart", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "characterStart")["#text"]) },
                    { name: "characterComplete", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "characterComplete")["#text"]) },
                    { name: "demonStart", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "demonStart")["#text"]) },
                    { name: "demonComplete", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "demonComplete")["#text"]) },
                    { name: "cast5", value: Boolean(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "cast5")["#text"]) },
                    { name: "effectScale", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "effectScale")["#text"]) },
                    { name: "soundID", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "soundID")["#text"]) },
                    { name: "cast10", value: Number(item.member.find((m: any) => m["@name"] === "cast").object.member.find((m: any) => m["@name"] === "cast10")["#text"]) },
                    { name: "castEffectLocations", value: castEffectLocations },
                    { name: "hitEffectDelay", value: Number(item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "hitEffectDelay")["#text"]) },
                    { name: "shoot3", value: Boolean(item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "shoot3")["#text"]) },
                    { name: "shoot4", value: Number(item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "shoot4")["#text"]) },
                    { name: "hitEffectLinger", value: Number(item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "hitEffectLinger")["#text"]) },
                    { name: "bone", value: item.member.find((m: any) => m["@name"] === "shoot").object.member.find((m: any) => m["@name"] === "bone")["#text"] || "" },
                    { name: "shotEffectLocations", value: shootEffectLocations },
                    { name: "hasProjectile", value: Boolean(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "hasProjectile")["#text"]) },
                    { name: "hasArc", value: Boolean(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "hasArc")["#text"]) },
                    { name: "hasTrail", value: Boolean(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "hasTrail")["#text"]) },
                    { name: "projectileSize", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "projectileSize")["#text"]) },
                    { name: "projectileDelay", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "projectileDelay")["#text"]) },
                    { name: "bullet6", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "bullet6")["#text"]) },
                    { name: "bullet7", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "bullet7")["#text"]) },
                    { name: "bullet8", value: item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "bullet8")["#text"] || "" },
                    { name: "color1", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "color").element[0] || 0) },
                    { name: "color2", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "color").element[1] || 0) },
                    { name: "color3", value: Number(item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "color").element[2] || 0) },
                    { name: "effectFile", value: item.member.find((m: any) => m["@name"] === "bullet").object.member.find((m: any) => m["@name"] === "effectFile")["#text"] || "" },
                    { name: "soundID", value: Number(item.member.find((m: any) => m["@name"] === "target").object.member.find((m: any) => m["@name"] === "soundID")["#text"]) },
                    { name: "target2", value: Number(item.member.find((m: any) => m["@name"] === "target").object.member.find((m: any) => m["@name"] === "target2")["#text"]) },
                    { name: "knockbackShake", value: Number(item.member.find((m: any) => m["@name"] === "target").object.member.find((m: any) => m["@name"] === "knockbackShake")["#text"]) },
                    { name: 'targetEffectLocations', value: targetEffectLocations },
                    { name: "hitDelay", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "hitDelay")["#text"]) },
                    { name: "hitProcessing", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "hitProcessing")["#text"]) },
                    { name: "delayProcessing", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "delayProcessing")["#text"]) },
                    { name: "aoeHitDelay", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "aoeHitDelay")["#text"]) },
                    { name: "hit6", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "hit6")["#text"]) },
                    { name: "hitEffectScale", value: Number(item.member.find((m: any) => m["@name"] === "hit").object.member.find((m: any) => m["@name"] === "effectScale")["#text"]) },
                    { name: 'cSkillEquipCategory', value: sequipCat },
                    { name: "effects", value: effectList }
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

    openEdition(id?: any) {
        this.inEdition = true;
        if (id) {
            this.selectedItem = this.content.find((item: { value: any; }[]) => item[0].value === id);
            this.editingItem = [
                { name: "ID", value: this.selectedItem[0].value },
                { name: "name", value: this.selectedItem[1].value },
                { name: "desc", value: this.selectedItem[2].value },
                { name: "iconID", value: this.selectedItem[3].value },
                { name: "useWeaponAnimation", value: this.selectedItem[4].value },
                { name: "characterStart", value: this.selectedItem[5].value },
                { name: "characterComplete", value: this.selectedItem[6].value },
                { name: "demonStart", value: this.selectedItem[7].value },
                { name: "demonComplete", value: this.selectedItem[8].value },
                { name: "cast5", value: this.selectedItem[9].value },
                { name: "effectScale", value: this.selectedItem[10].value },
                { name: "soundID", value: this.selectedItem[11].value },
                { name: "cast10", value: this.selectedItem[12].value },
                { name: "castEffectLocations", value: [] },
                { name: "hitEffectDelay", value: this.selectedItem[14].value },
                { name: "shoot3", value: this.selectedItem[15].value },
                { name: "shoot4", value: this.selectedItem[16].value },
                { name: "hitEffectLinger", value: this.selectedItem[17].value },
                { name: "bone", value: this.selectedItem[18].value },
                { name: "shotEffectLocations", value: [] },
                { name: "hasProjectile", value: this.selectedItem[20].value },
                { name: "hasArc", value: this.selectedItem[21].value },
                { name: "hasTrail", value: this.selectedItem[22].value },
                { name: "projectileSize", value: this.selectedItem[23].value },
                { name: "projectileDelay", value: this.selectedItem[24].value },
                { name: "bullet6", value: this.selectedItem[25].value },
                { name: "bullet7", value: this.selectedItem[26].value },
                { name: "bullet8", value: this.selectedItem[27].value },
                { name: "color1", value: this.selectedItem[28].value },
                { name: "color2", value: this.selectedItem[29].value },
                { name: "color3", value: this.selectedItem[30].value },
                { name: "effectFile", value: this.selectedItem[31].value },
                { name: "soundID", value: this.selectedItem[32].value },
                { name: "target2", value: this.selectedItem[33].value },
                { name: "knockbackShake", value: this.selectedItem[34].value },
                { name: 'targetEffectLocations', value: [] },
                { name: "hitDelay", value: this.selectedItem[36].value },
                { name: "hitProcessing", value: this.selectedItem[37].value },
                { name: "delayProcessing", value: this.selectedItem[38].value },
                { name: "aoeHitDelay", value: this.selectedItem[39].value },
                { name: "hit6", value: this.selectedItem[40].value },
                { name: "hitEffectScale", value: this.selectedItem[41].value },
                { name: 'cSkillEquipCategory', value: [] },
                { name: "effects", value: [] }
            ];


            this.selectedItem[13].value.forEach((elt: String) => this.editingItem[13].value.push(elt));

            this.selectedItem[19].value.forEach((elt: String) => this.editingItem[19].value.push(elt));

            this.selectedItem[35].value.forEach((elt: String) => this.editingItem[35].value.push(elt));

            this.selectedItem[42].value.forEach((elt: any) => {
                this.editingItem[42].value.push([
                    { name: "attackAnimationID1", value: elt[0].value },
                    { name: "attackAnimationID2", value: elt[1].value },
                    { name: "attackAnimationID3", value: elt[2].value },
                    { name: "hardAttackAnimationID1", value: elt[3].value },
                    { name: "hardAttackAnimationID2", value: elt[4].value },
                    { name: "hardAttackAnimationID3", value: elt[5].value },
                    { name: "executeSoundID", value: elt[6].value },
                    { name: "unused", value: elt[7].value },
                    { name: "hitCount", value: elt[8].value },
                    { name: "multiHitDelay", value: elt[9].value },
                    { name: "hitSoundID", value: elt[10].value }]
                )
            });
            this.selectedItem[43].value.forEach((elt: any) => this.editingItem[43].value.push(elt));

        }
        else {
            this.editingItem = [
                { name: "ID", value: 0 },
                { name: "name", value: "" },
                { name: "desc", value: "" },
                { name: "iconID", value: 0 },
                { name: "useWeaponAnimation", value: false },
                { name: "characterStart", value: 0 },
                { name: "characterComplete", value: 0 },
                { name: "demonStart", value: 0 },
                { name: "demonComplete", value: 0 },
                { name: "cast5", value: false },
                { name: "effectScale", value: 0 },
                { name: "soundID", value: 0 },
                { name: "cast10", value: 0 },
                { name: "castEffectLocations", value: [] },
                { name: "hitEffectDelay", value: 0 },
                { name: "shoot3", value: false },
                { name: "shoot4", value: 0 },
                { name: "hitEffectLinger", value: 0 },
                { name: "bone", value: "" },
                { name: "shotEffectLocations", value: [] },
                { name: "hasProjectile", value: false },
                { name: "hasArc", value: false },
                { name: "hasTrail", value: false },
                { name: "projectileSize", value: 0 },
                { name: "projectileDelay", value: 0 },
                { name: "bullet6", value: 0 },
                { name: "bullet7", value: 0 },
                { name: "bullet8", value: "" },
                { name: "color1", value: 0 },
                { name: "color2", value: 0 },
                { name: "color3", value: 0 },
                { name: "effectFile", value: "" },
                { name: "soundID", value: 0 },
                { name: "target2", value: 0 },
                { name: "knockbackShake", value: 0 },
                { name: 'targetEffectLocations', value: [] },
                { name: "hitDelay", value: 0 },
                { name: "hitProcessing", value: 0 },
                { name: "delayProcessing", value: 0 },
                { name: "aoeHitDelay", value: 0 },
                { name: "hit6", value: 0 },
                { name: "hitEffectScale", value: 0 },
                { name: 'cSkillEquipCategory', value: [] },
                { name: "effects", value: [] }
            ];

            for (let i = 0; i < 20; i++) {
                this.editingItem[13].value.push("");
                this.editingItem[19].value.push("");
                this.editingItem[35].value.push("");
                this.editingItem[42].value.push([
                    { name: "attackAnimationID1", value: 0 },
                    { name: "attackAnimationID2", value: 0 },
                    { name: "attackAnimationID3", value: 0 },
                    { name: "hardAttackAnimationID1", value: 0 },
                    { name: "hardAttackAnimationID2", value: 0 },
                    { name: "hardAttackAnimationID3", value: 0 },
                    { name: "executeSoundID", value: 0 },
                    { name: "unused", value: 0 },
                    { name: "hitCount", value: 0 },
                    { name: "multiHitDelay", value: 0 },
                    { name: "hitSoundID", value: 0 }]
                )
            }

            for (let i = 0; i < 400; i++) {
                this.editingItem[43].value.push("");
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
        this.showCast = false;
        this.showHit = false;
        this.showTarget = false;
        this.showBullet = false;
        this.showEffects = false;
        this.showEquip = false;
        this.showShoot = false;
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
        this.currentPage = event;
        this.cd.detectChanges();
    }
    writeXmlFile() {
        const confirmation = confirm('Are you sure you want to save this file? (The file will be overwritten by this change)');
        if (confirmation) {
            // Create the root XML element
            let xml = '<objects>\n';
            this.content.forEach((item: cSkillStructure) => {
                xml += '    <object name="MiCSkillData">\n';
                xml += '        <member name="base">\n';
                xml += '            <object name="MiCSkillBase">\n';
                xml += `                <member name="ID">${item[0].value || ''}</member>\n`;
                xml += `        		<member name="name"><![CDATA[${item[1].value || ''}]]></member>\n`;
                xml += `        		<member name="desc"><![CDATA[${item[2].value || ''}]]></member>\n`;
                xml += `			    <member name="iconID">${item[3].value || ''}</member>\n`;
                xml += `			    <member name="useWeaponAnimation">${item[4].value || ''}</member>\n`;
                xml += `      		</object>\n`;
                xml += '   		</member>\n';
                xml += '        <member name="cast">\n';
                xml += '            <object name="MiCSkillCast">\n';
                xml += `                <member name="characterStart">${item[5].value || 0}</member>\n`;
                xml += `        		<member name="characterComplete">${item[6].value || 0}</member>\n`;
                xml += `                <member name="demonStart">${item[7].value || 0}</member>\n`;
                xml += `        		<member name="demonComplete">${item[8].value || 0}</member>\n`;
                xml += `        		<member name="cast5">${item[9].value || false}</member>\n`;
                xml += `			    <member name="effectScale">${item[10].value || 0}</member>\n`;
                xml += `			    <member name="soundID">${item[11].value || 0}</member>\n`;
                xml += `			    <member name="cast10">${item[12].value || 0}</member>\n`;
                xml += `			    <member name="effectLocations">\n`;
                item[13].value.forEach(elt => {
                    xml += `			        <element><![CDATA[${elt}]]></element>\n`;
                })
                xml += `      		    </member>\n`;
                xml += `      		</object>\n`;
                xml += '   		</member>\n';
                xml += '        <member name="shoot">\n';
                xml += '            <object name="MiCSkillShoot">\n';
                xml += `                <member name="hitEffectDelay">${item[14].value || 0}</member>\n`;
                xml += `        		<member name="shoot3">${item[15].value || false}</member>\n`;
                xml += `                <member name="shoot4">${item[16].value || 0}</member>\n`;
                xml += `        		<member name="hitEffectLinger">${item[17].value || 1}</member>\n`;
                xml += `        		<member name="bone"><![CDATA[${item[18].value || ''}]]></member>\n`;
                xml += `			    <member name="effectLocations">\n`;
                item[19].value.forEach(elt => {
                    xml += `			        <element><![CDATA[${elt}]]></element>\n`;
                })
                xml += `      		    </member>\n`;
                xml += `      		</object>\n`;
                xml += '   		</member>\n';
                xml += '        <member name="bullet">\n';
                xml += '            <object name="MiCSkillBullet">\n';
                xml += `                <member name="hasProjectile">${item[20].value || false}</member>\n`;
                xml += `        		<member name="hasArc">${item[21].value || false}</member>\n`;
                xml += `                <member name="hasTrail">${item[22].value || false}</member>\n`;
                xml += `        		<member name="projectileSize">${item[23].value || 0}</member>\n`;
                xml += `        		<member name="projectileDelay">${item[24].value || 0}</member>\n`;
                xml += `        		<member name="bullet6">${item[25].value || 0}</member>\n`;
                xml += `        		<member name="bullet7">${item[26].value || 0}</member>\n`;
                xml += `        		<member name="bullet8"><![CDATA[${item[27].value || ''}]]></member>\n`;
                xml += `			    <member name="color">\n`;
                xml += `			        <element>${item[28].value || 0}</element>\n`;
                xml += `			        <element>${item[29].value || 0}</element>\n`;
                xml += `			        <element>${item[30].value || 0}</element>\n`;
                xml += `			    </member>\n`;
                xml += `			    <member name="effectFile"><![CDATA[${item[31].value || ''}]]></member>\n`;
                xml += '            </object>\n';
                xml += '   		</member>\n';
                xml += '        <member name="target">\n';
                xml += '            <object name="MiCSkillTarget">\n';
                xml += `                <member name="soundID">${item[32].value || 0}</member>\n`;
                xml += `        		<member name="target2">${item[33].value || 0}</member>\n`;
                xml += `        		<member name="knockbackShake">${item[34].value || 0}</member>\n`;
                xml += `			    <member name="effectLocations">\n`;
                item[35].value.forEach(elt => {
                    xml += `			        <element><![CDATA[${elt}]]></element>\n`;
                })
                xml += `      		    </member>\n`;
                xml += `      		</object>\n`;
                xml += '   		</member>\n';
                xml += '        <member name="hit">\n';
                xml += '            <object name="MiCSkillHit">\n';
                xml += `                <member name="hitDelay">${item[36].value || 0}</member>\n`;
                xml += `        		<member name="hitProcessing">${item[37].value || 0}</member>\n`;
                xml += `                <member name="delayProcessing">${item[38].value || 0}</member>\n`;
                xml += `        		<member name="aoeHitDelay">${item[39].value || 0}</member>\n`;
                xml += `        		<member name="hit6">${item[40].value || 0}</member>\n`;
                xml += `        		<member name="effectScale">${item[41].value || 0}</member>\n`;
                xml += `      		</object>\n`;
                xml += '   		</member>\n';
                xml += '        <member name="equip">\n';
                item[42].value.forEach(elt => {
                    xml += '            <element>\n';
                    xml += '                <object name="MiCSkillEquipCategory">\n';
                    xml += '                    <member name="attackAnimationIDs">\n';
                    xml += `			            <element>${elt[0].value || 0}</element>\n`;
                    xml += `			            <element>${elt[1].value || 0}</element>\n`;
                    xml += `			            <element>${elt[2].value || 0}</element>\n`;
                    xml += '                    </member>\n';
                    xml += '                    <member name="hardAttackAnimationIDs">\n';
                    xml += `			            <element>${elt[3].value || 0}</element>\n`;
                    xml += `			            <element>${elt[4].value || 0}</element>\n`;
                    xml += `			            <element>${elt[5].value || 0}</element>\n`;
                    xml += '                    </member>\n';
                    xml += `                    <member name="executeSoundID">${elt[6].value || 0}</member>\n`;
                    xml += `        		    <member name="unused">${elt[7].value || 0}</member>\n`;
                    xml += `                    <member name="hitCount">${elt[8].value || 0}</member>\n`;
                    xml += `        		    <member name="multiHitDelay">${elt[9].value || 0}</member>\n`;
                    xml += `        		    <member name="hitSoundID">${elt[10].value || 0}</member>\n`;
                    xml += `      		    </object>\n`;
                    xml += '            </element>\n';

                })
                xml += '        </member>\n';
                xml += '        <member name="effects">\n';
                item[43].value.forEach(elt => {
                    xml += `            <element><![CDATA[${elt}]]> </element>\n`;
                });
                xml += `      	</member>\n`;
                xml += `    </object>\n`;
            });
            xml += '</objects>';

            this.saveXmlFile.emit(xml);
        }
    }

    changeShow(str: String) {
        switch (str) {
            case "cast":
                this.showCast = !this.showCast;
                break;
            case "shoot":
                this.showShoot = !this.showShoot;
                break;
            case "target":
                this.showTarget = !this.showTarget;
                break;
            case "bullet":
                this.showBullet = !this.showBullet;
                break;
            case "equip":
                this.showEquip = !this.showEquip;
                break;
            case "hit":
                this.showHit = !this.showHit;
                break;
            case "effects":
                this.showEffects = !this.showEffects;
                break;
        }
        this.cd.detectChanges();
    }

}
