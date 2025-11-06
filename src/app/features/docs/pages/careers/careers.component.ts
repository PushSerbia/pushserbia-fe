import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);

  // Arrays used by the template's @for blocks
  fullstackResponsibilities: string[] = [];
  uxuiResponsibilities: string[] = [];
  communityResponsibilities: string[] = [];
  processSteps: string[] = [];

  private subs: Subscription[] = [];

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }

  ngOnInit(): void {
    // Load translations initially
    this.loadTranslatedArrays();

    // Update arrays when language changes
    const langSub = this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedArrays();
    });
    this.subs.push(langSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.subs = [];
  }

  private loadTranslatedArrays() {
    // Use get(...) which returns an observable and resolves arrays defined in json
    const keys = [
      'DOCS.CAREERS.POSITIONS.FULLSTACK.RESPONSIBILITIES',
      'DOCS.CAREERS.POSITIONS.UXUI.RESPONSIBILITIES',
      'DOCS.CAREERS.POSITIONS.COMMUNITY.RESPONSIBILITIES',
      'DOCS.CAREERS.PROCESS_STEPS',
    ];

    const sub = this.translate
      .get(keys)
      .subscribe((res: Record<string, unknown>) => {
        // Parse arrays safely
        this.fullstackResponsibilities = this.getArrayFromResult(res, keys[0]);
        this.uxuiResponsibilities = this.getArrayFromResult(res, keys[1]);
        this.communityResponsibilities = this.getArrayFromResult(res, keys[2]);
        this.processSteps = this.getArrayFromResult(res, keys[3]);
      });

    this.subs.push(sub);
  }

  private getArrayFromResult(
    result: Record<string, unknown>,
    key: string,
  ): string[] {
    const value = result[key];
    if (value === undefined || value === null) return [];
    if (Array.isArray(value)) return value.map((v) => String(v));
    return this.toStringArray(value);
  }

  private toStringArray(value: unknown): string[] {
    if (value === undefined || value === null) return [];
    if (Array.isArray(value)) return value.map((v) => String(v));
    if (typeof value === 'string') {
      return value
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [String(value)];
  }
}
