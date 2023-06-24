import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBattleTalkDataComponent } from './c-battle-talk-data.component';

describe('CBattleTalkDataComponent', () => {
  let component: CBattleTalkDataComponent;
  let fixture: ComponentFixture<CBattleTalkDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CBattleTalkDataComponent]
    });
    fixture = TestBed.createComponent(CBattleTalkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
