import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcher } from './theme-switcher';
import { ThemeService } from '../../../core/theme/theme.service';
import { signal } from '@angular/core';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcher;
  let fixture: ComponentFixture<ThemeSwitcher>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme', 'applyTheme'], {
      isDarkMode: signal(true),
    });

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
      providers: [{ provide: ThemeService, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ThemeService', () => {
    expect(component.themeService).toBeTruthy();
  });
});
