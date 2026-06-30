import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnboardingService } from '../../../core/onboarding/onboarding';

@Component({
  selector: 'app-onboarding-checklist',
  imports: [RouterLink],
  templateUrl: './onboarding-checklist.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingChecklist {
  readonly onboarding = inject(OnboardingService);
  readonly collapsed = signal(false);

  readonly tasks = computed(() => {
    const state = this.onboarding.$state();
    return [
      {
        label: 'Dopuni profil',
        completed: state.profileCompleted,
        link: '/profil',
      },
      {
        label: 'Pogledaj projekat',
        completed: state.firstProjectView,
        link: '/projekti',
      },
      {
        label: 'Glasaj za projekat',
        completed: state.firstVote,
        link: '/projekti',
      },
    ];
  });

  toggleCollapsed(): void {
    this.collapsed.update((v) => !v);
  }

  dismiss(): void {
    this.onboarding.dismiss();
  }
}
