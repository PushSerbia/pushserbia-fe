import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectService } from '../../../core/project/project.service';

export const projectDetailsResolver: ResolveFn<boolean> = (route, _state) => {
  const productService = inject(ProjectService);
  const slug = route.paramMap.get('slug')!;

  return productService.getById(slug);
};
