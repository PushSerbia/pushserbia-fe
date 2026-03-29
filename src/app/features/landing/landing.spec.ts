import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { Landing } from './landing';
import { SeoManager } from '../../../../../core/seo/seo-manager';
import { AuthClient } from '../../core/auth/auth-client';
import { ProjectStore } from '../../core/project/project-store';
import { VoteStore } from '../../core/vote/vote-store';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    const projectStoreMock = jasmine.createSpyObj('ProjectStore', ['getAll'], {
      $loading: signal(false),
    });
    projectStoreMock.getAll.and.returnValue(signal([]));

    const voteStoreMock = jasmine.createSpyObj('VoteStore', ['getAll', 'isVoted'], {
      $loading: signal(false),
    });
    voteStoreMock.getAll.and.returnValue(signal({}));

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SeoManager, useValue: jasmine.createSpyObj('SeoManager', ['update']) },
        {
          provide: AuthClient,
          useValue: jasmine.createSpyObj('AuthClient', ['signOut', 'getMe', 'updateMe'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
            userData$: of(undefined),
          }),
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
