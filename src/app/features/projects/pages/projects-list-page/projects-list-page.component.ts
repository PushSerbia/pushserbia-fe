import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectListFiltersComponent } from './components/project-list-filters/project-list-filters.component';
import { ProjectListHeaderComponent } from './components/project-list-header/project-list-header.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { ProjectsFilter } from '../../../../core/project/projects-filter';
import { AuthService } from '../../../../core/auth/auth.service';
import { Project } from '../../../../core/project/project';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterLink,
} from '@angular/router';
import { AuthRequiredDirective } from '../../../../core/auth/auth-required.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  VoteState,
  VoteStoreService,
} from '../../../../core/vote/vote.store.service';
import { TransitionService } from '../../../../core/transition/transition.service';

@Component({
  selector: 'app-projects-list-page',
  imports: [
    BasicLayoutComponent,
    ProjectCardComponent,
    ProjectListFiltersComponent,
    ProjectListHeaderComponent,
    PageLoaderComponent,
    RouterLink,
    AuthRequiredDirective,
    TranslateModule,
  ],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss',
})
export class ProjectsListPageComponent implements OnInit {
  public readonly projectStore = inject(ProjectStoreService);
  private readonly authService = inject(AuthService);
  private readonly voteStore = inject(VoteStoreService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly transitionService = inject(TransitionService);
  private readonly translate = inject(TranslateService);

  readonly $loading = computed(() => this.projectStore.$loading());
  readonly $filter = signal<ProjectsFilter>({
    myProjectsOnly: false,
    supportedOnly: false,
  });
  readonly $currentUser = this.authService.$userData;
  readonly $projects = signal<Project[]>([]);
  readonly $votesMap = signal<VoteState>({});

  myProjectsOnly = input<string>('myProjectsOnly');
  supportedOnly = input<string>('supportedOnly');

  constructor() {
    effect(() => {
      const votes = this.voteStore.getAll();
      this.$votesMap.set(votes());

      const projects = this.projectStore.getAll()();

      const currentUser = this.$currentUser();
      if (!currentUser) {
        this.$projects.set(projects);
        return;
      }

      const filter = this.$filter();
      let filteredProjects = projects;

      if (filter.myProjectsOnly) {
        filteredProjects = filteredProjects.filter(
          (project) => project.creator.id === currentUser.id,
        );
      }

      if (filter.supportedOnly) {
        const votesMap = this.$votesMap();
        console.log(votesMap);
        filteredProjects = filteredProjects.filter((project) =>
          Boolean(votesMap?.[project.id]),
        );
      }

      this.$projects.set(filteredProjects);
    });
  }

  ngOnInit(): void {
    const newFilter: ProjectsFilter = {
      myProjectsOnly: false,
      supportedOnly: false,
    };

    if (this.myProjectsOnly()) {
      newFilter.myProjectsOnly = true;
    }

    if (this.supportedOnly()) {
      newFilter.supportedOnly = true;
    }

    if (newFilter.myProjectsOnly || newFilter.supportedOnly) {
      this.$filter.set(newFilter);
    }
  }

  onFilterUpdate(filter: ProjectsFilter): void {
    this.$filter.set(filter);

    const queryParams: Record<string, boolean> = {};

    if (filter.myProjectsOnly) {
      queryParams['myProjectsOnly'] = true;
    }

    if (filter.supportedOnly) {
      queryParams['supportedOnly'] = true;
    }

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams,
    });
  }

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }

  viewTransitionName(project: Project): string {
    const transition = this.transitionService.current();

    const fromSlug = this.findSlug(transition?.to);
    const toSlug = this.findSlug(transition?.from);

    const isBannerImg = toSlug === project.slug || fromSlug === project.slug;
    return isBannerImg ? 'project-img' : '';
  }

  private findSlug(routeSnapshot?: ActivatedRouteSnapshot | null): string {
    if (!routeSnapshot) {
      return '';
    }
    if (routeSnapshot.params['slug']) {
      return routeSnapshot.params['slug'];
    }
    return this.findSlug(routeSnapshot.firstChild);
  }
}
