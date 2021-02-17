import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGrpCompetenceComponent } from './detail-grp-competence.component';

describe('DetailGrpCompetenceComponent', () => {
  let component: DetailGrpCompetenceComponent;
  let fixture: ComponentFixture<DetailGrpCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGrpCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGrpCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
