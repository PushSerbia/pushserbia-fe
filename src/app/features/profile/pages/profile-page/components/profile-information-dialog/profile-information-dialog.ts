import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthClient } from '../../../../../../core/auth/auth-client';
import { OnboardingService } from '../../../../../../core/onboarding/onboarding';

@Component({
  selector: 'app-profile-information-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-information-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationDialog {
  id = input.required<string>();

  closeClick = output<void>();

  private readonly authService = inject(AuthClient);
  private readonly onboarding = inject(OnboardingService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    fullName: [this.authService.$fullUserData()?.fullName || '', Validators.required],
    linkedInUrl: [this.authService.$fullUserData()?.linkedInUrl || ''],
    gitHubUrl: [this.authService.$fullUserData()?.gitHubUrl || ''],
  });

  updateMe() {
    this.authService.updateMe(this.form.getRawValue()).subscribe(() => {
      const values = this.form.getRawValue();
      if (values.gitHubUrl || values.linkedInUrl) {
        this.onboarding.markProfileCompleted();
      }
      this.closeClick.emit();
    });
  }
}
