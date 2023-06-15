import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisassemblyTriggerDataComponent } from './disassembly-trigger-data.component';

describe('DisassemblyTriggerDataComponent', () => {
  let component: DisassemblyTriggerDataComponent;
  let fixture: ComponentFixture<DisassemblyTriggerDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisassemblyTriggerDataComponent]
    });
    fixture = TestBed.createComponent(DisassemblyTriggerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
