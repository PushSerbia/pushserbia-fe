import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectDetailsSidenav } from './project-details-sidenav';
import { Project } from '../../../../../../core/project/project';
import { ProjectStatus } from '../../../../../../core/project/project-status';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { UserRole } from '../../../../../../core/user/user-role';
import { AuthService } from '../../../../../../core/auth/auth.service';

describe('ProjectDetailsSidenav', () => {
  let component: ProjectDetailsSidenav;
  let fixture: ComponentFixture<ProjectDetailsSidenav>;

  const mockProject: Project = {
    id: '1',
    slug: 'test',
    name: 'Test',
    shortDescription: 'desc',
    description: 'full desc',
    image: '',
    status: ProjectStatus.Voting,
    totalVoters: 0,
    totalVotes: 0,
    isBanned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    creator: { id: '1', fullName: 'Test', imageUrl: '', gravatar: '' },
  };

  const mockUser: FirebaseUserData = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    role: UserRole.Participant,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsSidenav],
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

    fixture = TestBed.createComponent(ProjectDetailsSidenav);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('project', mockProject);
    componentRef.setInput('currentUser', mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
