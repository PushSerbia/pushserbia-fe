import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Careers } from './careers';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Careers', () => {
  let component: Careers;
  let fixture: ComponentFixture<Careers>;
  let seoManager: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [Careers],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as jasmine.SpyObj<SeoManager>;
    fixture = TestBed.createComponent(Careers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Karijere',
      description:
        'Pridruži se Push Serbia timu — otvorene pozicije i mogućnosti za saradnju.',
    });
  });
});
