import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  linkedinUrl = environment.linkedinAuthUrl;
}
