import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-center',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './brand-center.component.html',
  styleUrl: './brand-center.component.css',
})
export class BrandCenterComponent {
  private translate = inject(TranslateService);
  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}
