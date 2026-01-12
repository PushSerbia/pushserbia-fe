import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-licensing',
  imports: [RouterLink],
  templateUrl: './licensing.html',
  styleUrl: './licensing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Licensing {}
