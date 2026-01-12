import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractFormUiControl } from '../../directives/abstract-form-ui-control';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { UnsplashImageChooserModal } from '../unsplash-image-chooser-modal/unsplash-image-chooser-modal';
import { take } from 'rxjs';

export interface ImageControlOption {
  author: {
    fullName: string;
    profileUrl: string;
  };
  label: string;
  value: string;
  cover: string;
}

@Component({
  selector: 'app-image-control',
  imports: [DialogModule],
  templateUrl: './image-control.html',
  styleUrl: './image-control.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'touched.set(true)'
  }
})
export class ImageControl extends AbstractFormUiControl<string> {
  readonly dialog = inject(Dialog);

  openDialog(): void {
    this.touched.set(true);

    const dialogRef = this.dialog.open<string | null>(
      UnsplashImageChooserModal,
      {
        width: '600px',
      },
    );

    dialogRef.closed.pipe(take(1)).subscribe((result) => {
      this.value.set(result ?? this.value());
    });
  }
}
