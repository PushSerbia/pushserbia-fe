import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  linkedinUrl!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const origin = window.location.origin;

      this.linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77e1aof4f7c9bj&redirect_uri=${environment.apiUrl}/auth/redirect/linkedin?callback=${origin}&scope=openid,profile,email`;
    }
  }
}
