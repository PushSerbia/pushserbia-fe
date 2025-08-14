import { Component, inject } from '@angular/core';
import { UserWidgetComponent } from '../../ui/user-widget/user-widget.component';
import { RouterLink } from '@angular/router';
import { ThemeSwitcherComponent } from '../../ui/theme-switcher/theme-switcher.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [UserWidgetComponent, RouterLink, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private translate = inject(TranslateService);

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}
