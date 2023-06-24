import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisassemblyDataComponent } from './disassembly-data.component';

describe('DisassemblyDataComponent', () => {
  let component: DisassemblyDataComponent;
  let fixture: ComponentFixture<DisassemblyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisassemblyDataComponent]
    });
    fixture = TestBed.createComponent(DisassemblyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
