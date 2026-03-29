import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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

    await TestBed.configureTestingModule({
      imports: [LandingProjects],
      providers: [
        provideRouter([]),
        { provide: ProjectStore, useValue: projectStoreMock },
        { provide: VoteStore, useValue: voteStoreMock },
        {
          provide: AuthClient,
          useValue: jasmine.createSpyObj('AuthClient', ['signOut', 'getMe', 'updateMe'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
            userData$: of(undefined),
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
