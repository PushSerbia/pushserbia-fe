import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrl: `./theme-switcher.css`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher {
  public themeService = inject(ThemeService);
}
