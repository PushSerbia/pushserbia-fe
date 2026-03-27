import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../core/auth/auth.service';

@Component({
  selector: 'app-profile-information-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-information-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationDialog {
  id = input.required<string>();

  closeClick = output<void>();

  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    fullName: [this.authService.$fullUserData()?.fullName || '', Validators.required],
    linkedInUrl: [this.authService.$fullUserData()?.linkedInUrl || ''],
    gitHubUrl: [this.authService.$fullUserData()?.gitHubUrl || ''],
  });

  updateMe() {
    this.authService.updateMe(this.form.getRawValue()).subscribe(() => this.closeClick.emit());
  }
}
