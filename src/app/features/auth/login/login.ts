import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private platformId = inject(PLATFORM_ID);

  linkedinUrl!: string;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const origin = window.location.origin;

      this.linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77e1aof4f7c9bj&redirect_uri=${environment.apiUrl}/auth/redirect/linkedin?callback=${origin}&scope=openid,profile,email`;
    }
  }
}
