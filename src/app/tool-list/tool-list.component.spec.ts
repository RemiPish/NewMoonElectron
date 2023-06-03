import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolListComponent } from './tool-list.component';

describe('ToolListComponent', () => {
  let component: ToolListComponent;
  let fixture: ComponentFixture<ToolListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolListComponent]
    });
    fixture = TestBed.createComponent(ToolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
