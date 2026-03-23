import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectDetailsPage } from './project-details-page';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { VoteStoreService } from '../../../../core/vote/vote.store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { ComponentRef, signal } from '@angular/core';

describe('ProjectDetailsPage', () => {
  let component: ProjectDetailsPage;
  let componentRef: ComponentRef<ProjectDetailsPage>;
  let fixture: ComponentFixture<ProjectDetailsPage>;
  let mockProjectStore: jasmine.SpyObj<ProjectStoreService>;
  let mockVoteStore: jasmine.SpyObj<VoteStoreService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSeoService: jasmine.SpyObj<SeoService>;

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
    mockProjectStore = jasmine.createSpyObj(
      'ProjectStoreService',
      ['getBySlug', 'updateStateBySlug'],
      { $loading: signal(false) },
    );
    mockProjectStore.getBySlug.and.returnValue(signal(mockProject as any));

    mockVoteStore = jasmine.createSpyObj('VoteStoreService', ['isVoted', 'create'], {
      $loading: signal(false),
    });
    mockVoteStore.isVoted.and.returnValue(signal(false));

    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      $userData: signal(undefined),
    });

    mockSeoService = jasmine.createSpyObj('SeoService', ['update']);

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsPage],
      providers: [
        provideRouter([]),
        { provide: ProjectStoreService, useValue: mockProjectStore },
        { provide: VoteStoreService, useValue: mockVoteStore },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SeoService, useValue: mockSeoService },
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
