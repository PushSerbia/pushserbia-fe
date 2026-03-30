import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Terms } from './terms';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Terms', () => {
  let component: Terms;
  let fixture: ComponentFixture<Terms>;
  let seoManager: any;

  beforeEach(async () => {
    const seoSpy = { update: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Terms],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as any;
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
