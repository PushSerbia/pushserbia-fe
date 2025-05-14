import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private readonly document = inject(DOCUMENT);
  private readonly gtmId = environment.gtmId;

  /**
   * Initialize Google Tag Manager if in production environment
   */
  initialize(): void {
    if (environment.production) {
      this.injectGtmScript();
      this.injectGtmNoScript();
    }
  }

  /**
   * Inject the GTM script into the head of the document
   */
  private injectGtmScript(): void {
    const script = this.document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.gtmId}');
    `;
    this.document.head.insertBefore(script, this.document.head.firstChild);
  }

  /**
   * Inject the GTM noscript iframe into the body of the document
   */
  private injectGtmNoScript(): void {
    const noscript = this.document.createElement('noscript');
    const iframe = this.document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    this.document.body.insertBefore(noscript, this.document.body.firstChild);
  }
}
