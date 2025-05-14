import { Component } from '@angular/core';
import { UserWidgetComponent } from '../../ui/user-widget/user-widget.component';
import { RouterLink } from '@angular/router';
import { ThemeSwitcherComponent } from '../../ui/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  imports: [UserWidgetComponent, RouterLink, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
