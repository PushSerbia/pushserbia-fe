import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../core/blog/blog.store.service';
import { BasicLayout } from '../../../shared/layout/landing-layout/basic-layout';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, BasicLayout],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private blogStoreService = inject(BlogStoreService);

  blogPosts = this.blogStoreService.getBlogPosts();
}
