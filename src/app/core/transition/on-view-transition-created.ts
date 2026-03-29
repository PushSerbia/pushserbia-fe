import { Router, ViewTransitionInfo } from '@angular/router';
import { inject } from '@angular/core';
import { TransitionManager } from './transition-manager';

export function onViewTransitionCreated(info: ViewTransitionInfo) {
  const router = inject(Router);
  const toUrl = router.currentNavigation()?.finalUrl?.toString() ?? '';

  if (
    !toUrl.startsWith('/projekti') ||
    toUrl === '/projekti/novi' ||
    toUrl.endsWith('/izmena')
  ) {
    info.transition.skipTransition();
    return;
  }

  const currentTransitionService = inject(TransitionManager);
  currentTransitionService.current.set(info);

  info.transition.finished.finally(() => {
    currentTransitionService.current.set(null);
  });
}
