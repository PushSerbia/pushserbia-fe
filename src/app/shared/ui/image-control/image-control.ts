import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AbstractControlValueAccessorDirective } from '../../directives/abstract-control-value-accessor.directive';
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
  imports: [FormsModule, DialogModule],
  templateUrl: './image-control.html',
  styleUrl: './image-control.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageControl,
      multi: true,
    },
  ],
})
export class ImageControl extends AbstractControlValueAccessorDirective<string> {
  readonly dialog = inject(Dialog);

  openDialog(): void {
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
