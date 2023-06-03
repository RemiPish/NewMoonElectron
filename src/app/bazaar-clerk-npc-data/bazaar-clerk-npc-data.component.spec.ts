import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaarClerkNpcDataComponent } from './bazaar-clerk-npc-data.component';

describe('BazaarClerkNpcDataComponent', () => {
  let component: BazaarClerkNpcDataComponent;
  let fixture: ComponentFixture<BazaarClerkNpcDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BazaarClerkNpcDataComponent]
    });
    fixture = TestBed.createComponent(BazaarClerkNpcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
