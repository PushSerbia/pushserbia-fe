import { computed, Injectable, Signal, signal } from '@angular/core';
import { VoteService } from './vote.service';
import { Vote } from './vote';
import { EMPTY, finalize, first, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface VoteState {
  [projectId: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VoteStoreService {
  private loading = signal<boolean>(false);
  private itemMap = signal<VoteState | null>(null);

  $loading = this.loading.asReadonly();

  constructor(private voteService: VoteService, private authService: AuthService) {}

  private fetchAll(): Observable<Vote[]> {
    if (!this.authService.isAuthenticated()) {
      return EMPTY;
    }

    this.loading.set(true);

    return this.voteService.getMyVotes().pipe(
      first(),
      finalize(() => this.loading.set(false)),
      tap(votes => {
        const state = votes.reduce((acc, vote) => {
          acc[vote.projectId] = true;
          return acc;
        }, {} as VoteState);
        this.itemMap.set(state);
      }),
    );
  }

  isVoted(projectId: string): Signal<boolean> {
    if (!projectId) {
      return signal(false);
    }
    const itemMap = this.itemMap();
    const cachedVote = itemMap && itemMap[projectId];
    if (!itemMap && !cachedVote && !this.loading()) {
      this.fetchAll().subscribe();
    }

    return computed(() => {
      return Boolean(itemMap && itemMap[projectId]);
    });
  }

  create(projectId: string): Observable<Vote> {
    if (!this.authService.isAuthenticated()) {
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
}
