import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidenav } from './profile-sidenav';

describe('ProfileSidenav', () => {
  let component: ProfileSidenav;
  let fixture: ComponentFixture<ProfileSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSidenav],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
