import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { CreateProjectPage } from './create-project-page';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { AuthService } from '../../../../core/auth/auth.service';

describe('CreateProjectPage', () => {
  let component: CreateProjectPage;
  let fixture: ComponentFixture<CreateProjectPage>;

  beforeEach(async () => {
    const projectStoreMock = jasmine.createSpyObj(
      'ProjectStoreService',
      ['getAll', 'getBySlug', 'create', 'update'],
      { $loading: signal(false) },
    );
    projectStoreMock.getAll.and.returnValue(signal([]));
    projectStoreMock.getBySlug.and.returnValue(signal(undefined));

    await TestBed.configureTestingModule({
      imports: [CreateProjectPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProjectStoreService, useValue: projectStoreMock },
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
