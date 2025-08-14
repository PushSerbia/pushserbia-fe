import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private translate = inject(TranslateService);
  private elRef = inject(ElementRef);

  dropdownOpen = false;

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }

  get currentLangKey(): string {
    return this.currentLang === 'sr' ? 'COMMON.LANG.SR' : 'COMMON.LANG.EN';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  switchLang(lang: 'sr' | 'en') {
    if (this.translate.currentLang === lang) {
      this.closeDropdown();
      return;
    }
    this.translate.use(lang);
    try {
      if (typeof window !== 'undefined' && window?.localStorage) {
        window.localStorage.setItem('lang', lang);
      }
    } catch {
      // ignore storage errors (e.g., SSR or private mode)
    }
    this.closeDropdown();
  }
}
