import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-licensing',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './licensing.component.html',
  styleUrl: './licensing.component.css',
})
export class LicensingComponent {
  private translate = inject(TranslateService);
  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}
