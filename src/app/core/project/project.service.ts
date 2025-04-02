import { Injectable, Signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map, throwError } from 'rxjs';
import { Project } from './project';
import { httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project>{
  readonly endpoint = 'projects';

  getProjectsResource(page: Signal<number>) {
    return httpResource<Project[]>(() => `/projects?page=${page()}`);
  }

  getProjectDetailsResource(slug: Signal<string>) {
    return rxResource<Project, { slug: string }>({
      request: () => ({ slug: slug() }),
      loader: ({ request }) => super.getAll(request)
        .pipe(
          map((projects: Project[]) => {
            if (projects.length === 0) {
              throw new Error(`No project found with slug '${request.slug}'`);
            }
            else {
              return projects[0];
            }
        }))
    });
  }

  // override getById<Project>(id: string) {
  //   return super.getAll({ slug: id }).pipe(map(items => items[0] as Project));
  // }
}
