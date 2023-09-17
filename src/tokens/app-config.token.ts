import { InjectionToken } from '@angular/core';
import { Config } from '../app/core/models/config';

export const APP_CONFIG: InjectionToken<Config> = new InjectionToken<Config>(
  'Config'
);
