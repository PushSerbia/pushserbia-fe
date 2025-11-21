import { Component } from '@angular/core';
import { UserWidget } from '../../ui/user-widget/user-widget';
import { RouterLink } from '@angular/router';
import { ThemeSwitcher } from '../../ui/theme-switcher/theme-switcher';

@Component({
  selector: 'app-header',
  imports: [UserWidget, RouterLink, ThemeSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
