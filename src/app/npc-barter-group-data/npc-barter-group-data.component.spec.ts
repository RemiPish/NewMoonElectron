import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBarterGroupDataComponent } from './npc-barter-group-data.component';

describe('NpcBarterGroupDataComponent', () => {
  let component: NpcBarterGroupDataComponent;
  let fixture: ComponentFixture<NpcBarterGroupDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpcBarterGroupDataComponent]
    });
    fixture = TestBed.createComponent(NpcBarterGroupDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
