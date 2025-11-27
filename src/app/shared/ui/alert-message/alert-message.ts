import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertMessage {
  readonly prefix = input<string>('Greška!');
  readonly message = input<string>('');
}
