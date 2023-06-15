import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HNpcDataComponent } from './h-npc-data.component';

describe('HNpcDataComponent', () => {
  let component: HNpcDataComponent;
  let fixture: ComponentFixture<HNpcDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HNpcDataComponent]
    });
    fixture = TestBed.createComponent(HNpcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
