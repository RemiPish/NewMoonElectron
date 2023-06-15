import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvgTrophyDataComponent } from './gvg-trophy-data.component';

describe('GvgTrophyDataComponent', () => {
  let component: GvgTrophyDataComponent;
  let fixture: ComponentFixture<GvgTrophyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GvgTrophyDataComponent]
    });
    fixture = TestBed.createComponent(GvgTrophyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
