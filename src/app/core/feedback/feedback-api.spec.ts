import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FeedbackApi } from './feedback-api';
import { Feedback } from './feedback';
import { FeedbackCategory } from './feedback-category';
import { PaginatedResponse } from '../api/paginated-response';

describe('FeedbackApi', () => {
  let service: FeedbackApi;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackApi, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(FeedbackApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should extend ApiClient', () => {
      // Verify the service has ApiClient methods
      expect(typeof service.getAll).toBe('function');
      expect(typeof service.getById).toBe('function');
      expect(typeof service.create).toBe('function');
      expect(typeof service.update).toBe('function');
      expect(typeof service.delete).toBe('function');
    });
  });

  describe('endpoint configuration', () => {
    it('should have endpoint set to "feedback"', () => {
      expect((service as any).endpoint).toBe('feedback');
    });

    it('should use correct endpoint for all requests', () => {
      service.getAll().subscribe();

      const req = httpTesting.expectOne('/feedback');
      expect(req.request.url).toBe('/feedback');
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });
    });

    it('should prepend forward slash to endpoint', () => {
      service.getAll().subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url.startsWith('/feedback');
      });
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });
    });
  });

  describe('inherited CRUD operations', () => {
    describe('getAll', () => {
      it('should get all feedback items', () => {
        const mockFeedback: Feedback[] = [
          {
            id: '1',
            userId: 'user1',
            message: 'Great platform',
            rating: 5,
            category: FeedbackCategory.Other,
            createdAt: new Date('2025-01-01'),
          },
          {
            id: '2',
            userId: 'user2',
            message: 'Good but needs improvement',
            rating: 4,
            category: FeedbackCategory.Other,
            createdAt: new Date('2025-01-02'),
          },
        ];

        const mockResponse: PaginatedResponse<Feedback> = {
          data: mockFeedback,
          total: 2,
          limit: 10,
          offset: 0,
          currentPage: 1,
          totalPages: 1,
        };

        service.getAll().subscribe((result) => {
          expect(result.data).toEqual(mockFeedback);
          expect(result.total).toBe(2);
        });

        const req = httpTesting.expectOne('/feedback');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });

      it('should support pagination parameters', () => {
        const mockResponse: PaginatedResponse<Feedback> = {
          data: [],
          total: 100,
          limit: 10,
          offset: 20,
          currentPage: 3,
          totalPages: 10,
        };

        service.getAll({ limit: 10, offset: 20 }).subscribe();

        const req = httpTesting.expectOne('/feedback?limit=10&offset=20');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });

      it('should handle empty feedback list', () => {
        const mockResponse: PaginatedResponse<Feedback> = {
          data: [],
          total: 0,
          limit: 10,
          offset: 0,
          currentPage: 1,
          totalPages: 0,
        };

        service.getAll().subscribe((result) => {
          expect(result.data).toEqual([]);
          expect(result.total).toBe(0);
        });

        const req = httpTesting.expectOne('/feedback');
        req.flush(mockResponse);
      });
    });

    describe('getById', () => {
      it('should get a single feedback item by ID', () => {
        const mockFeedback: Feedback = {
          id: '1',
          userId: 'user1',
          message: 'Test feedback',
          rating: 5,
          category: FeedbackCategory.Other,
          createdAt: new Date('2025-01-01'),
        };

        service.getById('1').subscribe((result) => {
          expect(result).toEqual(mockFeedback);
        });

        const req = httpTesting.expectOne('/feedback/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockFeedback);
      });

      it('should construct correct URL with feedback ID', () => {
        service.getById('feedback-123').subscribe();

        const req = httpTesting.expectOne('/feedback/feedback-123');
        req.flush({});
      });

      it('should handle feedback with special characters in ID', () => {
        service.getById('feedback@uuid-123').subscribe();

        const req = httpTesting.expectOne((request) => {
          return request.url === '/feedback/feedback@uuid-123';
        });
        req.flush({});
      });
    });

    describe('create', () => {
      it('should create new feedback', () => {
        const newFeedback: Partial<Feedback> = {
          message: 'New feedback',
          rating: 4,
          category: FeedbackCategory.Other,
        };

        const createdFeedback: Feedback = {
          id: '1',
          userId: 'user1',
          message: 'New feedback',
          rating: 4,
          category: FeedbackCategory.Other,
          createdAt: new Date('2025-01-01'),
        };

        service.create(newFeedback).subscribe((result) => {
          expect(result).toEqual(createdFeedback);
        });

        const req = httpTesting.expectOne('/feedback');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newFeedback);
        req.flush(createdFeedback);
      });

      it('should send feedback data in request body', () => {
        const feedbackData: Partial<Feedback> = {
          message: 'Test message',
          rating: 5,
          category: FeedbackCategory.Other,
        };

        service.create(feedbackData).subscribe();

        const req = httpTesting.expectOne('/feedback');
        expect(req.request.body).toEqual(feedbackData);
        req.flush({});
      });

      it('should return created feedback with ID', () => {
        const created: Feedback = {
          id: '999',
          userId: 'user1',
          message: 'New feedback',
          rating: 5,
          category: FeedbackCategory.Other,
          createdAt: new Date('2025-01-01'),
        };

        service.create({}).subscribe((result) => {
          expect(result.id).toBeDefined();
          expect(result.createdAt).toBeDefined();
        });

        const req = httpTesting.expectOne('/feedback');
        req.flush(created);
      });
    });

    describe('update', () => {
      it('should update existing feedback', () => {
        const updateData: Partial<Feedback> = {
          message: 'Updated message',
          rating: 3,
        };

        const updatedFeedback: Feedback = {
          id: '1',
          userId: 'user1',
          message: 'Updated message',
          rating: 3,
          category: FeedbackCategory.Other,
          createdAt: new Date('2025-01-01'),
        };

        service.update('1', updateData).subscribe((result) => {
          expect(result).toEqual(updatedFeedback);
        });

        const req = httpTesting.expectOne('/feedback/1');
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(updateData);
        req.flush(updatedFeedback);
      });

      it('should use PATCH method for updates', () => {
        service.update('1', { message: 'Updated' }).subscribe();

        const req = httpTesting.expectOne('/feedback/1');
        expect(req.request.method).toBe('PATCH');
        req.flush({});
      });

      it('should support partial updates', () => {
        const partialUpdate: Partial<Feedback> = { rating: 2 };

        service.update('1', partialUpdate).subscribe();

        const req = httpTesting.expectOne('/feedback/1');
        expect(req.request.body).toEqual(partialUpdate);
        req.flush({});
      });
    });

    describe('delete', () => {
      it('should delete feedback by ID', () => {
        const deletedFeedback: Feedback = {
          id: '1',
          userId: 'user1',
          message: 'Deleted feedback',
          rating: 5,
          category: FeedbackCategory.Other,
          createdAt: new Date('2025-01-01'),
        };

        service.delete('1').subscribe((result) => {
          expect(result).toEqual(deletedFeedback);
        });

        const req = httpTesting.expectOne('/feedback/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(deletedFeedback);
      });

      it('should use DELETE HTTP method', () => {
        service.delete('feedback-123').subscribe();

        const req = httpTesting.expectOne('/feedback/feedback-123');
        expect(req.request.method).toBe('DELETE');
        req.flush({});
      });

      it('should handle deletion of non-existent feedback', () => {
        service.delete('non-existent').subscribe();

        const req = httpTesting.expectOne('/feedback/non-existent');
        req.flush({});
      });
    });
  });

  describe('type safety', () => {
    it('should maintain type safety for feedback objects', () => {
      const feedback: Feedback = {
        id: '1',
        userId: 'user1',
        message: 'Test',
        rating: 5,
        category: FeedbackCategory.Other,
        createdAt: new Date('2025-01-01'),
      };

      service.create(feedback).subscribe((result) => {
        // TypeScript should recognize this as Feedback type
        expect(result.id).toBeDefined();
        expect(result.message).toBeDefined();
      });

      const req = httpTesting.expectOne('/feedback');
      req.flush(feedback);
    });
  });

  describe('error handling', () => {
    it('should propagate HTTP errors', () => {
      let error: any;

      service.getAll().subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/feedback');
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should handle 404 errors', () => {
      let error: any;

      service.getById('non-existent').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/feedback/non-existent');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(error.status).toBe(404);
    });

    it('should handle 500 server errors', () => {
      let error: any;

      service.getAll().subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne('/feedback');
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(error.status).toBe(500);
    });
  });

  describe('observable behavior', () => {
    it('should return observables from all methods', () => {
      const getAll$ = service.getAll();
      const getById$ = service.getById('1');
      const create$ = service.create({});
      const update$ = service.update('1', {});
      const delete$ = service.delete('1');

      expect(getAll$.subscribe).toBeDefined();
      expect(getById$.subscribe).toBeDefined();
      expect(create$.subscribe).toBeDefined();
      expect(update$.subscribe).toBeDefined();
      expect(delete$.subscribe).toBeDefined();
    });

    it('should allow subscription without errors', () => {
      let subscribed = false;

      service.getAll().subscribe({
        next: () => {
          subscribed = true;
        },
      });

      const req = httpTesting.expectOne('/feedback');
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });

      expect(subscribed).toBe(true);
    });
  });
});
