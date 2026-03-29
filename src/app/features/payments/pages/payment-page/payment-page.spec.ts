import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPage } from './payment-page';
import { provideRouter } from '@angular/router';
import { SeoManager } from '../../../../../core/seo/seo-manager';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;
  let mockSeoManager: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    mockSeoManager = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [PaymentPage],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: mockSeoManager },
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
    expect(mockSeoManager.update).toHaveBeenCalledWith({
      title: 'Podrška',
      description: 'Podrži Push Serbia zajednicu kroz Buy Me a Coffee.',
    });
  });

  it('should have support options loaded', () => {
    expect(component.supportOptions.length).toBe(3);
  });

  it('should open external URL on button click', () => {
    spyOn(window, 'open');
    const option = component.supportOptions[0];
    component.openExternal(option);
    expect(window.open).toHaveBeenCalledWith(
      option.externalUrl,
      '_blank',
      'noopener,noreferrer',
    );
  });
});
