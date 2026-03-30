import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProjectsListPage } from './projects-list-page';
import { ProjectStore } from '../../../../core/project/project-store';
import { VoteStore } from '../../../../core/vote/vote-store';
import { AuthClient } from '../../../../core/auth/auth-client';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('ProjectsListPage', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async () => {
    const projectStoreMock = {
      getAll: vi.fn().mockReturnValue(signal([])),
      getBySlug: vi.fn(),
      $loading: signal(false),
    };

    const voteStoreMock = {
      getAll: vi.fn().mockReturnValue(signal({})),
      isVoted: vi.fn(),
      $loading: signal(false),
    };

    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectsListPage],
      providers: [
        provideRouter([]),
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: VoteStore, useValue: voteStoreMock },
        { provide: AuthClient, useValue: authServiceMock },
        { provide: SeoManager, useValue: { update: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
