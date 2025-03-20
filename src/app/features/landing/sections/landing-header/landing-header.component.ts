import { Component } from '@angular/core';
import { UserWidgetComponent } from './widgets/user-widget/user-widget.component';

@Component({
  selector: 'app-landing-header',
  imports: [UserWidgetComponent],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent {
}
