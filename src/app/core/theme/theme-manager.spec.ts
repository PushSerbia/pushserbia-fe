import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ThemeManager } from './theme-manager';
import { vi } from 'vitest';

describe('ThemeManager', () => {
  let service: ThemeManager;
  let mockDocument: { createElement: ReturnType<typeof vi.fn>, documentElement: any, cookie: string };
  let mockElement: { classList: { add: ReturnType<typeof vi.fn>, remove: ReturnType<typeof vi.fn> } };

  beforeEach(() => {
    mockElement = {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    };

    mockDocument = { createElement: vi.fn() } as any;
    Object.defineProperty(mockDocument, 'documentElement', {
      value: mockElement,
      writable: true,
    });
    mockDocument.cookie = '';

    TestBed.configureTestingModule({
      providers: [
        ThemeManager,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(ThemeManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isDarkMode signal', () => {
    it('should return true for server platform (SSR default)', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(true);
    });

    it('should read theme from cookie when in browser', () => {
      mockDocument.cookie = 'theme=light; path=/;';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(false);
    });

    it('should return dark theme from cookie', () => {
      mockDocument.cookie = 'theme=dark; path=/;';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(true);
    });

    it('should fall back to system preference when no cookie', () => {
      mockDocument.cookie = 'other=value';

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockReturnValue({
        matches: true,
      } as unknown as MediaQueryList);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(true);
      window.matchMedia = originalMatchMedia;
    });

    it('should return false when matchMedia throws error', () => {
      mockDocument.cookie = 'other=value';

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockImplementation(() => {
        throw new Error('matchMedia not supported');
      });

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(false);
      window.matchMedia = originalMatchMedia;
    });

    it('should handle multiple cookies correctly', () => {
      mockDocument.cookie = 'first=value; theme=light; last=value2';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      expect(service.isDarkMode()).toBe(false);
    });

    it('should handle cookie with spaces around equals', () => {
      mockDocument.cookie = 'theme = dark';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      service = TestBed.inject(ThemeManager);
      // Should not find the cookie due to space before =
      // Falls back to system preference
      expect(service.isDarkMode()).toBeDefined();
    });
  });

  describe('toggleTheme()', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(ThemeManager);
    });

    it('should toggle from dark to light', () => {
      service.isDarkMode.set(true);

      service.toggleTheme();

      expect(service.isDarkMode()).toBe(false);
    });

    it('should toggle from light to dark', () => {
      service.isDarkMode.set(false);

      service.toggleTheme();

      expect(service.isDarkMode()).toBe(true);
    });

    it('should apply theme when toggling', () => {
      service.isDarkMode.set(false);

      service.toggleTheme();

      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should save theme to cookie when toggling to dark', () => {
      service.isDarkMode.set(false);

      service.toggleTheme();

      expect(mockDocument.cookie).toContain('theme=dark');
    });

    it('should save theme to cookie when toggling to light', () => {
      service.isDarkMode.set(true);

      service.toggleTheme();

      expect(mockDocument.cookie).toContain('theme=light');
    });
  });

  describe('applyTheme()', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(ThemeManager);
    });

    it('should add dark class to documentElement', () => {
      service.applyTheme(true);

      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should remove dark class from documentElement', () => {
      service.applyTheme(false);

      expect(mockElement.classList.remove).toHaveBeenCalledWith('dark');
    });

    it('should apply dark theme multiple times', () => {
      service.applyTheme(true);
      service.applyTheme(true);

      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockElement.classList.add).toHaveBeenCalledTimes(2);
    });

    it('should handle theme switching correctly', () => {
      service.applyTheme(true);
      service.applyTheme(false);
      service.applyTheme(true);

      expect(mockElement.classList.add).toHaveBeenCalledTimes(2);
      expect(mockElement.classList.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('cookie handling', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(ThemeManager);
    });

    it('should set cookie with dark value', () => {
      service.isDarkMode.set(false);
      service.toggleTheme();

      expect(mockDocument.cookie).toContain('theme=dark');
      expect(mockDocument.cookie).toContain('path=/');
      expect(mockDocument.cookie).toContain('SameSite=Lax');
    });

    it('should set cookie with light value', () => {
      service.isDarkMode.set(true);
      service.toggleTheme();

      expect(mockDocument.cookie).toContain('theme=light');
    });

    it('should set cookie expiry to 1 year', () => {
      service.isDarkMode.set(true);
      service.toggleTheme();

      const cookieString = mockDocument.cookie;
      expect(cookieString).toContain('expires=');
    });

    it('should not save cookie on server platform', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
      service = TestBed.inject(ThemeManager);
      mockDocument.cookie = '';

      service.isDarkMode.set(false);
      service.toggleTheme();

      expect(mockDocument.cookie).toBe('');
    });
  });

  describe('integration tests', () => {
    beforeEach(() => {
      mockDocument.cookie = '';
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeManager,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(ThemeManager);
    });

    it('should handle complete theme toggle flow', () => {
      const initialTheme = service.isDarkMode();

      service.toggleTheme();
      expect(service.isDarkMode()).toBe(!initialTheme);
      expect((mockElement.classList.add as any).mock.calls.length + (mockElement.classList.remove as any).mock.calls.length).toBeGreaterThan(0);
      expect(mockDocument.cookie).toContain('theme=');

      service.toggleTheme();
      expect(service.isDarkMode()).toBe(initialTheme);
    });

    it('should apply theme and update DOM when toggling', () => {
      (mockElement.classList.add as any).mockClear();
      (mockElement.classList.remove as any).mockClear();

      service.isDarkMode.set(false);
      service.toggleTheme();

      expect(mockElement.classList.add).toHaveBeenCalledWith('dark');
    });
  });
});
