import {
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import slugify from 'slugify';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { Project } from '../../../../core/project/project';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [
    CommonModule,
    BasicLayoutComponent,
    ReactiveFormsModule,
    QuillEditorComponent,
    PageLoaderComponent,
    RouterLink,
  ],
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.scss',
})
export class CreateProjectPageComponent implements OnInit {
  private projectStoreService = inject(ProjectStoreService);
  public project?: Project;

  form!: FormGroup;

  slug = input<string>();
  $loading = this.projectStoreService.$loading;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private destroyRef: DestroyRef,
    private injector: Injector,
  ) {}

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      github: [''],
    });
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
        `/projects${this.project?.slug ? '/' + updated.slug : ''}`,
      );
    });
  }
}
