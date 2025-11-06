import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRequiredDirective } from '../../../core/auth/auth-required.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card-new',
  imports: [RouterLink, AuthRequiredDirective, TranslateModule],
  templateUrl: './project-card-new.component.html',
  styleUrl: './project-card-new.component.css',
})
export class ProjectCardNewComponent {
  private translate = inject(TranslateService);

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}
