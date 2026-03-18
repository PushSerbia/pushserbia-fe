import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { BlogStoreService } from '../../../core/blog/blog.store.service';
import { BlogPost } from '../../../core/blog/blog';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-blog-post-details',
  imports: [RouterLink, QuillViewHTMLComponent, BasicLayout],
  templateUrl: './blog-post-details.html',
  styleUrl: './blog-post-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostDetails implements OnInit {
  private blogStoreService = inject(BlogStoreService);
  private seo = inject(SeoService);

  readonly slug = input.required<string>();
  post: BlogPost | undefined;

  ngOnInit() {
    this.post = this.blogStoreService.getBlogPostBySlug(this.slug());

    if (this.post) {
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
    }
  }
}
