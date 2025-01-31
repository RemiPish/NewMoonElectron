import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDataComponent } from './exchange-data.component';

describe('ExchangeDataComponent', () => {
  let component: ExchangeDataComponent;
  let fixture: ComponentFixture<ExchangeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeDataComponent]
    });
    fixture = TestBed.createComponent(ExchangeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
