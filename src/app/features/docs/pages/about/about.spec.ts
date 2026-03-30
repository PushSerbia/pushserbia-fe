import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { About } from './about';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let seoManager: any;

  beforeEach(async () => {
    const seoSpy = { update: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as any;
    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'O nama',
      description:
        'Saznaj više o Push Serbia zajednici — ko smo, šta radimo i zašto podržavamo open-source projekte u Srbiji.',
    });
  });
});
