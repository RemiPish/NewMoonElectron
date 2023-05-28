import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeunionItemCatalystDataComponent } from './deunion-item-catalyst-data.component';

describe('DeunionItemCatalystDataComponent', () => {
  let component: DeunionItemCatalystDataComponent;
  let fixture: ComponentFixture<DeunionItemCatalystDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeunionItemCatalystDataComponent]
    });
    fixture = TestBed.createComponent(DeunionItemCatalystDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
