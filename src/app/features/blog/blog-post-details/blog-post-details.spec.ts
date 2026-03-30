import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

import { BlogPostDetails } from './blog-post-details';
import { SeoManager } from '../../../core/seo/seo-manager';
import { BlogStore } from '../../../core/blog/blog-store';
import { BlogPost } from '../../../core/blog/blog';

describe('BlogPostDetails', () => {
  let component: BlogPostDetails;
  let fixture: ComponentFixture<BlogPostDetails>;
  let blogStoreMock: BlogStore;
  let seoManagerMock: SeoManager;

  const mockBlogPost: BlogPost = {
    id: '1',
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    excerpt: 'This is a test excerpt',
    content: '<p>This is test content</p>',
    author: 'Test Author',
    date: '2024-01-15',
    image: 'https://example.com/test.jpg',
    tags: ['test', 'blog'],
  };

  beforeEach(async () => {
    blogStoreMock = {
      getBlogPostBySlug: vi.fn(),
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
      imports: [BlogPostDetails],
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

    fixture = TestBed.createComponent(BlogPostDetails);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blog post by slug on init', () => {
    (blogStoreMock.getBlogPostBySlug as any).mockReturnValue(mockBlogPost);

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('slug', 'test-blog-post');
    });

    component.ngOnInit();

    expect(blogStoreMock.getBlogPostBySlug).toHaveBeenCalledWith('test-blog-post');
    expect(component.post).toEqual(mockBlogPost);
  });

  it('should update SeoManager with blog post metadata when post exists', () => {
    (blogStoreMock.getBlogPostBySlug as any).mockReturnValue(mockBlogPost);

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('slug', 'test-blog-post');
    });

    component.ngOnInit();

    expect(seoManagerMock.update).toHaveBeenCalledWith({
      title: 'Test Blog Post',
      description: 'This is a test excerpt',
      image: 'https://example.com/test.jpg',
      type: 'article',
      jsonLd: {
        '@type': 'BlogPosting',
        headline: 'Test Blog Post',
        description: 'This is a test excerpt',
        image: 'https://example.com/test.jpg',
        datePublished: '2024-01-15',
        author: {
          '@type': 'Person',
          name: 'Test Author',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Push Serbia',
          logo: { '@type': 'ImageObject', url: 'https://pushserbia.com/pushserbia.png' },
        },
      },
    });
  });

  it('should not update SeoManager when post is not found', () => {
    (blogStoreMock.getBlogPostBySlug as any).mockReturnValue(undefined);

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('slug', 'non-existent-post');
    });

    component.ngOnInit();

    expect(seoManagerMock.update).not.toHaveBeenCalled();
  });

  it('should set post to undefined when post is not found', () => {
    (blogStoreMock.getBlogPostBySlug as any).mockReturnValue(undefined);

    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('slug', 'non-existent-post');
    });

    component.ngOnInit();

    expect(component.post).toBeUndefined();
  });
});
