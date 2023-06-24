import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPCInvisibleDataComponent } from './npc-invisible-data.component';

describe('NPCInvisibleDataComponent', () => {
  let component: NPCInvisibleDataComponent;
  let fixture: ComponentFixture<NPCInvisibleDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NPCInvisibleDataComponent]
    });
    fixture = TestBed.createComponent(NPCInvisibleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
