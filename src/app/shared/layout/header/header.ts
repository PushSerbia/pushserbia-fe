import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { UserWidget } from '../../ui/user-widget/user-widget';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthRequired } from '../../../core/auth/auth-required';

@Component({
  selector: 'app-header',
  imports: [UserWidget, RouterLink, RouterLinkActive, AuthRequired],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  // Close the open mobile menu when the user presses Escape from anywhere.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
