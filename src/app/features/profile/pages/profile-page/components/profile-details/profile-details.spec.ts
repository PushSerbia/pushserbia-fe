import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { of } from 'rxjs';

import { ProfileDetails } from './profile-details';
import { ModalService } from '../../../../../../core/modal/modal.service';
import { AuthService } from '../../../../../../core/auth/auth.service';

@Component({
  template: '<app-profile-details [data]="mockData" />',
  imports: [ProfileDetails],
})
class TestHostComponent {
  mockData = {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  };
}

describe('ProfileDetails', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideRouter([]),
        {
          provide: ModalService,
          useValue: jasmine.createSpyObj('ModalService', ['open', 'close', 'remove']),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['signOut', 'getMe', 'updateMe'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
            userData$: of(undefined),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const profileDetails = fixture.debugElement.children[0].componentInstance;
    expect(profileDetails).toBeTruthy();
  });
});
