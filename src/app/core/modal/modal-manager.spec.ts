import { TestBed } from '@angular/core/testing';

import { ModalManager } from './modal-manager';

describe('ModalManager', () => {
  let service: ModalManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
