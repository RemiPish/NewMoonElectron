import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SItemDataComponent } from './s-item-data.component';

describe('SItemDataComponent', () => {
  let component: SItemDataComponent;
  let fixture: ComponentFixture<SItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SItemDataComponent]
    });
    fixture = TestBed.createComponent(SItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
