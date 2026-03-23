import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPage } from './payment-page';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SeoService } from '../../../../core/seo/seo.service';
import { IntegrationsService } from '../../../../core/integrations/integrations.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;
  let mockSeoService: jasmine.SpyObj<SeoService>;
  let mockIntegrationsService: jasmine.SpyObj<IntegrationsService>;

  beforeEach(async () => {
    mockSeoService = jasmine.createSpyObj('SeoService', ['update']);
    mockIntegrationsService = jasmine.createSpyObj('IntegrationsService', [
      'subscribeForPayment',
    ]);

    await TestBed.configureTestingModule({
      imports: [PaymentPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SeoService, useValue: mockSeoService },
        { provide: IntegrationsService, useValue: mockIntegrationsService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ isOneTime: 'true', amount: '25', title: 'Jednokratna podrška' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update SEO on init', () => {
    expect(mockSeoService.update).toHaveBeenCalledWith({
      title: 'Donacija',
      description: 'Podrži Push Serbia zajednicu donacijom.',
    });
  });

  it('should parse query params on init', () => {
    expect(component.isOneTime).toBeTrue();
    expect(component.amount).toBe(25);
    expect(component.title).toBe('Jednokratna podrška');
  });

  it('should match selected option from query params', () => {
    expect(component.selectedOption).toBeTruthy();
    expect(component.selectedOption?.title).toBe('Jednokratna podrška');
  });

  it('should toggle options selector', () => {
    expect(component.showOptionsSelector).toBeFalse();
    component.toggleOptionsSelector();
    expect(component.showOptionsSelector).toBeTrue();
    component.toggleOptionsSelector();
    expect(component.showOptionsSelector).toBeFalse();
  });

  it('should initialize form with validators', () => {
    expect(component.paymentForm.get('fullName')).toBeTruthy();
    expect(component.paymentForm.get('email')).toBeTruthy();
    expect(component.paymentForm.get('agreeTerms')).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.paymentForm.valid).toBeFalse();
  });

  it('should have valid form when filled correctly', () => {
    component.paymentForm.patchValue({
      fullName: 'Test User',
      email: 'test@example.com',
      agreeTerms: true,
    });
    expect(component.paymentForm.valid).toBeTrue();
  });

  it('should mark controls as touched on invalid submit', () => {
    component.onSubmit();
    expect(component.paymentForm.get('fullName')?.touched).toBeTrue();
    expect(component.paymentForm.get('email')?.touched).toBeTrue();
  });
});
