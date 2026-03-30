import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Careers } from './careers';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Careers', () => {
  let component: Careers;
  let fixture: ComponentFixture<Careers>;
  let seoManager: any;

  beforeEach(async () => {
    const seoSpy = { update: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Careers],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as any;
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
