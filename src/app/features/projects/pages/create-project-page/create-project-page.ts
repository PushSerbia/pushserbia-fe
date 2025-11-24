import { Component, DestroyRef, effect, inject, Injector, input, OnInit } from '@angular/core';
import { BasicLayout } from '../../../../shared/layout/landing-layout/basic-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import slugify from 'slugify';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { Project } from '../../../../core/project/project';
import { ProjectStatus } from '../../../../core/project/project-status';
import { ImageControl } from '../../../../shared/ui/image-control/image-control';
import { quillNbspFix } from '../../../../core/quill/quill-nbsp-fix';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [
    BasicLayout,
    ReactiveFormsModule,
    QuillEditorComponent,
    PageLoader,
    RouterLink,
    ImageControl,
  ],
  templateUrl: './create-project-page.html',
  styleUrl: './create-project-page.scss',
})
export class CreateProjectPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private projectStoreService = inject(ProjectStoreService);

  protected project?: Project;
  protected projectStatus = ProjectStatus;

  protected form!: FormGroup;

  readonly slug = input<string>();
  readonly $loading = this.projectStoreService.$loading;
  readonly quillNbspFix = quillNbspFix;

  private initForm(): void {
    const formGroup: Record<string, unknown[]> = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      github: [''],
      image: [null, [Validators.required]],
    };
    if (this.project) {
      formGroup['status'] = [this.project.status];
    }
    this.form = this.fb.group(formGroup);
    this.form.controls['name'].valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((name) => {
        this.form.controls['slug'].setValue(
          slugify(name, { lower: true, strict: true }),
        );
      });
  }

  ngOnInit(): void {
    effect(
      () => {
        const slug = this.slug();
        if (slug) {
          this.project = this.projectStoreService.getBySlug(slug)();
          if (this.project) {
            this.initForm();
            this.form.patchValue({
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

  onSubmit(): void {
    if (this.projectStoreService.$loading()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const endpoint = this.project?.id
      ? this.projectStoreService.update(this.project.id, this.form.value)
      : this.projectStoreService.create(this.form.value);
    endpoint.subscribe((updated) => {
      this.router.navigateByUrl(
        `/projekti${this.project?.slug ? '/' + updated.slug : ''}`,
      );
    });
  }
}
