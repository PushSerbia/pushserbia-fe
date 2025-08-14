import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
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
