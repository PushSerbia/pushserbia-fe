import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProfileSidenav } from './profile-sidenav';
import { AuthService } from '../../../../../../core/auth/auth.service';

describe('ProfileSidenav', () => {
  let component: ProfileSidenav;
  let fixture: ComponentFixture<ProfileSidenav>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj(
      'AuthService',
      ['signOut', 'getMe', 'updateMe'],
      {
        $authenticated: jasmine.createSpy().and.returnValue(false),
        $userData: jasmine.createSpy().and.returnValue(undefined),
        $fullUserData: jasmine.createSpy().and.returnValue(null),
        userData$: of(undefined),
      },
    );

    await TestBed.configureTestingModule({
      imports: [ProfileSidenav],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
