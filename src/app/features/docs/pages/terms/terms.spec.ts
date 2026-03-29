import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Terms } from './terms';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Terms', () => {
  let component: Terms;
  let fixture: ComponentFixture<Terms>;
  let seoManager: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [Terms],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as jasmine.SpyObj<SeoManager>;
    fixture = TestBed.createComponent(Terms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Uslovi korišćenja',
      description:
        'Uslovi korišćenja Push Serbia platforme — pravila i obaveze korisnika.',
    });
  });
});
