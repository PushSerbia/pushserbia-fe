import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthClient } from '../auth/auth-client';

export interface OnboardingState {
  welcomeCompleted: boolean;
  profileCompleted: boolean;
  firstVote: boolean;
  firstProjectView: boolean;
  dismissed: boolean;
}

const DEFAULT_STATE: OnboardingState = {
  welcomeCompleted: false,
  profileCompleted: false,
  firstVote: false,
  firstProjectView: false,
  dismissed: false,
};

const TASKS = ['profileCompleted', 'firstProjectView', 'firstVote'] as const;

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly authClient = inject(AuthClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _state = signal<OnboardingState>(DEFAULT_STATE);
  private loadedUserId: string | null = null;

  constructor() {
    effect(() => {
      const userData = this.authClient.$userData();
      if (userData?.id && this.isBrowser && this.loadedUserId !== userData.id) {
        this.loadedUserId = userData.id;
        this.loadForUser(userData.id);
      }
      if (!userData && this.loadedUserId) {
        this.loadedUserId = null;
        this._state.set(DEFAULT_STATE);
      }
    });
  }

  readonly $state = this._state.asReadonly();

  readonly $isNewUser = computed(() => !this._state().welcomeCompleted);

  readonly $showChecklist = computed(() => {
    const state = this._state();
    return (
      this.authClient.$authenticated() &&
      state.welcomeCompleted &&
      !state.dismissed &&
      !this.$allCompleted()
    );
  });

  readonly $allCompleted = computed(() => {
    const state = this._state();
    return TASKS.every((task) => state[task]);
  });

  readonly $completedCount = computed(() => {
    const state = this._state();
    return TASKS.filter((task) => state[task]).length;
  });

  readonly totalTasks = TASKS.length;

  readonly $completionPercentage = computed(
    () => Math.round((this.$completedCount() / this.totalTasks) * 100),
  );

  loadForUser(userId: string): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.storageKey(userId));
    if (stored) {
      try {
        this._state.set({ ...DEFAULT_STATE, ...JSON.parse(stored) });
      } catch {
        this._state.set(DEFAULT_STATE);
      }
    } else {
      this._state.set(DEFAULT_STATE);
    }
  }

  shouldShowWelcome(): boolean {
    return this.isBrowser && this.authClient.$authenticated() && !this._state().welcomeCompleted;
  }

  markWelcomeCompleted(): void {
    this.updateState({ welcomeCompleted: true });
  }

  markProfileCompleted(): void {
    this.updateState({ profileCompleted: true });
  }

  markFirstVote(): void {
    this.updateState({ firstVote: true });
  }

  markFirstProjectView(): void {
    this.updateState({ firstProjectView: true });
  }

  dismiss(): void {
    this.updateState({ dismissed: true });
  }

  private updateState(patch: Partial<OnboardingState>): void {
    const newState = { ...this._state(), ...patch };
    this._state.set(newState);
    this.persist(newState);
  }

  private persist(state: OnboardingState): void {
    if (!this.isBrowser) return;
    const userId = this.authClient.$userData()?.id;
    if (userId) {
      localStorage.setItem(this.storageKey(userId), JSON.stringify(state));
    }
  }

  private storageKey(userId: string): string {
    return `ps_onboarding_${userId}`;
  }
}
