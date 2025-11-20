import {
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageControlOption } from '../image-control/image-control';
import { DialogRef } from '@angular/cdk/dialog';
import { UnsplashService } from '../../../core/unsplash/services/unsplash.service';
import {
  catchError,
  debounce,
  distinctUntilChanged,
  filter,
  of,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-unsplash-image-chooser-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './unsplash-image-chooser-modal.html',
  styleUrl: './unsplash-image-chooser-modal.css',
})
export class UnsplashImageChooserModal implements OnInit {
  private readonly unsplash = inject(UnsplashService);
  private readonly dialogRef = inject<DialogRef<string | null>>(
    DialogRef<string | null>,
  );
  private readonly destroyRef = inject(DestroyRef);
  readonly searchQuery = new FormControl<string>('', { nonNullable: true });
  readonly value = model<string | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);

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
    this.searchQuery.valueChanges
      .pipe(
        startWith('Community'),
        debounce(() => (this.initialLoading ? timer(0) : timer(1500))),
        filter((query) => query.trim().length > 0),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading.set(true);
          this.hasError.set(false);
        }),
        switchMap((query) => this.unsplash.searchPhotos(query)),
        catchError(() => {
          this.hasError.set(true);
          return of([]);
        }),
        tap((photos) => {
          const options = photos.map((photo) => ({
            value: photo.urls.small,
            cover: photo.urls.thumb,
            label: photo.description || 'Unsplash Image',
            author: {
              fullName: photo.user.name,
              profileUrl: photo.user.links.html,
            },
          }));
          this.options.set(options);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.initialLoading = false;
          this.isLoading.set(false);
        },
        error: () => {
          this.initialLoading = false;
          this.isLoading.set(false);
        },
      });
  }
}
