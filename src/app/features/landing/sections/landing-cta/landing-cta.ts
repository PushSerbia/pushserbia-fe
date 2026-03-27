import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-cta',
  imports: [RouterLink],
  templateUrl: './landing-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingCta {}
