import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Config } from './app/core/models/config';
import { APP_CONFIG } from './tokens/app-config.token';

fetch('./assets/config/config.json')
  .then((res) => res.json())
  .then((config: Config) => {
    return platformBrowserDynamic([
      {
        provide: APP_CONFIG,
        useValue: config,
        multi: false,
      },
    ]).bootstrapModule(AppModule);
  })
  .catch((err) => console.error(err));
