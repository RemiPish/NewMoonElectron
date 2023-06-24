import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBarterTextDataComponent } from './npc-barter-text-data.component';

describe('NpcBarterTextDataComponent', () => {
  let component: NpcBarterTextDataComponent;
  let fixture: ComponentFixture<NpcBarterTextDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpcBarterTextDataComponent]
    });
    fixture = TestBed.createComponent(NpcBarterTextDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
