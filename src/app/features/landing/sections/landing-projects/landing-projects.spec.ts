import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { LandingProjects } from './landing-projects';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { VoteStoreService } from '../../../../core/vote/vote.store.service';
import { AuthService } from '../../../../core/auth/auth.service';

describe('LandingProjects', () => {
  let component: LandingProjects;
  let fixture: ComponentFixture<LandingProjects>;

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

    await TestBed.configureTestingModule({
      imports: [LandingProjects],
      providers: [
        provideRouter([]),
        { provide: ProjectStoreService, useValue: projectStoreMock },
        { provide: VoteStoreService, useValue: voteStoreMock },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['signOut'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
          }),
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
