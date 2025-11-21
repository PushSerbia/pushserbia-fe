import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../core/blog/blog.store.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private blogStoreService = inject(BlogStoreService);

  blogPosts = this.blogStoreService.getBlogPosts();
}
