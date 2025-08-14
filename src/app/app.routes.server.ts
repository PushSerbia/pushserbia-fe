import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: ':lang/profil/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dokumentacija/**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'placanja/**',
    renderMode: RenderMode.Prerender,
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
