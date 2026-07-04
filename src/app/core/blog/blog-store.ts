import { Injectable, signal } from '@angular/core';
import { BlogPost } from './blog';
import { BLOG_POSTS } from './blog-posts.data';

@Injectable({
  providedIn: 'root',
})
export class BlogStore {
  private readonly _blogPosts = signal<BlogPost[]>(BLOG_POSTS);

  readonly $blogPosts = this._blogPosts.asReadonly();

  getBlogPosts(): BlogPost[] {
    return this._blogPosts();
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this._blogPosts().find((post) => post.slug === slug);
  }
}
