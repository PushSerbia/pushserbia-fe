import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetails } from './admin-user-details';

describe('AdminUserDetails', () => {
  let component: AdminUserDetails;
  let fixture: ComponentFixture<AdminUserDetails>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
