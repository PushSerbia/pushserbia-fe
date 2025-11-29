import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-financing-details',
  imports: [RouterLink],
  templateUrl: './financing-details.html',
  styleUrl: './financing-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancingDetails {}
