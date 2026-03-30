import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';

import { NotificationsListPage } from './notifications-list-page';
import { AuthClient } from '../../../../core/auth/auth-client';

describe('NotificationsListPage', () => {
  let component: NotificationsListPage;
  let fixture: ComponentFixture<NotificationsListPage>;

  beforeEach(async () => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    } as unknown as AuthClient;

    await TestBed.configureTestingModule({
      imports: [NotificationsListPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthClient, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
