import { RenderMode, ServerRoute } from '@angular/ssr';

// todo: check and improve config

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'projects/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
