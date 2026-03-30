import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

import { Blog } from './blog';
import { SeoManager } from '../../../core/seo/seo-manager';
import { BlogStore } from '../../../core/blog/blog-store';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;
  let blogStoreMock: BlogStore;
  let seoManagerMock: SeoManager;

  beforeEach(async () => {
    blogStoreMock = {
      getBlogPosts: vi.fn().mockReturnValue([]),
    } as unknown as BlogStore;

    seoManagerMock = {
      update: vi.fn(),
    } as unknown as SeoManager;

    const mockAfAuth = {
      idTokenResult: of(null),
      onIdTokenChanged: vi.fn(),
      idToken: of(null),
      user: of(null),
      signOut: vi.fn().mockReturnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      imports: [Blog],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BlogStore, useValue: blogStoreMock },
        { provide: SeoManager, useValue: seoManagerMock },
        { provide: FIREBASE_OPTIONS, useValue: { apiKey: 'test-key', projectId: 'test' } },
        { provide: AngularFireAuth, useValue: mockAfAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get blog posts from store', () => {
    expect(component.blogPosts).toBeDefined();
  });

  it('should update SEO metadata on initialization', () => {
    expect(seoManagerMock.update).toHaveBeenCalledWith({
      title: 'Blog',
      description: 'Znanje, iskustva i novosti iz Push Serbia zajednice.',
    });
  });
});
