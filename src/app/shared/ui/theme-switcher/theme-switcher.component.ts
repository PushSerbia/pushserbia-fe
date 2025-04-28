import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: `./theme-switcher.component.css`,
})
export class ThemeSwitcherComponent {
  public themeService = inject(ThemeService);
}
