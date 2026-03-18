import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UserWidget } from '../../ui/user-widget/user-widget';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcher } from '../../ui/theme-switcher/theme-switcher';

@Component({
  selector: 'app-header',
  imports: [UserWidget, RouterLink, RouterLinkActive, ThemeSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
