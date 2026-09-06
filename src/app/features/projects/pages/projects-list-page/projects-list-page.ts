import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { BasicLayout } from '../../../../shared/layout/landing-layout/basic-layout';
import { ProjectCard } from '../../../../shared/ui/project-card/project-card';
import { ProjectListFilters } from './components/project-list-filters/project-list-filters';
import { ProjectListHeader } from './components/project-list-header/project-list-header';
import { ProjectStore } from '../../../../core/project/project-store';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { ProjectsFilter } from '../../../../core/project/projects-filter';
import { AuthClient } from '../../../../core/auth/auth-client';
import { Project } from '../../../../core/project/project';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthRequired } from '../../../../core/auth/auth-required';
import { VoteState, VoteStore } from '../../../../core/vote/vote-store';
import { TransitionManager } from '../../../../core/transition/transition-manager';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-projects-list-page',
  imports: [
    BasicLayout,
    ProjectCard,
    ProjectListFilters,
    ProjectListHeader,
    PageLoader,
    RouterLink,
    AuthRequired,
  ],
  templateUrl: './projects-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPage implements OnInit {
  public readonly projectStore = inject(ProjectStore);
  private readonly authService = inject(AuthClient);
  private readonly voteStore = inject(VoteStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly transitionService = inject(TransitionManager);

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

  private readonly seo = inject(SeoManager);

  private static readonly SEO_DESCRIPTION =
    'Pregledaj open-source projekte sa pozitivnim društvenim uticajem u Srbiji. Glasaj za inicijative, predloži nove ideje ili doprinesi razvoju.';

  constructor() {
    this.seo.update({
      title: 'Projekti',
      description: ProjectsListPage.SEO_DESCRIPTION,
    });

    // Emit CollectionPage/ItemList structured data once the project list has
    // loaded, so search engines see the catalog that links to each detail page.
    effect(() => {
      const projects = this.projectStore.getAll()();
      if (!projects.length) {
        return;
      }
      this.seo.update({
        title: 'Projekti',
        description: ProjectsListPage.SEO_DESCRIPTION,
        jsonLd: {
          '@type': 'CollectionPage',
          name: 'Projekti | Push Serbia',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: projects.slice(0, 100).map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://pushserbia.com/projekti/${project.slug}`,
              name: project.name,
            })),
          },
        },
      });
    });

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
        filteredProjects = filteredProjects.filter((project) => Boolean(votesMap?.[project.id]));
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

  readonly $hasActiveFilter = computed(
    () => this.$filter().myProjectsOnly || this.$filter().supportedOnly,
  );

  clearFilters(): void {
    this.onFilterUpdate({ myProjectsOnly: false, supportedOnly: false });
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

  viewTransitionName(project: Project): string {
    const transition = this.transitionService.current();

    const fromSlug = transition?.to.firstChild?.firstChild?.params['slug'];
    const toSlug = transition?.from.firstChild?.firstChild?.params['slug'];

    const isBannerImg = toSlug === project.slug || fromSlug === project.slug;
    return isBannerImg ? 'project-img' : '';
  }
}
