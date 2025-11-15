import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AbstractControlValueAccessorDirective } from '../../directives/abstract-control-value-accessor.directive';

@Component({
  selector: 'app-image-control',
  imports: [ClickOutsideDirective, FormsModule],
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

  protected readonly isPanelOpen = signal<boolean>(false);

  // Available images - you can expand this list or load from a service
  readonly availableImages = signal<string[]>([
    '/illustrations/woman-earth-hugging.svg',
    'https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1761839258239-2be2146f1605?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '/illustrations/woman-earth-hugging.svg',
    '/images/services/placeholder1.jpg',
    '/images/services/placeholder2.jpg',
    '/illustrations/woman-earth-hugging.svg',
    '/images/services/placeholder1.jpg',
    '/images/services/placeholder2.jpg',
    '/illustrations/woman-earth-hugging.svg',
    '/images/services/placeholder1.jpg',
    '/images/services/placeholder2.jpg',
    '/illustrations/woman-earth-hugging.svg',
    '/images/services/placeholder1.jpg',
    '/images/services/placeholder2.jpg',
    // Add more image paths as needed
  ]);

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

  get filteredImages(): string[] {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.availableImages();
    }
    return this.availableImages().filter(img =>
      img.toLowerCase().includes(query)
    );
  }

  close(): void {
    this.isPanelOpen.set(false);
  }
}
