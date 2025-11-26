import { Component, computed, effect, inject, Injector, input, OnInit, signal, untracked } from '@angular/core';
import { BasicLayout } from '../../../../shared/layout/landing-layout/basic-layout';
import { QuillEditorComponent } from 'ngx-quill';
import slugify from 'slugify';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { Project } from '../../../../core/project/project';
import { ProjectStatus } from '../../../../core/project/project-status';
import { ImageControl } from '../../../../shared/ui/image-control/image-control';
import { quillNbspFix } from '../../../../core/quill/quill-nbsp-fix';
import { Field, form, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals'
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface CreateProjectModel {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  github: string;
  image: string | null;
  status?: ProjectStatus;
}

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [
    BasicLayout,
    QuillEditorComponent,
    PageLoader,
    RouterLink,
    ImageControl,
    Field,
    FormsModule
  ],
  templateUrl: './create-project-page.html',
  styleUrl: './create-project-page.scss',

})
export class CreateProjectPage implements OnInit {
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly projectStoreService = inject(ProjectStoreService);

  protected project?: Project;
  protected projectStatus = ProjectStatus;

  protected model = signal<CreateProjectModel>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    github: '',
    image: null,
    status: undefined,
  });

  protected form = form(this.model, (schema) => {
    required(schema.name, {
      message: 'Ime projekta je obavezno',
    });
    minLength(schema.name, 3, {
      message: 'Ime projekta mora imati najmanje 3 karaktera',
    });
    required(schema.slug, {
      message: 'Slug je obavezan',
    });
    pattern(schema.slug, /^[a-z0-9-]+$/, {
      message: 'Slug može sadržati samo mala slova, brojeve i crtice'
    });
    required(schema.shortDescription, {
      message: 'Kratak opis je obavezan'
    });
    maxLength(schema.shortDescription, 250, {
      message: 'Kratak opis ne može biti duži od 250 karaktera'
    });
    required(schema.description, {
      message: 'Opis je obavezan'
    });
    minLength(schema.description, 50, {
      message: 'Opis mora imati najmanje 50 karaktera'
    });
    required(schema.image, {
      message: 'Slika je obavezna'
    });
  });

  readonly slug = input<string>();
  readonly $loading = this.projectStoreService.$loading;
  readonly quillNbspFix = quillNbspFix;

  protected quillEditor?: unknown;

  private readonly name = computed(() => this.form.name().value());

  private readonly _nameToSlugEffect = effect(() => {
    const name = this.name();
    const currentSlug = untracked(() => this.form.slug().value());

    if (name) {
      const slugified = slugify(name, { lower: true, strict: true });

      if (slugified !== currentSlug) {
        untracked(() => {
          this.model.update(value => ({...value, slug: slugified}));
        });
      }
    }
  });

  ngOnInit(): void {
    effect(
      () => {
        const slug = this.slug();
        if (slug) {
          this.project = this.projectStoreService.getBySlug(slug)();
          if (this.project) {
            this.model.set({
              name: this.project.name,
              slug: this.project.slug,
              shortDescription: this.project.shortDescription,
              description: this.project.description,
              github: this.project.github || '',
              status: this.project.status || '',
              image:
                this.project.image || null,
            });
          }
        }
      },
      { injector: this.injector },
    );
  }

  onQuillCreated(quill: unknown): void {
    this.quillEditor = quill;
    this.quillNbspFix(quill);
  }

  onQuillContentChanged(event: { html?: string | null }): void {
    const newContent = event.html || '';
    if (newContent !== this.model().description) {
      this.model.update(value => ({...value, description: newContent}));
      this.form.description().markAsTouched();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.projectStoreService.$loading()) {
      return;
    }

    if (this.form().invalid()) {
      this.form().markAsTouched();
      return;
    }

    submit(this.form, async (form) => {
      const value = form().value() as Partial<Project>;
      if (this.project?.id) {
        delete value.slug;
      }
      const request = this.project?.id
      ? this.projectStoreService.update(this.project.id, value)
      : this.projectStoreService.create(value);

      try {
        const response: Project = await firstValueFrom(request);
        this.router.navigateByUrl(
          `/projekti${this.project?.slug ? '/' + response.slug : ''}`,
        );
        return undefined;
      }
      catch(error) {
        if (error !== null && error instanceof HttpErrorResponse && error.status === 409) {
          return [{
            kind: 'duplicateSlug',
            message: 'Projekat sa ovim slug-om već postoji',
            field: this.form.slug
          }];
        }
        else {
          return [];
        }
      }
    })
  }

  quillEditorChanged(value: string): void {
    this.model.update(model => ({...model, description: value}));
  }
}
