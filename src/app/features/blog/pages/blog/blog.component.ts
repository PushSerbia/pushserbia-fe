import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../../core/blog/blog.store.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  private blogStoreService = inject(BlogStoreService);

  blogPosts = this.blogStoreService.getBlogPosts();
}
