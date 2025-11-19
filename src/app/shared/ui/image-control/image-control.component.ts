import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AbstractControlValueAccessorDirective } from '../../directives/abstract-control-value-accessor.directive';
import { NgTemplateOutlet } from '@angular/common';

export interface ImageControlOption {
  author?: string;
  label?: string;
  value: string;
  cover: string;
}

@Component({
  selector: 'app-image-control',
  imports: [ClickOutsideDirective, FormsModule, NgTemplateOutlet],
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
  readonly searchQuery = model<string>('');
  readonly options = input<ImageControlOption[]>([]);
  readonly isLoading = input<boolean>(false);

  protected readonly isPanelOpen = signal<boolean>(false);

  readonly images = computed<string[]>(() => this.options().map(option => option.value));

  override writeValue(value: string | null): void {
    this.value.set(value ?? '/illustrations/woman-earth-hugging.svg');
  }

  togglePanel(): void {
    if (!this.disabled()) {
      this.isPanelOpen.set(!this.isPanelOpen());
      if (this.isPanelOpen()) {
        this.onTouched();
      }
    }
  }

  selectImage(imagePath: string): void {
    this.value.set(imagePath);
    this.isPanelOpen.set(false);
    this.onTouched();
  }

  close(): void {
    this.isPanelOpen.set(false);
  }
}
