import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';

import { CTitleDataComponent } from '../c-title-data/c-title-data.component';
import { DevilDataComponent } from '../devil-data/devil-data.component';
import { SkillDataComponent } from '../skill-data/skill-data.component';
import { CSkillComponent } from '../c-skill/c-skill.component';
import { CModelDataComponent } from '../c-model-data/c-model-data.component';
import { CIconDataComponent } from '../c-icon-data/c-icon-data.component';
import { GuardianUnlockDataComponent } from '../guardian-unlock-data/guardian-unlock-data.component';

const { XMLParser } = require("fast-xml-parser");

export type finalDemonStructure = [
  { name: 'ID', value: number },
  { name: 'name', value: string },
  { name: 'title', value: number }
];

@Component({
  selector: 'app-demon-maker',
  templateUrl: './demon-maker.component.html',
  styleUrls: ['./demon-maker.component.scss']
})
export class DemonMakerComponent {

}
