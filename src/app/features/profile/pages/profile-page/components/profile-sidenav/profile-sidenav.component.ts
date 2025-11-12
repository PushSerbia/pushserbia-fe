import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-sidenav',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './profile-sidenav.component.html',
  styleUrl: './profile-sidenav.component.css',
})
export class ProfileSidenavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') ||
      ((this.translate.getDefaultLang?.() as 'sr' | 'en') || 'sr');
  }

  onLogoutClick(): void {
    this.authService
      .signOut()
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/', this.currentLang]);
      });
  }
}
