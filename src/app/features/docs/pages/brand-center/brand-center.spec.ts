import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrandCenter } from './brand-center';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('BrandCenter', () => {
  let component: BrandCenter;
  let fixture: ComponentFixture<BrandCenter>;
  let seoManager: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [BrandCenter],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as jasmine.SpyObj<SeoManager>;
    fixture = TestBed.createComponent(BrandCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Brend centar',
      description:
        'Push Serbia brend resursi — logotip, boje, tipografija i smernice za korišćenje.',
    });
  });
});
