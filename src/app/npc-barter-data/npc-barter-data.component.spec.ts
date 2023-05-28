import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBarterDataComponent } from './npc-barter-data.component';

describe('NpcBarterDataComponent', () => {
  let component: NpcBarterDataComponent;
  let fixture: ComponentFixture<NpcBarterDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpcBarterDataComponent]
    });
    fixture = TestBed.createComponent(NpcBarterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
