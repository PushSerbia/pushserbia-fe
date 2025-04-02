import { Injectable, Signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs';
import { Project } from './project';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project>{
  readonly endpoint = 'projects';

  getProjectsResource(page: Signal<number>) {
    return httpResource<Project[]>(() => `/projects?page=${page()}`, { defaultValue: [] });
  }

  getProjectDetailsResource(slug: Signal<string>) {
    return httpResource<Project[] | null>(() => `/projects?slug=${slug()}`, { defaultValue: null });
  }

  override getById<Project>(id: string) {
    return super.getAll({ slug: id }).pipe(map(items => items[0] as Project));
  }
}
