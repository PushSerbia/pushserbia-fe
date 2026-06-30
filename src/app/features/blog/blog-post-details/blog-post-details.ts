import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  RESPONSE_INIT,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { BlogStore } from '../../../core/blog/blog-store';
import { BlogPost } from '../../../core/blog/blog';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';
import { SeoManager } from '../../../core/seo/seo-manager';

@Component({
  selector: 'app-blog-post-details',
  imports: [RouterLink, QuillViewHTMLComponent, BasicLayout],
  templateUrl: './blog-post-details.html',
  styleUrl: './blog-post-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostDetails implements OnInit {
  private blogStoreService = inject(BlogStore);
  private seo = inject(SeoManager);
  private readonly response = inject(RESPONSE_INIT, { optional: true });

  readonly slug = input.required<string>();
  post: BlogPost | undefined;
  relatedPosts: BlogPost[] = [];

  ngOnInit() {
    this.post = this.blogStoreService.getBlogPostBySlug(this.slug());

    if (this.post) {
      this.relatedPosts = this.getRelatedPosts(this.post);

      this.seo.update({
        title: this.post.title,
        description: this.post.excerpt,
        image: this.post.image,
        type: 'article',
        jsonLd: {
          '@type': 'BlogPosting',
          headline: this.post.title,
          description: this.post.excerpt,
          image: this.post.image,
          datePublished: this.post.date,
          author: {
            '@type': 'Person',
            name: this.post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Push Serbia',
            logo: { '@type': 'ImageObject', url: 'https://pushserbia.com/pushserbia.png' },
          },
        },
      });
    } else {
      this.seo.update({
        title: 'Članak nije pronađen',
        description: 'Traženi blog članak ne postoji.',
        robots: 'noindex, nofollow',
      });

      // Unknown slug → real 404 instead of a soft-404 (200 with "not found").
      if (this.response) {
        this.response.status = 404;
      }
    }
  }

  /**
   * Pick up to three other posts to surface as "Srodni članci". Posts sharing
   * the most tags rank first, falling back to chronological order. These render
   * as plain dofollow internal links so every post receives inbound links from
   * its siblings, not just the single link from the blog listing page.
   */
  private getRelatedPosts(current: BlogPost): BlogPost[] {
    return this.blogStoreService
      .getBlogPosts()
      .filter((post) => post.slug !== current.slug)
      .map((post) => ({
        post,
        sharedTags: post.tags?.filter((tag) => current.tags?.includes(tag)).length ?? 0,
      }))
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3)
      .map((entry) => entry.post);
  }
}
