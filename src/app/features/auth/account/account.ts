import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthClient } from '../../../core/auth/auth-client';
import { SeoManager } from '../../../core/seo/seo-manager';
import { first } from 'rxjs';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthClient);
  private seo = inject(SeoManager);

  ngOnInit(): void {
    // OAuth callback page — never index it (also runs during SSR).
    this.seo.update({ title: 'Preusmeravanje', noIndex: true });

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const customToken = this.route.snapshot.queryParams['customToken'];

    this.authService
      .signInWithCustomToken(customToken)
      .pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
