import { Component, DestroyRef, inject, model, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageControlOption } from '../image-control/image-control.component';
import { DialogRef } from '@angular/cdk/dialog';
import { UnsplashService } from '../../../core/unsplash/services/unsplash.service';
import { debounce, distinctUntilChanged, filter, startWith, switchMap, take, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-unsplash-image-chooser-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './unsplash-image-chooser-modal.component.html',
  styleUrl: './unsplash-image-chooser-modal.component.css',
})
export class UnsplashImageChooserModalComponent implements OnInit {
  private readonly unsplash = inject(UnsplashService);
  private readonly dialogRef = inject<DialogRef<string | null>>(DialogRef<string | null>);
  private readonly destroyRef = inject(DestroyRef);
  readonly searchQuery = new FormControl<string>('', { nonNullable: true });
  readonly value = model<string | null>(null);
  readonly isLoading = signal<boolean>(true);

  private initialLoading = true;

  readonly options = signal<ImageControlOption[]>([]);

  ngOnInit(): void {
    this.loadUnsplashImagesOnSearchQueryChange();
  }

  selectImage(imagePath: string): void {
    this.value.set(imagePath);
    this.dialogRef.close(imagePath);
  }

  close(): void {
    this.dialogRef.close(null);
  }

  private loadUnsplashImagesOnSearchQueryChange(): void {
    this.searchQuery.valueChanges.pipe(
      startWith('Community'),
      debounce(() => this.initialLoading ? timer(0) : timer(1500)),
      filter(query => query.trim().length > 0),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap(query => this.unsplash.searchPhotos(query)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (photos) => {
        const options = photos.map(photo => ({
          value: photo.urls.small,
          cover: photo.urls.thumb,
          label: photo.description || 'Unsplash Image',
          author: {
            fullName: photo.user.name,
            profileUrl: photo.user.links.html
          },
        }));
        this.options.set(options);
        this.initialLoading = false;
        this.isLoading.set(false);
      },
      error: () => {
        this.initialLoading = false;
        this.isLoading.set(false);
      }
    });
  }
}
