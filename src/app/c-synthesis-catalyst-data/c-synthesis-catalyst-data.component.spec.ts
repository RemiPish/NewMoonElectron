import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSynthesisCatalystDataComponent } from './c-synthesis-catalyst-data.component';

describe('CSynthesisCatalystDataComponent', () => {
  let component: CSynthesisCatalystDataComponent;
  let fixture: ComponentFixture<CSynthesisCatalystDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSynthesisCatalystDataComponent]
    });
    fixture = TestBed.createComponent(CSynthesisCatalystDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
