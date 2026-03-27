import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  linkedinUrl!: string;

  ngOnInit() {
    this.seo.update({
      title: 'Prijava',
      description: 'Prijavi se na Push Serbia platformu putem LinkedIn naloga.',
    });

    if (isPlatformBrowser(this.platformId)) {
      const origin = window.location.origin;

      this.linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77e1aof4f7c9bj&redirect_uri=${environment.apiUrl}/auth/redirect/linkedin?callback=${origin}&scope=openid,profile,email`;
    }
  }
}
