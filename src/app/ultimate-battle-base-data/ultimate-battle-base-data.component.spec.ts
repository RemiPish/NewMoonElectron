import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateBattleBaseDataComponent } from './ultimate-battle-base-data.component';

describe('UltimateBattleBaseDataComponent', () => {
  let component: UltimateBattleBaseDataComponent;
  let fixture: ComponentFixture<UltimateBattleBaseDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UltimateBattleBaseDataComponent]
    });
    fixture = TestBed.createComponent(UltimateBattleBaseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
