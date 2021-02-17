import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrpCompetenceComponent } from './edit-grp-competence.component';

describe('EditGrpCompetenceComponent', () => {
  let component: EditGrpCompetenceComponent;
  let fixture: ComponentFixture<EditGrpCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGrpCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrpCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
