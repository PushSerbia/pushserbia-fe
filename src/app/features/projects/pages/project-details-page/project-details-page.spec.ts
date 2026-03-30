import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ProjectDetailsPage } from './project-details-page';
import { ProjectStore } from '../../../../core/project/project-store';
import { VoteStore } from '../../../../core/vote/vote-store';
import { AuthClient } from '../../../../core/auth/auth-client';
import { SeoManager } from '../../../../core/seo/seo-manager';
import { ComponentRef, signal } from '@angular/core';

describe('ProjectDetailsPage', () => {
  let component: ProjectDetailsPage;
  let componentRef: ComponentRef<ProjectDetailsPage>;
  let fixture: ComponentFixture<ProjectDetailsPage>;
  let mockProjectStore: any;
  let mockVoteStore: any;
  let mockAuthClient: any;
  let mockSeoManager: any;

  const mockProject = {
    id: '1',
    slug: 'test-project',
    name: 'Test Project',
    shortDescription: 'A test project',
    description: '<p>Full description</p>',
    image: 'https://example.com/image.jpg',
    github: 'https://github.com/test',
    status: 'active',
    totalVoters: 5,
    totalVotes: 10,
    creator: { fullName: 'Test Creator', gravatar: 'abc123' },
  };

  beforeEach(async () => {
    mockProjectStore = {
      getBySlug: vi.fn().mockReturnValue(signal(mockProject as any)),
      updateStateBySlug: vi.fn(),
      $loading: signal(false),
    } as any;

    mockVoteStore = {
      isVoted: vi.fn().mockReturnValue(signal(false)),
      create: vi.fn(),
      $loading: signal(false),
    } as any;

    mockAuthClient = {
      $userData: signal(undefined),
    } as any;

    mockSeoManager = { update: vi.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsPage],
      providers: [
        provideRouter([]),
        { provide: ProjectStore, useValue: mockProjectStore },
        { provide: VoteStore, useValue: mockVoteStore },
        { provide: AuthClient, useValue: mockAuthClient },
        { provide: SeoManager, useValue: mockSeoManager },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('slug', 'test-project');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch project by slug on init', () => {
    expect(mockProjectStore.getBySlug).toHaveBeenCalledWith('test-project');
  });

  it('should set $project signal after init', () => {
    expect(component.$project).toBeTruthy();
    expect(component.$project!()).toEqual(mockProject as any);
  });

  it('should expose $currentUser from authService', () => {
    expect(component.$currentUser()).toBeUndefined();
  });
});
