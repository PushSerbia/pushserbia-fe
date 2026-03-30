import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

import { BasicLayout } from './basic-layout';
import { AuthClient } from '../../../core/auth/auth-client';

describe('LandingLayoutComponent', () => {
  let component: BasicLayout;
  let fixture: ComponentFixture<BasicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLayout],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthClient,
          useValue: {
            signOut: vi.fn(),
            $authenticated: vi.fn().mockReturnValue(false),
            $userData: vi.fn().mockReturnValue(undefined),
            $fullUserData: vi.fn().mockReturnValue(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
