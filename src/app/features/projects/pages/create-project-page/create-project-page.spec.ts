import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { CreateProjectPage } from './create-project-page';
import { ProjectStore } from '../../../../core/project/project-store';
import { SeoManager } from '../../../../core/seo/seo-manager';
import { AuthClient } from '../../../../core/auth/auth-client';

describe('CreateProjectPage', () => {
  let component: CreateProjectPage;
  let fixture: ComponentFixture<CreateProjectPage>;

  beforeEach(async () => {
    const projectStoreMock = {
      getAll: vi.fn().mockReturnValue(signal([])),
      getBySlug: vi.fn().mockReturnValue(signal(undefined)),
      create: vi.fn(),
      update: vi.fn(),
      $loading: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [CreateProjectPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: SeoManager, useValue: { update: vi.fn() } },
        {
          provide: AuthClient,
          useValue: {
            signOut: vi.fn(),
            getMe: vi.fn(),
            updateMe: vi.fn(),
            $authenticated: vi.fn().mockReturnValue(false),
            $userData: vi.fn().mockReturnValue(undefined),
            $fullUserData: vi.fn().mockReturnValue(null),
            userData$: of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
