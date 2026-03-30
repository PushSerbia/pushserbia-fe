import { TestBed } from '@angular/core/testing';

import { VoteApi } from './vote-api';

describe('VoteApi', () => {
  let service: VoteApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
