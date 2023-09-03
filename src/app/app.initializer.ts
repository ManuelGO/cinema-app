import { ConfigService } from "./core/services/config/config.service";

export const appInitializerFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
