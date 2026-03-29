import { TestBed } from '@angular/core/testing';

import { ProjectStore } from './project-store';

describe('ProjectStore', () => {
  let service: ProjectStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
