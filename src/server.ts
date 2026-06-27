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
