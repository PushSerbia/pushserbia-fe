import { Component, OnInit, signal } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/project/project.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [CommonModule, BasicLayoutComponent, ReactiveFormsModule],
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.scss',
})
export class CreateProjectPageComponent implements OnInit {
  form!: FormGroup;
  saving = signal(false);

  constructor(private fb: FormBuilder, private projectsService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  onSubmit(): void {
    if (this.saving()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.projectsService.create(this.form.value).pipe(finalize(() => {
      this.saving.set(false);
    })).subscribe(() => {
      this.router.navigateByUrl('/projects');
    });
  }
}
