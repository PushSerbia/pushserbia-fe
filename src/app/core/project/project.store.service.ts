import { computed, inject, Injectable, makeStateKey, PLATFORM_ID, Signal, signal, TransferState } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { finalize, first, iif, Observable, of, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';

const projectsStateKey = makeStateKey<ProjectState>('projects-state');
const projectsKey = makeStateKey<Project[]>('projects');

interface ProjectState {
  slugs: string[];
  entitiesMap: Record<string, Project>;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);

  private loading = signal<boolean>(false);
  private items = signal<ProjectState>({
    slugs: [],
    entitiesMap: {}
  });

  $loading = this.loading.asReadonly();

  constructor(private projectService: ProjectService) {
    if (isPlatformServer(this.platformId)) {
      const projectStateTransferState = this.transferState.get(projectsStateKey, {
        slugs: [],
        entitiesMap: {}
      });
      this.items.set(projectStateTransferState);
    }
  }

  private fetchAll(): Observable<Project[]> {
    this.loading.set(true);
    const transferProjectsValue = this.transferState.get(projectsKey, null);

    return iif(() => transferProjectsValue !== null,
      of(transferProjectsValue as Project[]),
      this.projectService.getAll()
    )
    .pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap(projects => {
        const state = projects.reduce((acc, project) => {
          acc.slugs.push(project.slug);
          acc.entitiesMap[project.slug] = project;
          return acc;
        }, { slugs: [], entitiesMap: {} } as ProjectState);
        this.items.set(state);



        if (isPlatformServer(this.platformId) && state) {
          this.transferState.set(projectsStateKey, state);
          this.transferState.set(projectsKey, projects);
        }
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

  create(project: Partial<Project>): Observable<Project> {
    this.loading.set(true);
    return this.projectService.create(project).pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap((newProject) => {
        const currentState = this.items();
        const entitiesMap = { ...currentState.entitiesMap, [newProject.slug]: newProject };
        const slugs = [...currentState.slugs, newProject.slug];
        this.items.set({ slugs, entitiesMap });
      }),
    );
  }

  update(id: string, project: Partial<Project>): Observable<Project> {
    this.loading.set(true);
    return this.projectService.update(id, project).pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap((updatedProject) => {
        const currentState = this.items();
        const oldSlugIndex = currentState.slugs.findIndex(slug => currentState.entitiesMap[slug].id === id);
        const oldSlug = currentState.slugs[oldSlugIndex];

        const slugs = [...currentState.slugs];
        slugs[oldSlugIndex] = updatedProject.slug;

        const entitiesMap = {
          ...currentState.entitiesMap,
          [updatedProject.slug]: {
            ...currentState.entitiesMap[oldSlug],
            ...updatedProject,
          },
        };
        delete entitiesMap[oldSlug];

        this.items.set({ slugs, entitiesMap });
      }),
    );
  }
}
