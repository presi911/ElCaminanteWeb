import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // Home: prerenderiza en build
  },
  {
    path: 'crear-producto',
    renderMode: RenderMode.Prerender, // Prerenderiza en build
  },
  {
    path: 'productos',
    renderMode: RenderMode.Prerender, // Prerenderiza en build
  },
  {
    path: 'editar-producto/:id',
    renderMode: RenderMode.Server, // Solo SSR, NO prerender
  },
];
