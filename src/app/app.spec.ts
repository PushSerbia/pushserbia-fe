import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { ThemeManager } from './core/theme/theme-manager';

describe('App', () => {
  let mockThemeService: jasmine.SpyObj<ThemeManager>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeManager', ['applyTheme'], {
      isDarkMode: jasmine.createSpy().and.returnValue(true),
    });

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
