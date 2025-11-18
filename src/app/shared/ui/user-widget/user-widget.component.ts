import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink, GravatarModule],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent {
  private authService = inject(AuthService);

  $userData = this.authService.$userData;

  onLogoutClick(): void {
    this.authService.signOut().subscribe();
  }
}
