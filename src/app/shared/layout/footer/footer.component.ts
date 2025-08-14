import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

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

    // navigate to the same URL with the new language prefix
    const current = this.router.url; // keeps query and fragment
    let newUrl: string;
    if (current.startsWith('/sr')) {
      newUrl = `/${lang}${current.substring(3)}`;
    } else if (current.startsWith('/en')) {
      newUrl = `/${lang}${current.substring(3)}`;
    } else {
      // if somehow on a non-prefixed URL, prepend
      newUrl = `/${lang}${current.startsWith('/') ? '' : '/'}${current}`;
    }
    this.router.navigateByUrl(newUrl, { replaceUrl: true });

    this.closeDropdown();
  }
}
