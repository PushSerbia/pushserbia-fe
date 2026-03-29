import { TestBed } from '@angular/core/testing';

import { ProjectApi } from './project-api';

describe('ProjectApi', () => {
  let service: ProjectApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
