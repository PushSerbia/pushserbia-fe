import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiClient } from './api-client';
import { PaginatedResponse } from './paginated-response';

// Concrete implementation for testing the abstract class
class TestApiClient extends ApiClient<TestModel> {
  readonly endpoint = 'test-endpoint';
}

interface TestModel {
  id: string;
  name: string;
  value: number;
}

describe('ApiClient', () => {
  let service: TestApiClient;
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestApiClient, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TestApiClient);
    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('getAll', () => {
    it('should get all items with correct endpoint', () => {
      const mockResponse: PaginatedResponse<TestModel> = {
        data: [
          { id: '1', name: 'Test 1', value: 100 },
          { id: '2', name: 'Test 2', value: 200 },
        ],
        total: 2,
        limit: 10,
        offset: 0,
        currentPage: 1,
        totalPages: 1,
      };

      service.getAll().subscribe((result) => {
        expect(result).toEqual(mockResponse);
        expect(result.data.length).toBe(2);
      });

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should pass params to the request', () => {
      const mockResponse: PaginatedResponse<TestModel> = {
        data: [],
        total: 0,
        limit: 5,
        offset: 10,
        currentPage: 1,
        totalPages: 0,
      };
      const params = new HttpParams()
        .set('limit', '5')
        .set('offset', '10');

      service.getAll(params).subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === '/test-endpoint' && request.params.get('limit') === '5';
      });
      expect(req.request.params.get('offset')).toBe('10');
      req.flush(mockResponse);
    });

    it('should accept object params and convert them', () => {
      const mockResponse: PaginatedResponse<TestModel> = {
        data: [],
        total: 0,
        limit: 20,
        offset: 0,
        currentPage: 1,
        totalPages: 0,
      };
      const params = { limit: 20, offset: 0, active: true };

      service.getAll(params).subscribe();

      const req = httpTesting.expectOne('/test-endpoint?limit=20&offset=0&active=true');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle empty results', () => {
      const mockResponse: PaginatedResponse<TestModel> = {
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

      const req = httpTesting.expectOne('/test-endpoint');
      req.flush(mockResponse);
    });
  });

  describe('getById', () => {
    it('should get a single item by ID', () => {
      const id = '123';
      const mockItem: TestModel = { id: '123', name: 'Test', value: 100 };

      service.getById(id).subscribe((result) => {
        expect(result).toEqual(mockItem);
      });

      const req = httpTesting.expectOne(`/test-endpoint/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockItem);
    });

    it('should construct URL with endpoint and ID', () => {
      service.getById('abc-123').subscribe();

      const req = httpTesting.expectOne('/test-endpoint/abc-123');
      expect(req.request.url).toContain('test-endpoint');
      expect(req.request.url).toContain('abc-123');
      req.flush({});
    });

    it('should support different response type', () => {
      interface ExtendedModel extends TestModel {
        extra: string;
      }

      const mockItem: ExtendedModel = {
        id: '123',
        name: 'Test',
        value: 100,
        extra: 'data',
      };

      service.getById<ExtendedModel>('123').subscribe((result) => {
        expect(result).toEqual(mockItem);
        expect((result as ExtendedModel).extra).toBe('data');
      });

      const req = httpTesting.expectOne('/test-endpoint/123');
      req.flush(mockItem);
    });

    it('should handle special characters in ID', () => {
      const id = 'user@example.com';

      service.getById(id).subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === `/test-endpoint/${id}`;
      });
      req.flush({});
    });
  });

  describe('create', () => {
    it('should create a new item with POST request', () => {
      const newItem: Partial<TestModel> = { name: 'New Item', value: 500 };
      const createdItem: TestModel = { id: '999', name: 'New Item', value: 500 };

      service.create(newItem).subscribe((result) => {
        expect(result).toEqual(createdItem);
      });

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newItem);
      req.flush(createdItem);
    });

    it('should pass data in request body', () => {
      const data: Partial<TestModel> = { name: 'Test', value: 123 };

      service.create(data).subscribe();

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.body).toEqual(data);
      req.flush({});
    });

    it('should return the created item with ID', () => {
      const newItem: Partial<TestModel> = { name: 'Item' };
      const created: TestModel = { id: '1', name: newItem.name || 'Item', value: 0 };

      service.create(newItem).subscribe((result) => {
        expect(result.id).toBeDefined();
      });

      const req = httpTesting.expectOne('/test-endpoint');
      req.flush(created);
    });

    it('should handle empty data creation', () => {
      service.create({}).subscribe();

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.body).toEqual({});
      req.flush({});
    });
  });

  describe('update', () => {
    it('should update an item with PATCH request', () => {
      const id = '123';
      const updateData: Partial<TestModel> = { name: 'Updated Name', value: 250 };
      const updatedItem: TestModel = {
        id,
        ...updateData,
      } as TestModel;

      service.update(id, updateData).subscribe((result) => {
        expect(result).toEqual(updatedItem);
      });

      const req = httpTesting.expectOne(`/test-endpoint/${id}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updateData);
      req.flush(updatedItem);
    });

    it('should construct correct URL with endpoint and ID', () => {
      const id = 'abc-123';

      service.update(id, { name: 'Updated' }).subscribe();

      const req = httpTesting.expectOne(`/test-endpoint/${id}`);
      expect(req.request.url).toContain('test-endpoint');
      expect(req.request.url).toContain('abc-123');
      req.flush({});
    });

    it('should support partial updates', () => {
      const id = '1';
      const partialData: Partial<TestModel> = { value: 999 };

      service.update(id, partialData).subscribe();

      const req = httpTesting.expectOne(`/test-endpoint/${id}`);
      expect(req.request.body).toEqual(partialData);
      req.flush({});
    });

    it('should return updated item from server', () => {
      const updatedItem: TestModel = { id: '1', name: 'New', value: 500 };

      service.update('1', { name: 'New' }).subscribe((result) => {
        expect(result.value).toBe(500);
      });

      const req = httpTesting.expectOne('/test-endpoint/1');
      req.flush(updatedItem);
    });

    it('should handle update with single field', () => {
      service.update('1', { value: 100 }).subscribe();

      const req = httpTesting.expectOne('/test-endpoint/1');
      expect(req.request.body).toEqual({ value: 100 });
      req.flush({});
    });
  });

  describe('delete', () => {
    it('should delete an item with DELETE request', () => {
      const id = '123';
      const deletedItem: TestModel = { id, name: 'Deleted', value: 0 };

      service.delete(id).subscribe((result) => {
        expect(result).toEqual(deletedItem);
      });

      const req = httpTesting.expectOne(`/test-endpoint/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(deletedItem);
    });

    it('should construct correct URL for deletion', () => {
      service.delete('delete-me-123').subscribe();

      const req = httpTesting.expectOne('/test-endpoint/delete-me-123');
      expect(req.request.url).toContain('delete-me-123');
      req.flush({});
    });

    it('should handle successful deletion response', () => {
      service.delete('1').subscribe((result) => {
        expect(result).toBeDefined();
      });

      const req = httpTesting.expectOne('/test-endpoint/1');
      req.flush({ id: '1', name: 'Item', value: 50 });
    });

    it('should work without expecting response body', () => {
      service.delete('1').subscribe();

      const req = httpTesting.expectOne('/test-endpoint/1');
      req.flush(null);
    });

    it('should handle special characters in ID during deletion', () => {
      const id = 'user-123-delete';

      service.delete(id).subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url === `/test-endpoint/${id}`;
      });
      req.flush({});
    });
  });

  describe('endpoint handling', () => {
    it('should prepend forward slash to endpoint', () => {
      service.getAll().subscribe();

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.url).toMatch(/^\/test-endpoint/);
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });
    });

    it('should handle complex endpoint paths', () => {
      TestBed.resetTestingModule();

      class ComplexApiClient extends ApiClient<TestModel> {
        readonly endpoint = 'api/v1/resources/items';
      }

      TestBed.configureTestingModule({
        providers: [ComplexApiClient, provideHttpClient(), provideHttpClientTesting()],
      });

      const complexService = TestBed.inject(ComplexApiClient);
      const complexHttpTesting = TestBed.inject(HttpTestingController);

      complexService.getAll().subscribe();

      const req = complexHttpTesting.expectOne('/api/v1/resources/items');
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });
    });
  });

  describe('HTTP method types', () => {
    it('should use GET for getAll', () => {
      service.getAll().subscribe();

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.method).toBe('GET');
      req.flush({ data: [], total: 0, limit: 0, offset: 0, currentPage: 1, totalPages: 0 });
    });

    it('should use GET for getById', () => {
      service.getById('1').subscribe();

      const req = httpTesting.expectOne('/test-endpoint/1');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should use POST for create', () => {
      service.create({}).subscribe();

      const req = httpTesting.expectOne('/test-endpoint');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should use PATCH for update', () => {
      service.update('1', {}).subscribe();

      const req = httpTesting.expectOne('/test-endpoint/1');
      expect(req.request.method).toBe('PATCH');
      req.flush({});
    });

    it('should use DELETE for delete', () => {
      service.delete('1').subscribe();

      const req = httpTesting.expectOne('/test-endpoint/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
