import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from '@sentry/angular';
import { environment } from './environments/environment.development';
import { release } from './environments/release';

if (environment.production) {
  Sentry.init({
    dsn: 'https://bd8e23c5d486feba13d2710f28c143bd@o4508943059517440.ingest.de.sentry.io/4508943063056464',
    integrations: [],
    release,
  });
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
