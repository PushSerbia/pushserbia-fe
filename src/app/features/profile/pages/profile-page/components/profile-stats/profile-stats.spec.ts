import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStats } from './profile-stats';
import { UserRole } from '../../../../../../core/user/user-role';

describe('ProfileStats', () => {
  let component: ProfileStats;
  let fixture: ComponentFixture<ProfileStats>;

  const mockData = {
    id: '1',
    firebaseUid: 'fb-1',
    fullName: 'Test User',
    email: 'test@example.com',
    gravatar: '',
    imageUrl: '',
    role: UserRole.Participant,
    isBlocked: false,
    level: 1,
    projectsProposed: 0,
    projectsSupported: 0,
    name: 'Test User',
    emailVerified: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStats],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileStats);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('data', mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
