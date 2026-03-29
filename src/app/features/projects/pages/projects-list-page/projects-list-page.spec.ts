import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { ProjectsListPage } from './projects-list-page';
import { ProjectStore } from '../../../../core/project/project-store';
import { VoteStore } from '../../../../core/vote/vote-store';
import { AuthClient } from '../../../../core/auth/auth-client';
import { SeoManager } from '../../../../../core/seo/seo-manager';

describe('ProjectsListPage', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async () => {
    const projectStoreMock = jasmine.createSpyObj(
      'ProjectStore',
      ['getAll', 'getBySlug'],
      { $loading: signal(false) },
    );
    projectStoreMock.getAll.and.returnValue(signal([]));

    const voteStoreMock = jasmine.createSpyObj(
      'VoteStore',
      ['getAll', 'isVoted'],
      { $loading: signal(false) },
    );
    voteStoreMock.getAll.and.returnValue(signal({}));

    const authServiceMock = jasmine.createSpyObj(
      'AuthClient',
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
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: VoteStore, useValue: voteStoreMock },
        { provide: AuthClient, useValue: authServiceMock },
        { provide: SeoManager, useValue: jasmine.createSpyObj('SeoManager', ['update']) },
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
