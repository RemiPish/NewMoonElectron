import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCultureDataComponent } from './c-culture-data.component';

describe('CCultureDataComponent', () => {
  let component: CCultureDataComponent;
  let fixture: ComponentFixture<CCultureDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CCultureDataComponent]
    });
    fixture = TestBed.createComponent(CCultureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
