import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {
  readonly prefix = input<string>('Greška!');
  readonly message = input<string>('');
}
