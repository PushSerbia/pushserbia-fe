import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrivacyPolicy } from './privacy-policy';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('PrivacyPolicy', () => {
  let component: PrivacyPolicy;
  let fixture: ComponentFixture<PrivacyPolicy>;
  let seoManager: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [PrivacyPolicy],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as jasmine.SpyObj<SeoManager>;
    fixture = TestBed.createComponent(PrivacyPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Politika privatnosti',
      description:
        'Politika privatnosti Push Serbia platforme — kako prikupljamo, koristimo i štitimo vaše podatke.',
    });
  });
});
