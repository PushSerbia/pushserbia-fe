import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'theme';
  private isBrowser = isPlatformBrowser(this.platformId);

  public isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Theme initialization moved to AppComponent
  }

  public toggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  applyTheme(isDark: boolean): void {
    if (isDark) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  private saveTheme(isDark: boolean): void {
    if (this.isBrowser) {
      const value = isDark ? 'dark' : 'light';
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      this.document.cookie = `${this.storageKey}=${value}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    }
  }

  private getInitialTheme(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const cookies = this.document.cookie.split(';');
    const themeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${this.storageKey}=`),
    );

    if (themeCookie) {
      const themeValue = themeCookie.split('=')[1].trim();
      return themeValue === 'dark';
    }

    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }
}
