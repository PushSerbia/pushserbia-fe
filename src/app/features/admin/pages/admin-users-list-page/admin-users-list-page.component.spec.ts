import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersListPageComponent } from './admin-users-list-page.component';

describe('AdminUsersListPageComponent', () => {
  let component: AdminUsersListPageComponent;
  let fixture: ComponentFixture<AdminUsersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
