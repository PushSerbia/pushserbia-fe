import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectCardNew } from './project-card-new';
import { AuthService } from '../../../core/auth/auth.service';

describe('ProjectCardNew', () => {
  let component: ProjectCardNew;
  let fixture: ComponentFixture<ProjectCardNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardNew],
      providers: [
        provideRouter([]),
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

    fixture = TestBed.createComponent(ProjectCardNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
