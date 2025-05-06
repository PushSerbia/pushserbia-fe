import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { UserService } from '../../../../../../core/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-information-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-information-dialog.component.html',
  styleUrl: './profile-information-dialog.component.css',
})
export class ProfileInformationDialogComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(UntypedFormBuilder);

  readonly closeButton = viewChild('closeButton', { read: ElementRef });

  readonly form = this.formBuilder.group({
    fullName: this.formBuilder.control(
      this.authService.currentUser()?.fullName || '',
      Validators.required,
    ),
    linkedInUrl: this.formBuilder.control(
      this.authService.currentUser()?.linkedInUrl || '',
    ),
    gitHubUrl: this.formBuilder.control(
      this.authService.currentUser()?.gitHubUrl || '',
    ),
  });

  updateMe() {
    this.userService
      .updateMe(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.closeButton()?.nativeElement.click());
  }
}
