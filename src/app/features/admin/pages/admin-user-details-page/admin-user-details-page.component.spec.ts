import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetailsPageComponent } from './admin-user-details-page.component';

describe('AdminUserDetailsPageComponent', () => {
  let component: AdminUserDetailsPageComponent;
  let fixture: ComponentFixture<AdminUserDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
