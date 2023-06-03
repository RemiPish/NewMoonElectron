import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldDataComponent } from './world-data.component';

describe('WorldDataComponent', () => {
  let component: WorldDataComponent;
  let fixture: ComponentFixture<WorldDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldDataComponent]
    });
    fixture = TestBed.createComponent(WorldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
