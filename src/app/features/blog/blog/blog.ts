import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogStore } from '../../../core/blog/blog-store';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';
import { SeoManager } from '../../../core/seo/seo-manager';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, BasicLayout, DatePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly blogStoreService = inject(BlogStore);
  private readonly seo = inject(SeoManager);

  blogPosts = this.blogStoreService.getBlogPosts();

  constructor() {
    this.seo.update({
      title: 'Blog',
      description:
        'Čitaj blogove Push Serbia zajednice — znanje, iskustva, novosti i priče o razvoju open-source projekata sa društvenim uticajem u Srbiji.',
      jsonLd: {
        '@type': 'CollectionPage',
        name: 'Blog | Push Serbia',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: this.blogPosts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://pushserbia.com/blog/${post.slug}`,
            name: post.title,
          })),
        },
      },
    });
  }
}
