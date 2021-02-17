import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReferentielComponent } from './detail-referentiel.component';

describe('DetailReferentielComponent', () => {
  let component: DetailReferentielComponent;
  let fixture: ComponentFixture<DetailReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
