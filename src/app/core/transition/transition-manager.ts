import { Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransitionManager {
  readonly current = signal<ViewTransitionInfo | null>(null);
}
