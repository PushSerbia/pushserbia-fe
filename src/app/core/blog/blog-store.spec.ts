import { TestBed } from '@angular/core/testing';
import { BlogStore } from './blog-store';
import { BlogPost } from './blog';

describe('BlogStore', () => {
  let store: BlogStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogStore],
    });
    store = TestBed.inject(BlogStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('getBlogPosts', () => {
    it('should return an array of blog posts', () => {
      const posts = store.getBlogPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should return all blog posts', () => {
      const posts = store.getBlogPosts();

      // From the source file, there are 7 posts
      expect(posts.length).toBe(7);
    });

    it('should contain blog posts with required properties', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.id).toBeDefined();
        expect(post.title).toBeDefined();
        expect(post.slug).toBeDefined();
        expect(post.author).toBeDefined();
        expect(post.date).toBeDefined();
        expect(post.excerpt).toBeDefined();
        expect(post.content).toBeDefined();
        expect(post.image).toBeDefined();
        expect(post.tags).toBeDefined();
      });
    });

    it('should have unique IDs for each post', () => {
      const posts = store.getBlogPosts();
      const ids = posts.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(posts.length);
    });

    it('should have unique slugs for each post', () => {
      const posts = store.getBlogPosts();
      const slugs = posts.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(posts.length);
    });

    it('should contain posts with non-empty titles', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.title.length).toBeGreaterThan(0);
      });
    });

    it('should contain posts with non-empty content', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.content.length).toBeGreaterThan(0);
      });
    });

    it('should contain posts with tags', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(Array.isArray(post.tags)).toBe(true);
        expect(post.tags?.length).toBeGreaterThan(0);
      });
    });

    it('should contain posts with valid image URLs', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.image).toMatch(/^https?:\/\//);
      });
    });

    it('should return same data on multiple calls', () => {
      const posts1 = store.getBlogPosts();
      const posts2 = store.getBlogPosts();

      expect(posts1).toEqual(posts2);
    });

    it('should have first post with correct title', () => {
      const posts = store.getBlogPosts();

      expect(posts[0].title).toBe('Zašto smo pokrenuli Push Serbia');
    });

    it('should have proper date format', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        // Check that date matches YYYY-MM-DD format
        expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should return a blog post when slug matches', () => {
      const post = store.getBlogPostBySlug('zasto-smo-pokrenuli-push-serbia');

      expect(post).toBeDefined();
      expect(post?.title).toBe('Zašto smo pokrenuli Push Serbia');
    });

    it('should return undefined when slug does not match', () => {
      const post = store.getBlogPostBySlug('non-existent-slug');

      expect(post).toBeUndefined();
    });

    it('should return correct post for second blog post', () => {
      const post = store.getBlogPostBySlug('kako-izgleda-prvi-doprinos');

      expect(post).toBeDefined();
      expect(post?.title).toBe('Kako izgleda prvi doprinos open-source projektu');
    });

    it('should return correct post for third blog post', () => {
      const post = store.getBlogPostBySlug('sta-znaci-softver-za-opste-dobro');

      expect(post).toBeDefined();
      expect(post?.title).toBe('Šta znači "softver za opšte dobro"');
    });

    it('should return correct post for fourth blog post', () => {
      const post = store.getBlogPostBySlug(
        'kako-zajednica-odlucuje-koji-projekat-ide-u-razvoj',
      );

      expect(post).toBeDefined();
      expect(post?.title).toBe('Kako zajednica odlučuje koji projekat ide u razvoj');
    });

    it('should return correct post for fifth blog post', () => {
      const post = store.getBlogPostBySlug('5-lekcija-iz-prve-godine');

      expect(post).toBeDefined();
      expect(post?.title).toBe('5 lekcija iz prve godine Push Serbia zajednice');
    });

    it('should return correct post for sixth blog post', () => {
      const post = store.getBlogPostBySlug('dizajneri-u-open-source');

      expect(post).toBeDefined();
      expect(post?.title).toBe('Dizajneri u open-source: zašto vas trebamo');
    });

    it('should return correct post for seventh blog post', () => {
      const post = store.getBlogPostBySlug('kako-organizujemo-rad-na-projektima');

      expect(post).toBeDefined();
      expect(post?.title).toBe('Kako organizujemo rad na projektima: iza kulisa');
    });

    it('should be case-sensitive for slug matching', () => {
      const post = store.getBlogPostBySlug('ZASTO-SMO-POKRENULI-PUSH-SERBIA');

      expect(post).toBeUndefined();
    });

    it('should return full post object with all properties', () => {
      const post = store.getBlogPostBySlug('zasto-smo-pokrenuli-push-serbia');

      expect(post?.id).toBeDefined();
      expect(post?.title).toBeDefined();
      expect(post?.slug).toBeDefined();
      expect(post?.author).toBeDefined();
      expect(post?.date).toBeDefined();
      expect(post?.excerpt).toBeDefined();
      expect(post?.content).toBeDefined();
      expect(post?.image).toBeDefined();
      expect(post?.tags).toBeDefined();
    });

    it('should return undefined for empty string slug', () => {
      const post = store.getBlogPostBySlug('');

      expect(post).toBeUndefined();
    });

    it('should return undefined for null slug', () => {
      const post = store.getBlogPostBySlug(null as any);

      expect(post).toBeUndefined();
    });

    it('should handle slug with special characters', () => {
      const post = store.getBlogPostBySlug('non-existent-with-special-@#$');

      expect(post).toBeUndefined();
    });

    it('should handle slug with extra spaces', () => {
      const post = store.getBlogPostBySlug('  zasto-smo-pokrenuli-push-serbia  ');

      expect(post).toBeUndefined();
    });

    it('should find post even if slug has hyphens', () => {
      const post = store.getBlogPostBySlug('5-lekcija-iz-prve-godine');

      expect(post).toBeDefined();
      expect(post?.id).toBe('5');
    });
  });

  describe('$blogPosts signal', () => {
    it('should be a readonly signal', () => {
      expect(store.$blogPosts).toBeDefined();
      expect(typeof store.$blogPosts).toBe('function');
    });

    it('should return the same data as getBlogPosts', () => {
      const fromMethod = store.getBlogPosts();
      const fromSignal = store.$blogPosts();

      expect(fromSignal).toEqual(fromMethod);
    });

    it('should return array of blog posts', () => {
      const posts = store.$blogPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });
  });

  describe('blog post content', () => {
    it('should contain HTML content in posts', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.content).toContain('<');
        expect(post.content).toContain('>');
      });
    });

    it('should have excerpts that are shorter than content', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.excerpt.length).toBeLessThan(post.content.length);
      });
    });

    it('should have author for each post', () => {
      const posts = store.getBlogPosts();

      posts.forEach((post) => {
        expect(post.author).toBe('Push Serbia tim');
      });
    });

    it('should have consistent author across all posts', () => {
      const posts = store.getBlogPosts();
      const authors = new Set(posts.map((p) => p.author));

      expect(authors.size).toBe(1);
      expect(authors.has('Push Serbia tim')).toBe(true);
    });
  });

  describe('blog post organization', () => {
    it('should have posts in chronological order (by ID)', () => {
      const posts = store.getBlogPosts();
      const ids = posts.map((p) => parseInt(p.id));

      for (let i = 0; i < ids.length - 1; i++) {
        expect(ids[i]).toBeLessThanOrEqual(ids[i + 1]);
      }
    });

    it('should have posts with various tags', () => {
      const posts = store.getBlogPosts();
      const allTags = new Set<string>();

      posts.forEach((post) => {
        post.tags?.forEach((tag) => allTags.add(tag));
      });

      expect(allTags.size).toBeGreaterThan(1);
    });

    it('should contain common tags across posts', () => {
      const posts = store.getBlogPosts();
      const allTags = posts.flatMap((p) => p.tags ?? []);

      expect(allTags).toContain('open-source');
      expect(allTags).toContain('zajednica');
    });
  });

  describe('integration', () => {
    it('should work together: get all posts and find by slug', () => {
      const allPosts = store.getBlogPosts();
      const firstPost = allPosts[0];

      const foundPost = store.getBlogPostBySlug(firstPost.slug);

      expect(foundPost).toEqual(firstPost);
    });

    it('should return consistent data across multiple accesses', () => {
      const post1 = store.getBlogPostBySlug('zasto-smo-pokrenuli-push-serbia');
      const post2 = store.getBlogPostBySlug('zasto-smo-pokrenuli-push-serbia');

      expect(post1).toEqual(post2);
    });

    it('should have all blog posts accessible by their slug', () => {
      const allPosts = store.getBlogPosts();

      allPosts.forEach((post) => {
        const foundPost = store.getBlogPostBySlug(post.slug);
        expect(foundPost).toEqual(post);
      });
    });
  });
});
