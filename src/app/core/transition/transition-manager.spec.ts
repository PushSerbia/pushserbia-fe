import { TestBed } from '@angular/core/testing';

import { TransitionManager } from './transition-manager';

describe('TransitionManager', () => {
  let service: TransitionManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
