import { TestBed } from '@angular/core/testing';

import { VoteStoreService } from './vote.store.service';

describe('VoteStoreService', () => {
  let service: VoteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
