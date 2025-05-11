import { Component, DestroyRef, inject, input, output } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-information-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-information-dialog.component.html',
  styleUrl: './profile-information-dialog.component.css',
})
export class ProfileInformationDialogComponent {
  id = input.required<string>();

  closeClick = output<void>();

  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(UntypedFormBuilder);

  readonly form = this.formBuilder.group({
    fullName: this.formBuilder.control(
      this.authService.$fullUserData()?.fullName || '',
      Validators.required,
    ),
    linkedInUrl: this.formBuilder.control(
      this.authService.$fullUserData()?.linkedInUrl || '',
    ),
    gitHubUrl: this.formBuilder.control(
      this.authService.$fullUserData()?.gitHubUrl || '',
    ),
  });

  updateMe() {
    this.authService
      .updateMe(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.closeClick.emit());
  }
}
