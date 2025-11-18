import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blog/blog').then(
        (m) => m.Blog,
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./blog-post-details/blog-post-details').then(
        (m) => m.BlogPostDetails,
      ),
  },
];
