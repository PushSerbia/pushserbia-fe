import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { Landing } from './landing';
import { SeoManager } from '../../core/seo/seo-manager';
import { AuthClient } from '../../core/auth/auth-client';
import { ProjectStore } from '../../core/project/project-store';
import { VoteStore } from '../../core/vote/vote-store';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    const projectStoreMock = {
      getAll: vi.fn().mockReturnValue(signal([])),
      $loading: signal(false),
    } as unknown as ProjectStore;

    const voteStoreMock = {
      getAll: vi.fn().mockReturnValue(signal({})),
      isVoted: vi.fn(),
      $loading: signal(false),
    } as unknown as VoteStore;

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SeoManager, useValue: { update: vi.fn() } as unknown as SeoManager },
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
          } as unknown as AuthClient,
        },
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: VoteStore, useValue: voteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
