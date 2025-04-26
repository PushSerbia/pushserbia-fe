import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStoreService } from '../../../../core/blog/blog.store.service';
import { BlogPost } from '../../../../core/blog/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  blogPosts: BlogPost[] = [];

  constructor(private blogStoreService: BlogStoreService) {
    this.blogPosts = this.blogStoreService.getBlogPosts();
  }
}
