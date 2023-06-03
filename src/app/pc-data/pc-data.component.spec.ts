import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcDataComponent } from './pc-data.component';

describe('PcDataComponent', () => {
  let component: PcDataComponent;
  let fixture: ComponentFixture<PcDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcDataComponent]
    });
    fixture = TestBed.createComponent(PcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
