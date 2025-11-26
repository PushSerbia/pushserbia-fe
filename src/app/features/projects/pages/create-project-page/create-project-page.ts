import { Component, effect, inject, Injector, input, OnInit, signal, untracked } from '@angular/core';
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
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    JsonPipe,
    Field
  ],
  templateUrl: './create-project-page.html',
  styleUrl: './create-project-page.scss',

})
export class CreateProjectPage implements OnInit {
  //private fb = inject(FormBuilder);
  private readonly router = inject(Router);
  //private destroyRef = inject(DestroyRef);
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
  //protected form!: FormGroup;

  readonly slug = input<string>();
  readonly $loading = this.projectStoreService.$loading;
  readonly quillNbspFix = quillNbspFix;

  private readonly _nameToSlugEffect = effect(() => {
    const name = this.model().name;
    const currentSlug = untracked(() => this.model().slug);

    if (name) {
      const slugified = slugify(name, { lower: true, strict: true });

      if (slugified !== currentSlug) {
        untracked(() => {
          this.model.update(value => ({...value, slug: slugified}));
        });
      }
    }
  });

  private initForm(): void {
    // const formGroup: Record<string, unknown[]> = {
    //   name: ['', [Validators.required, Validators.minLength(3)]],
    //   slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    //   shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
    //   description: ['', [Validators.required, Validators.minLength(50)]],
    //   github: [''],
    //   image: [null, [Validators.required]],
    // };
    // if (this.project) {
    //   formGroup['status'] = [this.project.status];
    // }
    // this.form = this.fb.group(formGroup);
    // this.form.controls['name'].valueChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((name) => {
    //     this.form.controls['slug'].setValue(
    //       slugify(name, { lower: true, strict: true }),
    //     );
    //   });
  }

  ngOnInit(): void {
    effect(
      () => {
        const slug = this.slug();
        if (slug) {
          this.project = this.projectStoreService.getBySlug(slug)();
          if (this.project) {
            // this.initForm();
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
    if (!this.slug()) {
      this.initForm();
    }
  }

  //onSubmit(): void {
    //if (this.projectStoreService.$loading()) {
    //  return;
    //}
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }
    // const endpoint = this.project?.id
    //   ? this.projectStoreService.update(this.project.id, this.form.value)
    //   : this.projectStoreService.create(this.form.value);
    // endpoint.subscribe((updated) => {
    //   this.router.navigateByUrl(
    //     `/projekti${this.project?.slug ? '/' + updated.slug : ''}`,
    //   );
    // });
  //}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.projectStoreService.$loading()) {
      return;
    }

    if (this.form().invalid()) {
      this.form().markAsTouched();
      return;
    }

    submit(this.form, async () => {
      const request = this.project?.id
      ? this.projectStoreService.update(this.project.id, this.form().value() as Partial<Project>)
      : this.projectStoreService.create(this.form().value() as Partial<Project>);

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
}
