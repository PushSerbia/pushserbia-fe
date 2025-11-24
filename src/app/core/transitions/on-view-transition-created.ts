import { Router, ViewTransitionInfo } from '@angular/router';
import { inject } from '@angular/core';
import { TransitionService } from '../transition/transition.service';

export function onViewTransitionCreated(info: ViewTransitionInfo) {
  const router = inject(Router);
  const toUrl = router.getCurrentNavigation()?.finalUrl?.toString() ?? '';

  if (
    !toUrl.startsWith('/projekti') ||
    toUrl === '/projekti/novi' ||
    toUrl.endsWith('/izmena')
  ) {
    info.transition.skipTransition();
    return;
  }

  const currentTransitionService = inject(TransitionService);
  currentTransitionService.current.set(info);

  info.transition.finished.finally(() => {
    currentTransitionService.current.set(null);
  });
}
