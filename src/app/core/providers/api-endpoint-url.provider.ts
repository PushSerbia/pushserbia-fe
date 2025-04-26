import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

export const API_ENDPOINT_URL = new InjectionToken<string>('API_ENDPOINT_URL');

export const DEFAULT_API_ENDPOINT_URL = 'http://localhost:3000/v1';

export function provideApiEndpointUrl(
  url: string = DEFAULT_API_ENDPOINT_URL,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_ENDPOINT_URL,
      useValue: url,
    },
  ]);
}
