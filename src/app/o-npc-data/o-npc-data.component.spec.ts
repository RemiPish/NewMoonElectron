import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ONpcDataComponent } from './o-npc-data.component';

describe('ONpcDataComponent', () => {
  let component: ONpcDataComponent;
  let fixture: ComponentFixture<ONpcDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ONpcDataComponent]
    });
    fixture = TestBed.createComponent(ONpcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
