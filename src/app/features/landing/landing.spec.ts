import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { Landing } from './landing';
import { SeoService } from '../../core/seo/seo.service';
import { AuthService } from '../../core/auth/auth.service';
import { ProjectStoreService } from '../../core/project/project.store.service';
import { VoteStoreService } from '../../core/vote/vote.store.service';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    const projectStoreMock = jasmine.createSpyObj('ProjectStoreService', ['getAll'], {
      $loading: signal(false),
    });
    projectStoreMock.getAll.and.returnValue(signal([]));

    const voteStoreMock = jasmine.createSpyObj('VoteStoreService', ['getAll', 'isVoted'], {
      $loading: signal(false),
    });
    voteStoreMock.getAll.and.returnValue(signal({}));

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SeoService, useValue: jasmine.createSpyObj('SeoService', ['update']) },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['signOut', 'getMe', 'updateMe'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
            userData$: of(undefined),
          }),
        },
        { provide: ProjectStoreService, useValue: projectStoreMock },
        { provide: VoteStoreService, useValue: voteStoreMock },
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
