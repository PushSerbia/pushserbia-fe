import { TestBed } from '@angular/core/testing';

import { UnsplashApi } from './unsplash-api';

describe('UnsplashApi', () => {
  let service: UnsplashApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsplashApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
