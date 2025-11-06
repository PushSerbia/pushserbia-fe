import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink, TranslateModule],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent {
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  $userData = this.authService.$userData;

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }

  onLogoutClick(): void {
    this.authService.signOut().subscribe();
  }
}
