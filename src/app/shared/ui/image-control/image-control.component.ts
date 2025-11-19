import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AbstractControlValueAccessorDirective } from '../../directives/abstract-control-value-accessor.directive';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { UnsplashImageChooserModalComponent } from '../unsplash-image-chooser-modal/unsplash-image-chooser-modal.component';
import { take } from 'rxjs';

export interface ImageControlOption {
  author: {
    fullName: string;
    profileUrl: string;
  },
  label: string;
  value: string;
  cover: string;
}

@Component({
  selector: 'app-image-control',
  imports: [FormsModule, DialogModule],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ImageControlComponent,
    multi: true,
  }],
})
export class ImageControlComponent extends AbstractControlValueAccessorDirective<string> {
  readonly dialog = inject(Dialog);

  openDialog(): void {
    const dialogRef = this.dialog.open<string | null>(UnsplashImageChooserModalComponent, {
      width: '600px',
    });

    dialogRef.closed.pipe(take(1)).subscribe(result => {
      this.value.set(result ?? this.value());
    });
  }
}
