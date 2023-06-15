import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDevilDungeonDataComponent } from './c-devil-dungeon-data.component';

describe('CDevilDungeonDataComponent', () => {
  let component: CDevilDungeonDataComponent;
  let fixture: ComponentFixture<CDevilDungeonDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDevilDungeonDataComponent]
    });
    fixture = TestBed.createComponent(CDevilDungeonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
