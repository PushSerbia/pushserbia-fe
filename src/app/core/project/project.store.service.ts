import {
  computed,
  Inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  Signal,
  signal,
  TransferState,
} from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { finalize, first, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface ProjectState {
  slugs: string[];
  entitiesMap: Record<string, Project>;
}
const PROJECT_STATE_KEY = makeStateKey<ProjectState>('projects');
const PROJECT_INITIAL_STATE: ProjectState = {
  slugs: [],
  entitiesMap: {},
};

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreService {
  private loading = signal<boolean>(false);
  private items = signal<ProjectState>(PROJECT_INITIAL_STATE);

  $loading = this.loading.asReadonly();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private state: TransferState,
    private projectService: ProjectService,
  ) {
    this.loadStateTransfer();
  }

  private loadStateTransfer(): void {
    if (isPlatformBrowser(this.platformId)) {
      const state = this.state.get(PROJECT_STATE_KEY, PROJECT_INITIAL_STATE);
      this.items.set(state);
    }
  }

  private setStateTransfer(state: ProjectState): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.state.set(PROJECT_STATE_KEY, state);
    }
  }

  private fetchAll(): Observable<Project[]> {
    this.loading.set(true);

    return this.projectService.getAll().pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap((projects) => {
        const state = projects.reduce(
          (acc, project) => {
            acc.slugs.push(project.slug);
            acc.entitiesMap[project.slug] = project;
            return acc;
          },
          { slugs: [], entitiesMap: {} } as ProjectState,
        );
        this.items.set(state);

        this.setStateTransfer(state);
      }),
    );
  }

  getAll(): Signal<Project[]> {
    if (!this.items().slugs.length && !this.loading()) {
      this.fetchAll().subscribe();
    }

    return computed(() => {
      const entities = this.items();
      return entities.slugs.map((slug) => entities.entitiesMap[slug]);
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
        const entitiesMap = {
          ...currentState.entitiesMap,
          [newProject.slug]: newProject,
        };
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
        const oldSlugIndex = currentState.slugs.findIndex(
          (slug) => currentState.entitiesMap[slug].id === id,
        );
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
