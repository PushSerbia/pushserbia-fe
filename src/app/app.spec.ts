import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { ThemeManager } from './core/theme/theme-manager';

describe('App', () => {
  let mockThemeService: any;

  beforeEach(async () => {
    mockThemeService = {
      applyTheme: vi.fn(),
      isDarkMode: vi.fn().mockReturnValue(true),
    } as any as ThemeManager;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: ThemeManager, useValue: mockThemeService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply theme on construction', () => {
    TestBed.createComponent(App);
    expect(mockThemeService.applyTheme).toHaveBeenCalledWith(true);
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
