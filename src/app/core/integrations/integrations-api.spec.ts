import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { IntegrationsApi, SubscriptionData } from './integrations-api';
import { environment } from '../../../environments/environment';

describe('IntegrationsApi', () => {
  let service: IntegrationsApi;
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegrationsApi, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(IntegrationsApi);
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

    it('should have subscription methods', () => {
      expect(typeof service.subscribeForPayment).toBe('function');
      expect(typeof service.subscribeForNewsletter).toBe('function');
    });
  });

  describe('subscribeForNewsletter', () => {
    it('should send POST request to subscribe endpoint', () => {
      const email = 'user@example.com';

      service.subscribeForNewsletter(email).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.method).toBe('POST');
    });

    it('should include email in request body', () => {
      const email = 'test@example.com';

      service.subscribeForNewsletter(email).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe(email);
    });

    it('should include newsletter tag in request', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.tags).toBe('newsletter');
    });

    it('should not include name in newsletter subscription', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.name).toBeUndefined();
    });

    it('should not include message in newsletter subscription', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.message).toBeUndefined();
    });

    it('should handle successful subscription', () => {
      let success = false;

      service.subscribeForNewsletter('test@example.com').subscribe(() => {
        success = true;
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush({ success: true });

      expect(success).toBe(true);
    });

    it('should handle subscription with valid email format', () => {
      const validEmails = [
        'user@example.com',
        'first.last@example.co.uk',
        'user+tag@example.com',
        'user123@example-domain.com',
      ];

      validEmails.forEach((email) => {
        service.subscribeForNewsletter(email).subscribe();

        const req = httpTesting.expectOne(
          `${environment.apiUrl}/integrations/subscribe`,
        );
        expect(req.request.body.email).toBe(email);
        req.flush({});
      });
    });

    it('should handle subscription with empty string email', () => {
      service.subscribeForNewsletter('').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe('');
      req.flush({});
    });

    it('should return observable', () => {
      const result$ = service.subscribeForNewsletter('test@example.com');

      expect(result$.subscribe).toBeDefined();
    });

    it('should allow chaining with other operators', () => {
      service
        .subscribeForNewsletter('test@example.com')
        .subscribe({
          next: () => {},
          error: () => {},
          complete: () => {},
        });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush({});
    });
  });

  describe('subscribeForPayment', () => {
    it('should send POST request to subscribe endpoint', () => {
      service.subscribeForPayment('user@example.com', 'John Doe', 'Payment inquiry').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.method).toBe('POST');
    });

    it('should include email in request body', () => {
      const email = 'test@example.com';

      service.subscribeForPayment(email, 'Test User', 'Message').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe(email);
    });

    it('should include name in request body', () => {
      const name = 'John Doe';

      service.subscribeForPayment('test@example.com', name, 'Message').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.name).toBe(name);
    });

    it('should include message in request body', () => {
      const message = 'I want to support Push Serbia';

      service.subscribeForPayment('test@example.com', 'User', message).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.message).toBe(message);
    });

    it('should include newsletter tag in request', () => {
      service.subscribeForPayment('test@example.com', 'User', 'Message').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.tags).toBe('newsletter');
    });

    it('should handle all three parameters', () => {
      const email = 'supporter@example.com';
      const name = 'Jane Smith';
      const message = 'I would like to contribute';

      service.subscribeForPayment(email, name, message).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe(email);
      expect(req.request.body.name).toBe(name);
      expect(req.request.body.message).toBe(message);
      expect(req.request.body.tags).toBe('newsletter');
    });

    it('should handle successful payment subscription', () => {
      let success = false;

      service.subscribeForPayment('test@example.com', 'User', 'Message').subscribe(() => {
        success = true;
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush({ success: true });

      expect(success).toBe(true);
    });

    it('should handle empty string values', () => {
      service.subscribeForPayment('', '', '').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe('');
      expect(req.request.body.name).toBe('');
      expect(req.request.body.message).toBe('');
      req.flush({});
    });

    it('should handle special characters in parameters', () => {
      const email = 'user+tag@example.com';
      const name = "O'Brien";
      const message = 'Support for "open-source" projects & society';

      service.subscribeForPayment(email, name, message).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.email).toBe(email);
      expect(req.request.body.name).toBe(name);
      expect(req.request.body.message).toBe(message);
      req.flush({});
    });

    it('should handle unicode characters in parameters', () => {
      const email = 'user@example.com';
      const name = 'Иван Петров';
      const message = 'Хочу помочь заявкам';

      service.subscribeForPayment(email, name, message).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.body.name).toBe(name);
      expect(req.request.body.message).toBe(message);
      req.flush({});
    });

    it('should return observable', () => {
      const result$ = service.subscribeForPayment('test@example.com', 'User', 'Message');

      expect(result$.subscribe).toBeDefined();
    });

    it('should allow chaining with other operators', () => {
      service
        .subscribeForPayment('test@example.com', 'User', 'Message')
        .subscribe({
          next: () => {},
          error: () => {},
          complete: () => {},
        });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush({});
    });
  });

  describe('API URL construction', () => {
    it('should use environment API URL', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.url).toBe(`${environment.apiUrl}/integrations/subscribe`);
      req.flush({});
    });

    it('should construct correct endpoint URL', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne((request) => {
        return request.url.includes('/integrations/subscribe');
      });
      req.flush({});
    });
  });

  describe('request body structure', () => {
    it('should send SubscriptionData in request body for newsletter', () => {
      const email = 'test@example.com';

      service.subscribeForNewsletter(email).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      const body: SubscriptionData = req.request.body;

      expect(body.email).toBe(email);
      expect(body.tags).toBe('newsletter');
      expect(body.name).toBeUndefined();
      expect(body.message).toBeUndefined();

      req.flush({});
    });

    it('should send SubscriptionData in request body for payment', () => {
      const email = 'test@example.com';
      const name = 'User';
      const message = 'Message';

      service.subscribeForPayment(email, name, message).subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      const body: SubscriptionData = req.request.body;

      expect(body.email).toBe(email);
      expect(body.name).toBe(name);
      expect(body.message).toBe(message);
      expect(body.tags).toBe('newsletter');

      req.flush({});
    });
  });

  describe('HTTP method and headers', () => {
    it('should use POST method for newsletter subscription', () => {
      service.subscribeForNewsletter('test@example.com').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should use POST method for payment subscription', () => {
      service.subscribeForPayment('test@example.com', 'User', 'Message').subscribe();

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('error handling', () => {
    it('should propagate HTTP errors for newsletter subscription', () => {
      let error: any;

      service.subscribeForNewsletter('test@example.com').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should propagate HTTP errors for payment subscription', () => {
      let error: any;

      service.subscribeForPayment('test@example.com', 'User', 'Message').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.error(new ErrorEvent('Network error'));

      expect(error).toBeDefined();
    });

    it('should handle 400 bad request error', () => {
      let error: any;

      service.subscribeForNewsletter('invalid-email').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });

      expect(error.status).toBe(400);
    });

    it('should handle 500 server error', () => {
      let error: any;

      service.subscribeForNewsletter('test@example.com').subscribe({
        error: (err) => (error = err),
      });

      const req = httpTesting.expectOne(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(error.status).toBe(500);
    });
  });

  describe('multiple subscriptions', () => {
    it('should handle multiple concurrent subscriptions', () => {
      let count = 0;

      service.subscribeForNewsletter('user1@example.com').subscribe(() => count++);
      service.subscribeForNewsletter('user2@example.com').subscribe(() => count++);

      const requests = httpTesting.match(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(requests.length).toBe(2);

      requests.forEach((req) => {
        req.flush({});
      });

      expect(count).toBe(2);
    });

    it('should handle mixed subscription types', () => {
      service.subscribeForNewsletter('user1@example.com').subscribe();
      service.subscribeForPayment('user2@example.com', 'User', 'Message').subscribe();

      const requests = httpTesting.match(
        `${environment.apiUrl}/integrations/subscribe`,
      );
      expect(requests.length).toBe(2);

      const newsletterReq = requests[0];
      const paymentReq = requests[1];

      expect(newsletterReq.request.body.name).toBeUndefined();
      expect(paymentReq.request.body.name).toBe('User');

      newsletterReq.flush({});
      paymentReq.flush({});
    });
  });
});
