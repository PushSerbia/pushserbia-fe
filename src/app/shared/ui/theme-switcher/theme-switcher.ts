import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeManager } from '../../../core/theme/theme-manager';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher {
  public themeService = inject(ThemeManager);
}
