import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Licensing } from './licensing';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Licensing', () => {
  let component: Licensing;
  let fixture: ComponentFixture<Licensing>;
  let seoManager: any;

  beforeEach(async () => {
    const seoSpy = { update: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Licensing],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as any;
    fixture = TestBed.createComponent(Licensing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Licence',
      description:
        'Informacije o licencama koje koristi Push Serbia platforma i open-source projekti.',
    });
  });
});
