import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { OnboardingService } from '../../../core/onboarding/onboarding';

@Component({
  selector: 'app-onboarding-wizard',
  imports: [],
  templateUrl: './onboarding-wizard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingWizard {
  private readonly dialogRef = inject(DialogRef);
  private readonly router = inject(Router);
  private readonly onboarding = inject(OnboardingService);

  readonly currentStep = signal(0);
  readonly totalSteps = 3;

  next(): void {
    if (this.currentStep() < this.totalSteps - 1) {
      this.currentStep.update((s) => s + 1);
    }
  }

  back(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((s) => s - 1);
    }
  }

  skip(): void {
    this.complete();
  }

  explore(): void {
    this.complete();
    this.router.navigateByUrl('/projekti');
  }

  private complete(): void {
    this.onboarding.markWelcomeCompleted();
    this.dialogRef.close();
  }
}
