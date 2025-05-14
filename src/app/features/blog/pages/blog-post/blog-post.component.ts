import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { BlogStoreService } from '../../../../core/blog/blog.store.service';
import { BlogPost } from '../../../../core/blog/blog';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, QuillViewHTMLComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent implements OnInit {
  readonly slug = input.required<string>();
  post: BlogPost | undefined;

  constructor(
    private blogStoreService: BlogStoreService
  ) {}

  ngOnInit() {
    this.post = this.blogStoreService.getBlogPostBySlug(this.slug());
  }
}
