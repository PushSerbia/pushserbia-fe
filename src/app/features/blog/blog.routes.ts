import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/blog/blog.component').then(
        (m) => m.BlogComponent,
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/blog-post/blog-post.component').then(
        (m) => m.BlogPostComponent,
      ),
  },
];
