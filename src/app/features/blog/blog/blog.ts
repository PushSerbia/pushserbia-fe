import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../core/blog/blog.store.service';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, BasicLayout],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly blogStoreService = inject(BlogStoreService);
  private readonly seo = inject(SeoService);

  blogPosts = this.blogStoreService.getBlogPosts();

  constructor() {
    this.seo.update({
      title: 'Blog',
      description: 'Znanje, iskustva i novosti iz Push Serbia zajednice.',
    });
  }
}
