import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface SearchOption {
  displayText: string;  // i18n key to display
  searchText: string;   // Text to use for searching (translated)
  count: number;        // Number of questions containing this term
  importance?: number;  // Importance factor for ordering (higher is more important)
}

interface FaqItemKeys {
  titleKey: string;
  descriptionKey: string;
}

interface FaqItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing-faq',
  imports: [FormsModule, TranslateModule],
  templateUrl: './landing-faq.component.html',
  styleUrl: './landing-faq.component.css',
})
export class LandingFaqComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);

  // State variables for show all functionality and search
  showAllQuestions = false;
  searchQuery = '';

  // Number of questions to show initially
  initialQuestionsCount = 6;

  // Search options for quick filtering
  searchOptions: SearchOption[] = [];

  // Translated FAQ content derived from keys
  private translatedFaq: FaqItem[] = [];
  private langSub?: Subscription;
  private translationSub?: Subscription;
  private defaultLangSub?: Subscription;

  // Computed property to get filtered questions
  get faq() {
    let filteredFaq = this.translatedFaq;

    // Filter by search query if it exists
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filteredFaq = filteredFaq.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    }

    // Limit the number of questions if not showing all
    if (!this.showAllQuestions && !this.searchQuery.trim()) {
      return filteredFaq.slice(0, this.initialQuestionsCount);
    }

    return filteredFaq;
  }

  // Toggle show all questions
  toggleShowAll() {
    this.showAllQuestions = !this.showAllQuestions;
  }

  // Clear search query
  clearSearch() {
    this.searchQuery = '';
  }

  // Set search query to the selected option's search text
  setSearchOption(option: SearchOption) {
    this.searchQuery = option.searchText;
  }

  ngOnInit() {
    this.rebuildTranslatedFaqAndOptions();
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.rebuildTranslatedFaqAndOptions();
    });
    this.translationSub = this.translate.onTranslationChange.subscribe(() => {
      this.rebuildTranslatedFaqAndOptions();
    });
    this.defaultLangSub = this.translate.onDefaultLangChange.subscribe(() => {
      this.rebuildTranslatedFaqAndOptions();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.translationSub?.unsubscribe();
    this.defaultLangSub?.unsubscribe();
  }

  // Resolve translation with fallback: try FAQ path first, then LANDING.ITEMS.*
  private resolve(key: string, fallbackKey?: string): string {
    const value = this.translate.instant(key);
    if (value === key && fallbackKey) {
      const fallback = this.translate.instant(fallbackKey);
      return fallback;
    }
    return value;
  }

  private rebuildTranslatedFaqAndOptions() {
    // Build translated FAQ from keys with fallback to LANDING.ITEMS
    this.translatedFaq = this.originalFaqKeys.map((k) => ({
      title: this.resolve(k.titleKey, k.titleKey.replace('LANDING.FAQ.', 'LANDING.')),
      description: this.resolve(k.descriptionKey, k.descriptionKey.replace('LANDING.FAQ.', 'LANDING.')),
    }));

    // Define the search options using translated words (so search is language-aware)
    const optionDefinitions = [
      { displayText: 'LANDING.FAQ.OPTIONS.PROJECT', importance: 10 },
      { displayText: 'LANDING.FAQ.OPTIONS.PLATFORM', importance: 9 },
      { displayText: 'LANDING.FAQ.OPTIONS.REGISTRATION', importance: 8 },
      { displayText: 'LANDING.FAQ.OPTIONS.VOTING', importance: 7 },
      { displayText: 'LANDING.FAQ.OPTIONS.MEMBERSHIP', importance: 6 },
      { displayText: 'LANDING.FAQ.OPTIONS.OPEN_SOURCE', importance: 5 },
      { displayText: 'LANDING.FAQ.OPTIONS.LINKEDIN', importance: 4 },
      { displayText: 'LANDING.FAQ.OPTIONS.NOTIFICATIONS', importance: 3 },
      { displayText: 'LANDING.FAQ.OPTIONS.LEVEL', importance: 2 },
      { displayText: 'LANDING.FAQ.OPTIONS.LOGIN', importance: 1 },
    ].map((o) => ({
      ...o,
      // use translated term as the search text
      searchText: String(this.translate.instant(o.displayText)),
      count: 0,
    }));

    // Count occurrences for each option against translated FAQ
    const optionsWithCounts = optionDefinitions.map((option) => {
      const count = this.countQuestionsContaining(option.searchText);
      return { ...option, count } as SearchOption;
    });

    // Filter options with at least 3 matches
    const viableOptions = optionsWithCounts.filter((option) => option.count >= 3);

    // Select the 6 best options based on a combination of count and importance
    this.searchOptions = viableOptions
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return (b.importance || 0) - (a.importance || 0);
      })
      .slice(0, 6)
      .sort((a, b) => (b.importance || 0) - (a.importance || 0));
  }

  // Count how many questions contain the given search term (uses translated texts)
  private countQuestionsContaining(searchTerm: string): number {
    const term = (searchTerm || '').toLowerCase();
    if (!term) return 0;
    return this.translatedFaq.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term),
    ).length;
  }

  // Get total number of questions
  get totalQuestionsCount() {
    return this.originalFaqKeys.length;
  }

  // Get number of hidden questions
  get hiddenQuestionsCount() {
    return this.totalQuestionsCount - this.initialQuestionsCount;
  }

  // Original FAQ keys (i18n-driven)
  private originalFaqKeys: FaqItemKeys[] = [
    { titleKey: 'LANDING.FAQ.ITEMS.0.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.0.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.1.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.1.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.2.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.2.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.3.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.3.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.4.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.4.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.5.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.5.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.6.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.6.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.7.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.7.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.8.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.8.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.9.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.9.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.10.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.10.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.11.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.11.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.12.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.12.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.13.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.13.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.14.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.14.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.15.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.15.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.16.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.16.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.17.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.17.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.18.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.18.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.19.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.19.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.20.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.20.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.21.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.21.DESC' },
    { titleKey: 'LANDING.FAQ.ITEMS.22.TITLE', descriptionKey: 'LANDING.FAQ.ITEMS.22.DESC' },
  ];
}
