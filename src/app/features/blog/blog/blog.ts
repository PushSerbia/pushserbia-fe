import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStore } from '../../../core/blog/blog-store';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';
import { SeoManager } from '../../../../../core/seo/seo-manager';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, BasicLayout],
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
      description: 'Znanje, iskustva i novosti iz Push Serbia zajednice.',
    });
  }
}
