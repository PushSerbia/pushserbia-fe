import { Component } from '@angular/core';
import { UserWidgetComponent } from '../../ui/user-widget/user-widget.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [UserWidgetComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
