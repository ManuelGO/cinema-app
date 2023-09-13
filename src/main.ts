import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { InjectionToken } from '@angular/core';
import { AppModule } from './app/app.module';
import { Config } from './app/core/models/config';

// config.token.ts
export const APP_CONFIG: InjectionToken<Config> = new InjectionToken<Config>(
  'Config'
);

// ---
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
