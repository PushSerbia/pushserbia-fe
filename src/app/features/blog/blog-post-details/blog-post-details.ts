import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { BlogStoreService } from '../../../core/blog/blog.store.service';
import { BlogPost } from '../../../core/blog/blog';

@Component({
  selector: 'app-blog-post-details',
  imports: [RouterLink, QuillViewHTMLComponent],
  templateUrl: './blog-post-details.html',
  styleUrl: './blog-post-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostDetails implements OnInit {
  private blogStoreService = inject(BlogStoreService);

  readonly slug = input.required<string>();
  post: BlogPost | undefined;

  ngOnInit() {
    this.post = this.blogStoreService.getBlogPostBySlug(this.slug());
  }
}
