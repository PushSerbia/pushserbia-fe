import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';

import { Blog } from './blog';
import { SeoManager } from '../../../core/seo/seo-manager';
import { BlogStore } from '../../../core/blog/blog-store';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;
  let blogStoreMock: jasmine.SpyObj<BlogStore>;
  let seoManagerMock: jasmine.SpyObj<SeoManager>;

  beforeEach(async () => {
    blogStoreMock = jasmine.createSpyObj('BlogStore', ['getBlogPosts'], {
      $blogPosts: signal([]),
    });
    blogStoreMock.getBlogPosts.and.returnValue([]);

    seoManagerMock = jasmine.createSpyObj('SeoManager', ['update']);

    await TestBed.configureTestingModule({
      imports: [Blog],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BlogStore, useValue: blogStoreMock },
        { provide: SeoManager, useValue: seoManagerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject BlogStore and call getBlogPosts', () => {
    expect(blogStoreMock.getBlogPosts).toHaveBeenCalled();
  });

  it('should update SEO metadata on initialization', () => {
    expect(seoManagerMock.update).toHaveBeenCalledWith({
      title: 'Blog',
      description: 'Znanje, iskustva i novosti iz Push Serbia zajednice.',
    });
  });

  it('should display blog posts from store', () => {
    const mockPosts = [
      {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: 'Test Author',
        date: '2024-01-01',
        image: 'test.jpg',
        tags: ['test'],
      },
    ];

    blogStoreMock.getBlogPosts.and.returnValue(mockPosts);

    const component2 = TestBed.createComponent(Blog).componentInstance;
    expect(component2.blogPosts).toBeDefined();
  });
});
