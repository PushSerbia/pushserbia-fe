import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UserWidget } from './user-widget';
import { AuthService } from '../../../core/auth/auth.service';

describe('UserWidget', () => {
  let component: UserWidget;
  let fixture: ComponentFixture<UserWidget>;

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
      imports: [UserWidget],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
