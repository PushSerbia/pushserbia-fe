import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  imports: [],
  templateUrl: './page-loader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoader {}
