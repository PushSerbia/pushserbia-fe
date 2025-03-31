import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectService } from '../../../core/project/project.service';
import { Project } from '../../../core/project/project';

export const projectDetailsResolver: ResolveFn<Project> = (route, _state) => {
  const productService = inject(ProjectService);
  const slug = route.paramMap.get('slug')!;

  return productService.getById(slug);
};
