import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../../../../core/feedback/feedback.service';
import { FeedbackCategory } from '../../../../../../core/feedback/feedback-category';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile-feedback',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-feedback.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFeedback implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly feedbackService = inject(FeedbackService);
  private successTimeout?: ReturnType<typeof setTimeout>;

  $isSubmitting = signal(false);
  $submitSuccess = signal(false);
  $submitError = signal<string | null>(null);

  categories = [
    { value: FeedbackCategory.Platform, label: 'Platforma' },
    { value: FeedbackCategory.Projects, label: 'Projekti' },
    { value: FeedbackCategory.Community, label: 'Zajednica' },
    { value: FeedbackCategory.Other, label: 'Ostalo' },
  ];

  form = this.fb.nonNullable.group({
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    category: [FeedbackCategory.Platform as FeedbackCategory, [Validators.required]],
    message: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  ngOnDestroy(): void {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  get messageLength(): number {
    return this.form.controls.message.value?.length ?? 0;
  }

  setRating(value: number): void {
    this.form.controls.rating.setValue(value);
    this.form.controls.rating.markAsTouched();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.$isSubmitting.set(true);
    this.$submitSuccess.set(false);
    this.$submitError.set(null);

    this.feedbackService
      .create(this.form.getRawValue())
      .pipe(finalize(() => this.$isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.$submitSuccess.set(true);
          this.form.reset({
            rating: 0,
            category: FeedbackCategory.Platform,
            message: '',
          });
          if (this.successTimeout) {
            clearTimeout(this.successTimeout);
          }
          this.successTimeout = setTimeout(() => this.$submitSuccess.set(false), 5000);
        },
        error: () => {
          this.$submitError.set('Došlo je do greške. Pokušaj ponovo.');
        },
      });
  }
}
