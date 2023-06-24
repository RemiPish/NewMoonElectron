import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CZoneRelationDataComponent } from './c-zone-relation-data.component';

describe('CZoneRelationDataComponent', () => {
  let component: CZoneRelationDataComponent;
  let fixture: ComponentFixture<CZoneRelationDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CZoneRelationDataComponent]
    });
    fixture = TestBed.createComponent(CZoneRelationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
