import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.html',
  styleUrl: `./theme-switcher.css`,
})
export class ThemeSwitcher {
  public themeService = inject(ThemeService);
}
