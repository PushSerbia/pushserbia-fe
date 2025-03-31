import { Injectable, Signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { delay, Observable, of } from 'rxjs';
import { Project } from './project';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { httpResource } from '@angular/common/http';

const PROJECTS_MOCK: Project[] = Array.from({ length: 5 }, (_, i) => {
  const name = faker.company.name();
  return {
    id: faker.string.uuid(),
    name,
    slug: slugify(name),
    image: faker.image.url({ height: 600, width: 800 }),
    shortDescription: faker.lorem.sentence(20),
    description: faker.lorem.paragraph(5),
    voteCounter: faker.number.int({ min: 0, max: 100 }),
    creatorId: faker.string.uuid(),
    creatorName: faker.person.fullName(),
    creatorImage: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  };
});

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project>{
  readonly endpoint = 'projects';

  getProjectsResource(page: Signal<number>) {
    return httpResource<Project[]>(() => `/projects?page=${page()}`, { defaultValue: [] });
  }

  override getAll(): Observable<Project[]> {
    return super.getAll();
    //return of(PROJECTS_MOCK).pipe(delay(1000));
  }

  override getById<Project>(id: string) {
    //return super.getById<Project>(id);
    const p = PROJECTS_MOCK.find(project => project.id === id)! as Project;
    return of(p).pipe(delay(1000));
  }
}
