import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Contact } from './contact';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let seoManager: any;

  beforeEach(async () => {
    const seoSpy = { update: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideRouter([]),
        { provide: SeoManager, useValue: seoSpy },
      ],
    }).compileComponents();

    seoManager = TestBed.inject(SeoManager) as any;
    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seo.update with correct title and description on initialization', () => {
    expect(seoManager.update).toHaveBeenCalledWith({
      title: 'Kontakt',
      description:
        'Kontaktiraj Push Serbia tim — email, društvene mreže, Slack i GitHub.',
    });
  });
});
