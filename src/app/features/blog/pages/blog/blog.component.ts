import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../../core/blog/blog.store.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  private blogStoreService = inject(BlogStoreService);
  private translate = inject(TranslateService);

  blogPosts = this.blogStoreService.getBlogPosts();

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}
