import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProjectMemberApi } from './project-member-api';
import { ProjectMember, ProjectVoter } from './project';

describe('ProjectMemberApi', () => {
  let service: ProjectMemberApi;
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectMemberApi, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProjectMemberApi);
    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have all member methods', () => {
      expect(typeof service.getMembers).toBe('function');
      expect(typeof service.getVoters).toBe('function');
      expect(typeof service.addMember).toBe('function');
      expect(typeof service.removeMember).toBe('function');
    });
  });

  describe('getMembers', () => {
    it('should get members for a project', () => {
      const projectId = 'project-123';
      const mockMembers: ProjectMember[] = [
        {
          id: 'member-1',
          userId: 'user-1',
          assignedAt: new Date('2025-01-01'),
          user: {
            id: 'user-1',
            fullName: 'John Doe',
            imageUrl: 'https://example.com/john.jpg',
            gravatar: 'hash1',
          },
        },
        {
          id: 'member-2',
          userId: 'user-2',
          assignedAt: new Date('2025-01-05'),
          user: {
            id: 'user-2',
            fullName: 'Jane Smith',
            imageUrl: 'https://example.com/jane.jpg',
            gravatar: 'hash2',
          },
        },
      ];

      service.getMembers(projectId).subscribe((members) => {
        expect(members).toEqual(mockMembers);
        expect(members.length).toBe(2);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMembers);
    });

    it('should construct correct URL with project ID', () => {
      const projectId = 'abc-123';

      service.getMembers(projectId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      expect(req.request.url).toBe(`/projects/${projectId}/members`);
      req.flush([]);
    });

    it('should handle empty members list', () => {
      const projectId = 'project-empty';

      service.getMembers(projectId).subscribe((members) => {
        expect(members).toEqual([]);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      req.flush([]);
    });

    it('should handle project ID with special characters', () => {
      const projectId = 'project@uuid-123';

      service.getMembers(projectId).subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === `/projects/${projectId}/members`;
      });
      req.flush([]);
    });

    it('should return observable of ProjectMember array', () => {
      service.getMembers('project-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members');
      const mockMember: ProjectMember = {
        id: 'member-1',
        userId: 'user-1',
        assignedAt: new Date('2025-01-01'),
        user: {
          id: 'user-1',
          fullName: 'Test User',
          imageUrl: 'https://example.com/test.jpg',
          gravatar: 'hash1',
        },
      };
      req.flush([mockMember]);
    });

    it('should handle multiple members', () => {
      const projectId = 'project-123';
      const mockMembers = Array.from({ length: 10 }, (_, i) => ({
        id: `member-${i}`,
        userId: `user-${i}`,
        assignedAt: new Date('2025-01-01'),
        user: {
          id: `user-${i}`,
          fullName: `User ${i}`,
          imageUrl: `https://example.com/user${i}.jpg`,
          gravatar: `hash${i}`,
        },
      }));

      service.getMembers(projectId).subscribe((members) => {
        expect(members.length).toBe(10);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      req.flush(mockMembers);
    });
  });

  describe('getVoters', () => {
    it('should get voters for a project', () => {
      const projectId = 'project-123';
      const mockVoters: ProjectVoter[] = [
        {
          id: 'voter-1',
          fullName: 'Voter One',
          imageUrl: 'https://example.com/voter1.jpg',
          gravatar: 'hash1',
        },
        {
          id: 'voter-2',
          fullName: 'Voter Two',
          imageUrl: 'https://example.com/voter2.jpg',
          gravatar: 'hash2',
        },
      ];

      service.getVoters(projectId).subscribe((voters) => {
        expect(voters).toEqual(mockVoters);
        expect(voters.length).toBe(2);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members/voters`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVoters);
    });

    it('should construct correct URL for voters endpoint', () => {
      const projectId = 'project-456';

      service.getVoters(projectId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members/voters`);
      expect(req.request.url).toBe(`/projects/${projectId}/members/voters`);
      req.flush([]);
    });

    it('should handle empty voters list', () => {
      const projectId = 'project-no-votes';

      service.getVoters(projectId).subscribe((voters) => {
        expect(voters).toEqual([]);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members/voters`);
      req.flush([]);
    });

    it('should return observable of ProjectVoter array', () => {
      service.getVoters('project-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members/voters');
      const mockVoter: ProjectVoter = {
        id: 'voter-1',
        fullName: 'Test Voter',
        imageUrl: 'https://example.com/voter.jpg',
        gravatar: 'hash1',
      };
      req.flush([mockVoter]);
    });

    it('should handle multiple voters', () => {
      const projectId = 'project-123';
      const mockVoters = Array.from({ length: 20 }, (_, i) => ({
        id: `voter-${i}`,
        fullName: `Voter ${i}`,
        imageUrl: `https://example.com/voter${i}.jpg`,
        gravatar: `hash${i}`,
      }));

      service.getVoters(projectId).subscribe((voters) => {
        expect(voters.length).toBe(20);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members/voters`);
      req.flush(mockVoters);
    });
  });

  describe('addMember', () => {
    it('should add a member to a project', () => {
      const projectId = 'project-123';
      const userId = 'user-new';
      const newMember: ProjectMember = {
        id: 'member-new',
        userId: userId,
        assignedAt: new Date('2025-03-29'),
        user: {
          id: userId,
          fullName: 'New Member',
          imageUrl: 'https://example.com/new.jpg',
          gravatar: 'hash-new',
        },
      };

      service.addMember(projectId, userId).subscribe((member) => {
        expect(member).toEqual(newMember);
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ userId });
      req.flush(newMember);
    });

    it('should send userId in request body', () => {
      const projectId = 'project-123';
      const userId = 'user-456';

      service.addMember(projectId, userId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      expect(req.request.body.userId).toBe(userId);
      req.flush({});
    });

    it('should use POST method', () => {
      service.addMember('project-1', 'user-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should return the added member', () => {
      const addedMember: ProjectMember = {
        id: 'member-1',
        userId: 'user-1',
        assignedAt: new Date('2025-03-29'),
        user: {
          id: 'user-1',
          fullName: 'Added User',
          imageUrl: 'https://example.com/added.jpg',
          gravatar: 'hash-added',
        },
      };

      service.addMember('project-1', 'user-1').subscribe((member) => {
        expect(member.user.fullName).toBe('Added User');
        expect(member.user.imageUrl).toBe('https://example.com/added.jpg');
      });

      const req = httpTesting.expectOne('/projects/project-1/members');
      req.flush(addedMember);
    });

    it('should handle project ID with special characters', () => {
      const projectId = 'project@uuid-123';

      service.addMember(projectId, 'user-1').subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === `/projects/${projectId}/members`;
      });
      req.flush({});
    });

    it('should handle user ID with special characters', () => {
      const projectId = 'project-1';
      const userId = 'user@email-123';

      service.addMember(projectId, userId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members`);
      expect(req.request.body.userId).toBe(userId);
      req.flush({});
    });
  });

  describe('removeMember', () => {
    it('should remove a member from a project', () => {
      const projectId = 'project-123';
      const userId = 'user-remove';

      let completed = false;

      service.removeMember(projectId, userId).subscribe({
        complete: () => {
          completed = true;
        },
      });

      const req = httpTesting.expectOne(`/projects/${projectId}/members/${userId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      expect(completed).toBe(true);
    });

    it('should use DELETE method', () => {
      service.removeMember('project-1', 'user-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members/user-1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should construct correct URL with project and user ID', () => {
      const projectId = 'project-456';
      const userId = 'user-789';

      service.removeMember(projectId, userId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members/${userId}`);
      expect(req.request.url).toBe(`/projects/${projectId}/members/${userId}`);
      req.flush(null);
    });

    it('should handle project ID with special characters', () => {
      const projectId = 'project@uuid-123';

      service.removeMember(projectId, 'user-1').subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === `/projects/${projectId}/members/user-1`;
      });
      req.flush(null);
    });

    it('should handle user ID with special characters', () => {
      const projectId = 'project-1';
      const userId = 'user@email-123';

      service.removeMember(projectId, userId).subscribe();

      const req = httpTesting.expectOne(`/projects/${projectId}/members/${userId}`);
      req.flush(null);
    });

    it('should complete the observable after response', () => {
      let emitted = false;
      let completed = false;

      service.removeMember('project-1', 'user-1').subscribe({
        next: () => {
          emitted = true;
        },
        complete: () => {
          completed = true;
        },
      });

      const req = httpTesting.expectOne('/projects/project-1/members/user-1');
      req.flush(null);

      expect(completed).toBe(true);
    });
  });

  describe('HTTP methods', () => {
    it('should use GET for getMembers', () => {
      service.getMembers('project-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should use GET for getVoters', () => {
      service.getVoters('project-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members/voters');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should use POST for addMember', () => {
      service.addMember('project-1', 'user-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should use DELETE for removeMember', () => {
      service.removeMember('project-1', 'user-1').subscribe();

      const req = httpTesting.expectOne('/projects/project-1/members/user-1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('observable behavior', () => {
    it('should return observables from all methods', () => {
      const getMembers$ = service.getMembers('project-1');
      const getVoters$ = service.getVoters('project-1');
      const addMember$ = service.addMember('project-1', 'user-1');
      const removeMember$ = service.removeMember('project-1', 'user-1');

      expect(getMembers$.subscribe).toBeDefined();
      expect(getVoters$.subscribe).toBeDefined();
      expect(addMember$.subscribe).toBeDefined();
      expect(removeMember$.subscribe).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should propagate HTTP errors from getMembers', () => {
      let error: any;

      service.getMembers('project-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members');
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should propagate HTTP errors from getVoters', () => {
      let error: any;

      service.getVoters('project-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members/voters');
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should propagate HTTP errors from addMember', () => {
      let error: any;

      service.addMember('project-1', 'user-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members');
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should propagate HTTP errors from removeMember', () => {
      let error: any;

      service.removeMember('project-1', 'user-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members/user-1');
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should handle 404 errors for non-existent project', () => {
      let error: any;

      service.getMembers('non-existent').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/non-existent/members');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(error.status).toBe(404);
    });

    it('should handle 403 forbidden errors', () => {
      let error: any;

      service.removeMember('project-1', 'user-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members/user-1');
      req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      expect(error.status).toBe(403);
    });

    it('should handle 500 server errors', () => {
      let error: any;

      service.getMembers('project-1').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/projects/project-1/members');
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(error.status).toBe(500);
    });
  });

  describe('integration scenarios', () => {
    it('should handle getting and adding members in sequence', () => {
      const projectId = 'project-1';

      service.getMembers(projectId).subscribe((members) => {
        expect(members.length).toBeGreaterThanOrEqual(0);
      });

      const getReq = httpTesting.expectOne(`/projects/${projectId}/members`);
      getReq.flush([]);

      service.addMember(projectId, 'new-user').subscribe();

      const addReq = httpTesting.expectOne(`/projects/${projectId}/members`);
      addReq.flush({});
    });

    it('should handle getting voters and members together', () => {
      const projectId = 'project-1';

      service.getMembers(projectId).subscribe();
      service.getVoters(projectId).subscribe();

      const requests = httpTesting.match((request) => {
        return request.url.includes(`/projects/${projectId}`);
      });

      expect(requests.length).toBe(2);

      requests[0].flush([]);
      requests[1].flush([]);
    });

    it('should handle adding then removing a member', () => {
      const projectId = 'project-1';
      const userId = 'user-1';

      service.addMember(projectId, userId).subscribe();

      const addReq = httpTesting.expectOne(`/projects/${projectId}/members`);
      addReq.flush({ id: userId });

      service.removeMember(projectId, userId).subscribe();

      const removeReq = httpTesting.expectOne(`/projects/${projectId}/members/${userId}`);
      removeReq.flush(null);
    });
  });
});
