import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriUnionKreuzItemDataComponent } from './tri-union-kreuz-item-data.component';

describe('TriUnionKreuzItemDataComponent', () => {
  let component: TriUnionKreuzItemDataComponent;
  let fixture: ComponentFixture<TriUnionKreuzItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriUnionKreuzItemDataComponent]
    });
    fixture = TestBed.createComponent(TriUnionKreuzItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
