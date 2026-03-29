import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcher } from './theme-switcher';
import { ThemeManager } from '../../../core/theme/theme-manager';
import { signal } from '@angular/core';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcher;
  let fixture: ComponentFixture<ThemeSwitcher>;
  let mockThemeService: jasmine.SpyObj<ThemeManager>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeManager', ['toggleTheme', 'applyTheme'], {
      isDarkMode: signal(true),
    });

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
      providers: [{ provide: ThemeManager, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ThemeManager', () => {
    expect(component.themeService).toBeTruthy();
  });
});
