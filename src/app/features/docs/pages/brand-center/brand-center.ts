import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-center',
  imports: [RouterLink],
  templateUrl: './brand-center.html',
  styleUrl: './brand-center.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCenter {}
