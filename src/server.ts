import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLACK_INVITE_URL } from './app/shared/external-links';
import { BLOG_POSTS } from './app/core/blog/blog-posts.data';
import { environment } from './environments/environment';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

export const app = express();
const angularApp = new AngularNodeAppEngine();

const CANONICAL_HOST = 'pushserbia.com';

const isProductionHost = (host: string): boolean =>
  host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;

/**
 * Canonicalize the host: redirect www -> non-www and http -> https in a single
 * permanent (301) hop. Scoped to the production host so staging, *.vercel.app
 * preview deployments and localhost keep working untouched.
 */
app.use((req, res, next) => {
  const host = req.headers.host ?? '';
  const isHttp = req.headers['x-forwarded-proto'] === 'http';
  const isWww = host.startsWith('www.');

  if (isProductionHost(host) && (isHttp || isWww)) {
    return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
  }
  next();
});

/**
 * Serve a restrictive robots.txt on non-production hosts (e.g. staging) so the
 * staging subdomain is never crawled or indexed. The production host falls
 * through to the static public/robots.txt.
 */
app.get('/robots.txt', (req, res, next) => {
  if (!isProductionHost(req.headers.host ?? '')) {
    res.type('text/plain').send('User-agent: *\nDisallow: /\n');
    return;
  }
  next();
});

app.get('/pridruzi-se-slack', (_req, res) => {
  res.redirect(301, SLACK_INVITE_URL);
});

/**
 * Dynamic sitemap. Projects are user-generated via the API, so a static file
 * goes stale the moment a new project is proposed. This route always returns
 * the static pages + blog posts, and enriches them with the live project list
 * when the API is reachable — falling back gracefully (never a 500) otherwise.
 */
const SITE_URL = 'https://pushserbia.com';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const STATIC_SITEMAP_ENTRIES: Omit<SitemapEntry, 'lastmod'>[] = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/projekti`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/placanja/finansiranje`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/dokumentacija/o-nama`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/dokumentacija/kontakt`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/dokumentacija/karijere`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/dokumentacija/brend-centar`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/dokumentacija/politika-privatnosti`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/dokumentacija/uslovi-koriscenja`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/dokumentacija/licence`, changefreq: 'monthly', priority: '0.6' },
];

const escapeXml = (value: string): string =>
  value.replace(
    /[<>&'"]/g,
    (char) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char,
  );

const toIsoDate = (value: string | undefined, fallback: string): string => {
  if (!value) {
    return fallback;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString().slice(0, 10);
};

const renderSitemap = (entries: SitemapEntry[]): string => {
  const urls = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

app.get('/sitemap.xml', async (_req, res) => {
  const buildDate = new Date().toISOString().slice(0, 10);
  const entries: SitemapEntry[] = STATIC_SITEMAP_ENTRIES.map((entry) => ({
    ...entry,
    lastmod: buildDate,
  }));

  for (const post of BLOG_POSTS) {
    entries.push({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: toIsoDate(post.date, buildDate),
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  try {
    const response = await fetch(`${environment.apiUrl}/projects?limit=200`);
    if (response.ok) {
      const body = (await response.json()) as {
        data?: { slug: string; updatedAt?: string; status?: string; isBanned?: boolean }[];
      };
      for (const project of body.data ?? []) {
        // Skip projects that have no public detail page yet.
        if (project.isBanned || project.status === 'pending' || project.status === 'declined') {
          continue;
        }
        entries.push({
          loc: `${SITE_URL}/projekti/${project.slug}`,
          lastmod: toIsoDate(project.updatedAt, buildDate),
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    }
  } catch {
    // API unreachable — serve the static + blog sitemap instead of erroring.
  }

  res.set('Cache-Control', 'public, max-age=3600');
  res.type('application/xml').send(renderSitemap(entries));
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (!response) {
        return next();
      }

      // Auth-guarded pages (e.g. /projekti/novi) redirect unauthenticated
      // visitors to the login page. Angular SSR emits this as a temporary 302;
      // serve it as a permanent 301 instead, since those pages always require
      // authentication. This avoids the "302 redirect" SEO warning.
      const location = response.headers.get('location');
      if (response.status === 302 && location?.endsWith('/autentikacija/prijava')) {
        return writeResponseToNodeResponse(
          new Response(null, { status: 301, headers: response.headers }),
          res,
        );
      }

      return writeResponseToNodeResponse(response, res);
    })
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
