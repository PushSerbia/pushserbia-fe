import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'profil',
    renderMode: RenderMode.Client,
  },
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'kontakt',
    renderMode: RenderMode.Server,
  },
  {
    path: 'karijere',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dokumentacija/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'placanja/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'projekti/**',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
