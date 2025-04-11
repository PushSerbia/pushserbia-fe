import { computed, Injectable, Signal, signal } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { finalize, first, Observable, tap } from 'rxjs';

interface ProjectState {
  slugs: string[];
  entitiesMap: Record<string, Project>;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {
  private loading = signal<boolean>(false);
  private items = signal<ProjectState>({
    slugs: [],
    entitiesMap: {}
  });

  $loading = this.loading.asReadonly();

  constructor(private projectService: ProjectService) {}

  private fetchAll(): Observable<Project[]> {
    this.loading.set(true);

    return this.projectService.getAll().pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap(projects => {
        const state = projects.reduce((acc, project) => {
          acc.slugs.push(project.slug);
          acc.entitiesMap[project.slug] = project;
          return acc;
        }, { slugs: [], entitiesMap: {} } as ProjectState);
        this.items.set(state);
      }),
    );
  }

  getAll(): Signal<Project[]> {
    if (!this.items().slugs.length && !this.loading()) {
      this.fetchAll().subscribe();
    }

    return computed(() => {
      const entities = this.items();
      return entities.slugs.map(slug => entities.entitiesMap[slug]);
    });
  }

  getBySlug(slug: string): Signal<Project> {
    const cachedProject = this.items().entitiesMap[slug];
    if (!cachedProject && !this.loading()) {
      this.fetchAll().subscribe();
    }

    return computed(() => this.items().entitiesMap[slug]);
  }

  updateStateBySlug(slug: string, project: Project): void {
    const currentState = this.items();
    const updatedEntitiesMap = { ...currentState.entitiesMap, [slug]: project };
    this.items.set({ ...currentState, entitiesMap: updatedEntitiesMap });
  }
}
