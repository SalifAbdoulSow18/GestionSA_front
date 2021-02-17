import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersArchiveComponent } from './list-users-archive.component';

describe('ListUsersArchiveComponent', () => {
  let component: ListUsersArchiveComponent;
  let fixture: ComponentFixture<ListUsersArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
