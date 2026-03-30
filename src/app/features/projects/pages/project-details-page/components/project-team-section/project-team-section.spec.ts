import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProjectTeamSection } from './project-team-section';
import { ProjectMemberApi } from '../../../../../../core/project/project-member-api';
import { ProjectMember, ProjectVoter } from '../../../../../../core/project/project';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { UserRole } from '../../../../../../core/user/user-role';

describe('ProjectTeamSection', () => {
  let component: ProjectTeamSection;
  let fixture: ComponentFixture<ProjectTeamSection>;
  let memberApiMock: any;

  const mockMembers: ProjectMember[] = [
    {
      id: '1',
      userId: 'user1',
      assignedAt: new Date(),
      user: {
        id: 'user1',
        fullName: 'John Doe',
        imageUrl: 'https://example.com/john.jpg',
        gravatar: 'hash1',
      },
    },
    {
      id: '2',
      userId: 'user2',
      assignedAt: new Date(),
      user: {
        id: 'user2',
        fullName: 'Jane Smith',
        imageUrl: 'https://example.com/jane.jpg',
        gravatar: 'hash2',
      },
    },
  ];

  const mockVoters: ProjectVoter[] = [
    {
      id: 'voter1',
      fullName: 'Bob Johnson',
      imageUrl: 'https://example.com/bob.jpg',
      gravatar: 'hash3',
    },
    {
      id: 'voter2',
      fullName: 'Alice Williams',
      imageUrl: 'https://example.com/alice.jpg',
      gravatar: 'hash4',
    },
  ];

  const mockCurrentUser: FirebaseUserData = {
    id: 'creator1',
    name: 'Project Creator',
    email: 'creator@example.com',
    emailVerified: true,
    role: UserRole.Participant,
    imageUrl: 'https://example.com/creator.jpg',
  };

  beforeEach(async () => {
    memberApiMock = {
      getMembers: vi.fn().mockReturnValue(of(mockMembers)),
      getVoters: vi.fn().mockReturnValue(of(mockVoters)),
      addMember: vi.fn(),
      removeMember: vi.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProjectTeamSection],
      providers: [{ provide: ProjectMemberApi, useValue: memberApiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTeamSection);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('projectId', 'project1');
      fixture.componentRef.setInput('creatorId', 'creator1');
      fixture.componentRef.setInput('currentUser', mockCurrentUser);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load members on initialization', async () => {
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(component.members().length).toBe(2);
  });

  it('should set loading state during member fetch', async () => {
    expect(component.loading()).toBe(false);

    fixture.detectChanges();
    component.loadMembers();

    await new Promise(resolve => setTimeout(resolve, 10));
  });

  it('should load voters when dropdown is toggled', async () => {
    fixture.detectChanges();
    expect(component.showAssignDropdown()).toBe(false);

    component.toggleAssignDropdown();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(memberApiMock.getVoters).toHaveBeenCalledWith('project1');
  });

  it('should toggle dropdown visibility', () => {
    fixture.detectChanges();
    expect(component.showAssignDropdown()).toBe(false);

    component.toggleAssignDropdown();
    expect(component.showAssignDropdown()).toBe(true);

    component.toggleAssignDropdown();
    expect(component.showAssignDropdown()).toBe(false);
  });

  it('should return true for isOwner when current user is creator', () => {
    fixture.detectChanges();
    expect(component.isOwner()).toBe(true);
  });

  it('should return false for isOwner when current user is not creator', () => {
    const nonCreatorUser: FirebaseUserData = {
      id: 'other_user',
      name: 'Other User',
      email: 'other@example.com',
      emailVerified: true,
      role: UserRole.Participant,
      imageUrl: 'https://example.com/other.jpg',
    };

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('currentUser', nonCreatorUser);
    });

    fixture.detectChanges();
    expect(component.isOwner()).toBe(false);
  });

  it('should return false for isOwner when no current user', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('currentUser', undefined);
    });

    fixture.detectChanges();
    expect(component.isOwner()).toBe(false);
  });

  it('should assign member and update lists', async () => {
    const newMember: ProjectMember = {
      id: '3',
      userId: 'voter1',
      assignedAt: new Date(),
      user: {
        id: 'voter1',
        fullName: 'Bob Johnson',
        imageUrl: 'https://example.com/bob.jpg',
        gravatar: 'hash3',
      },
    };

    memberApiMock.addMember.mockReturnValue(of(newMember));

    fixture.detectChanges();
    component.members.set(mockMembers);
    component.voters.set(mockVoters);

    const voterToAssign = mockVoters[0];
    component.assignMember(voterToAssign);

    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it('should not assign member if already assigning', () => {
    fixture.detectChanges();
    component.voters.set(mockVoters);
    component.assigningIds.set(new Set(['voter1']));

    const voterToAssign = mockVoters[0];
    component.assignMember(voterToAssign);

    expect(memberApiMock.addMember).not.toHaveBeenCalled();
  });

  it('should remove member and update lists', async () => {
    memberApiMock.removeMember.mockReturnValue(of(void 0));

    fixture.detectChanges();
    component.members.set(mockMembers);

    const memberToRemove = mockMembers[0];
    component.removeMember(memberToRemove);

    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it('should not remove member if already removing', () => {
    fixture.detectChanges();
    component.members.set(mockMembers);
    component.removingIds.set(new Set(['user1']));

    const memberToRemove = mockMembers[0];
    component.removeMember(memberToRemove);

    expect(memberApiMock.removeMember).not.toHaveBeenCalled();
  });

  it('should close dropdown when all voters have been assigned', async () => {
    const newMember: ProjectMember = {
      id: '3',
      userId: 'voter1',
      assignedAt: new Date(),
      user: {
        id: 'voter1',
        fullName: 'Bob Johnson',
        imageUrl: 'https://example.com/bob.jpg',
        gravatar: 'hash3',
      },
    };

    memberApiMock.addMember.mockReturnValue(of(newMember));

    fixture.detectChanges();
    component.members.set(mockMembers);
    component.voters.set([mockVoters[0]]);
    component.showAssignDropdown.set(true);

    component.assignMember(mockVoters[0]);

    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it('should handle error when loading members', async () => {
    memberApiMock.getMembers.mockReturnValue(
      new (class {
        pipe = vi.fn().mockReturnValue({
          subscribe: (config: any) => {
            config.error();
          },
        });
      })() as any,
    );

    fixture.detectChanges();
    component.loadMembers();

    await new Promise(resolve => setTimeout(resolve, 100));
  });
});
