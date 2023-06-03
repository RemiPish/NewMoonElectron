import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDevilBookBonusMitamaDataComponent } from './c-devil-book-bonus-mitama-data.component';

describe('CDevilBookBonusMitamaDataComponent', () => {
  let component: CDevilBookBonusMitamaDataComponent;
  let fixture: ComponentFixture<CDevilBookBonusMitamaDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDevilBookBonusMitamaDataComponent]
    });
    fixture = TestBed.createComponent(CDevilBookBonusMitamaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
