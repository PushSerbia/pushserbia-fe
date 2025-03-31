import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { projectDetailsResolver } from './project-details.resolver';

describe('projectDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => projectDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
