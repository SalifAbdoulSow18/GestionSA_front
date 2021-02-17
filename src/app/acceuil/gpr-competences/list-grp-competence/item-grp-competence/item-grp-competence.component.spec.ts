import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGrpCompetenceComponent } from './item-grp-competence.component';

describe('ItemGrpCompetenceComponent', () => {
  let component: ItemGrpCompetenceComponent;
  let fixture: ComponentFixture<ItemGrpCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGrpCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGrpCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
