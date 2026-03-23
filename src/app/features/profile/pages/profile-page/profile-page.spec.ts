import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProfilePage } from './profile-page';
import { AuthService } from '../../../../core/auth/auth.service';
import { ModalService } from '../../../../core/modal/modal.service';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

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
    authServiceMock.getMe.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ModalService,
          useValue: jasmine.createSpyObj('ModalService', ['open', 'close', 'remove']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
