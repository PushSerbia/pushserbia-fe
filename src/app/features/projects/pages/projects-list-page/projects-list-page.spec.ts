import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { ProjectsListPage } from './projects-list-page';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { VoteStoreService } from '../../../../core/vote/vote.store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { SeoService } from '../../../../core/seo/seo.service';

describe('ProjectsListPage', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async () => {
    const projectStoreMock = jasmine.createSpyObj(
      'ProjectStoreService',
      ['getAll', 'getBySlug'],
      { $loading: signal(false) },
    );
    projectStoreMock.getAll.and.returnValue(signal([]));

    const voteStoreMock = jasmine.createSpyObj(
      'VoteStoreService',
      ['getAll', 'isVoted'],
      { $loading: signal(false) },
    );
    voteStoreMock.getAll.and.returnValue(signal({}));

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
      imports: [ProjectsListPage],
      providers: [
        provideRouter([]),
        { provide: ProjectStoreService, useValue: projectStoreMock },
        { provide: VoteStoreService, useValue: voteStoreMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: SeoService, useValue: jasmine.createSpyObj('SeoService', ['update']) },
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
