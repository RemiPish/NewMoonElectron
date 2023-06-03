import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgMakerComponent } from './pg-maker.component';

describe('PgMakerComponent', () => {
  let component: PgMakerComponent;
  let fixture: ComponentFixture<PgMakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgMakerComponent]
    });
    fixture = TestBed.createComponent(PgMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
