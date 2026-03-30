import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { LandingProjects } from './landing-projects';
import { ProjectStore } from '../../../../core/project/project-store';
import { VoteStore } from '../../../../core/vote/vote-store';
import { AuthClient } from '../../../../core/auth/auth-client';

describe('LandingProjects', () => {
  let component: LandingProjects;
  let fixture: ComponentFixture<LandingProjects>;

  beforeEach(async () => {
    const projectStoreMock = {
      getAll: vi.fn().mockReturnValue(signal([])),
      getBySlug: vi.fn(),
      $loading: signal(false),
    } as unknown as ProjectStore;

    const voteStoreMock = {
      getAll: vi.fn().mockReturnValue(signal({})),
      isVoted: vi.fn(),
      $loading: signal(false),
    } as unknown as VoteStore;

    await TestBed.configureTestingModule({
      imports: [LandingProjects],
      providers: [
        provideRouter([]),
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: VoteStore, useValue: voteStoreMock },
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
