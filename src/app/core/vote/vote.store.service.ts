import {
  computed,
  effect,
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  signal,
  Signal,
  TransferState,
} from '@angular/core';
import { VoteService } from './vote.service';
import { Vote } from './vote';
import { catchError, EMPTY, finalize, first, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export type VoteState = Record<string, boolean>;
const VOTE_STATE_KEY = makeStateKey<Record<string, boolean>>('votes');
const VOTE_INITIAL_STATE = null;

@Injectable({
  providedIn: 'root',
})
export class VoteStoreService {
  private platformId = inject(PLATFORM_ID);
  private state = inject(TransferState);
  private voteService = inject(VoteService);
  private authService = inject(AuthService);

  private loading = signal<boolean>(false);
  private itemMap = signal<VoteState | null>(VOTE_INITIAL_STATE);

  $loading = this.loading.asReadonly();

  constructor() {
    effect(() => {
      if (!this.authService.$authenticated()) {
        if (this.itemMap()) {
          this.itemMap.set(VOTE_INITIAL_STATE);
        }
      }
    });

    this.loadStateTransfer();
  }

  getAll(): Signal<VoteState> {
    if (
      !this.itemMap() &&
      !this.loading() &&
      this.authService.$authenticated()
    ) {
      this.fetchAll().subscribe();
    }
    return computed(() => {
      const itemMap = this.itemMap();
      return itemMap || {};
    });
  }

  isVoted(projectId: string): Signal<boolean> {
    if (!projectId) {
      return signal(false);
    }
    const itemMap = this.itemMap();
    if (!itemMap && !this.loading() && this.authService.$authenticated()) {
      this.fetchAll().subscribe();
    }
    return computed(() => {
      if (!this.authService.$authenticated()) {
        return false;
      }
      return Boolean(itemMap && itemMap[projectId]);
    });
  }

  create(projectId: string): Observable<Vote> {
    if (!this.authService.$authenticated()) {
      return EMPTY;
    }

    this.loading.set(true);

    return this.voteService.create({ projectId }).pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap(() => {
        const itemMap = {
          ...this.itemMap(),
          [projectId]: true,
        };
        this.itemMap.set(itemMap);
      }),
    );
  }

  private loadStateTransfer(): void {
    if (isPlatformBrowser(this.platformId)) {
      const state = this.state.get(VOTE_STATE_KEY, VOTE_INITIAL_STATE);
      this.itemMap.set(state);
    }
  }

  private setStateTransfer(state: VoteState): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.state.set(VOTE_STATE_KEY, state);
    }
  }

  private fetchAll(): Observable<Vote[]> {
    this.loading.set(true);

    return this.voteService.getMyVotes().pipe(
      first(),
      tap((votes) => {
        const state = votes.reduce(
          (acc, vote) => {
            acc[vote.projectId] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        );
        this.itemMap.set(state);
        this.setStateTransfer(state);
      }),
      catchError(() => {
        this.itemMap.set({});
        return of([]);
      }),
      finalize(() => this.loading.set(false)),
    );
  }
}
