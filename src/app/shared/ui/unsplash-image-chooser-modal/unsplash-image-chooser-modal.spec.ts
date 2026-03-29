import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnsplashImageChooserModal } from './unsplash-image-chooser-modal';
import { UnsplashApi } from '../../../core/unsplash/services/unsplash-api';
import { DialogRef } from '@angular/cdk/dialog';
import { of, throwError } from 'rxjs';
import { UnsplashPhoto } from '../../../core/unsplash/interfaces/unsplash-photo';

function createMockPhoto(overrides: Partial<UnsplashPhoto> = {}): UnsplashPhoto {
  return {
    id: '1',
    slug: 'test',
    alternative_slugs: {},
    created_at: '',
    updated_at: '',
    promoted_at: null,
    width: 100,
    height: 100,
    color: '#000',
    blur_hash: '',
    description: 'Test photo',
    alt_description: null,
    breadcrumbs: [],
    urls: {
      raw: 'https://unsplash.com/raw',
      full: 'https://unsplash.com/full',
      regular: 'https://unsplash.com/regular',
      small: 'https://unsplash.com/small',
      thumb: 'https://unsplash.com/thumb',
      small_s3: 'https://unsplash.com/small_s3',
    },
    links: {
      self: 'https://unsplash.com/self',
      html: 'https://unsplash.com/html',
      download: 'https://unsplash.com/download',
      download_location: 'https://unsplash.com/download_location',
    },
    likes: 0,
    liked_by_user: false,
    bookmarked: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    asset_type: 'photo',
    premium: false,
    plus: false,
    user: {
      id: 'u1',
      updated_at: '',
      username: 'testuser',
      name: 'Test User',
      first_name: 'Test',
      last_name: 'User',
      twitter_username: null,
      portfolio_url: null,
      bio: null,
      location: null,
      links: {
        self: '',
        html: 'https://unsplash.com/@testuser',
        photos: '',
        likes: '',
        portfolio: '',
      },
      profile_image: { small: '', medium: '', large: '' },
      instagram_username: null,
      total_collections: 0,
      total_likes: 0,
      total_photos: 0,
      total_promoted_photos: 0,
      total_illustrations: 0,
      total_promoted_illustrations: 0,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: null,
        portfolio_url: null,
        twitter_username: null,
        paypal_email: null,
      },
    },
    search_source: 'web',
    ...overrides,
  } as UnsplashPhoto;
}

describe('UnsplashImageChooserModal', () => {
  let component: UnsplashImageChooserModal;
  let fixture: ComponentFixture<UnsplashImageChooserModal>;
  let mockUnsplashService: jasmine.SpyObj<UnsplashApi>;
  let mockDialogRef: jasmine.SpyObj<DialogRef<string | null>>;

  beforeEach(() => {
    jasmine.clock().install();

    mockUnsplashService = jasmine.createSpyObj('UnsplashApi', [
      'searchPhotos',
    ]);
    mockUnsplashService.searchPhotos.and.returnValue(of([]));

    mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [UnsplashImageChooserModal],
      providers: [
        { provide: UnsplashApi, useValue: mockUnsplashService },
        { provide: DialogRef, useValue: mockDialogRef },
      ],
    });

    fixture = TestBed.createComponent(UnsplashImageChooserModal);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load initial photos with "Community" query on init', () => {
    const photos = [createMockPhoto()];
    mockUnsplashService.searchPhotos.and.returnValue(of(photos));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(mockUnsplashService.searchPhotos).toHaveBeenCalledWith('Community');
    expect(component.options().length).toBe(1);
    expect(component.isLoading()).toBeFalse();
    expect(component.hasError()).toBeFalse();
  });

  it('should set hasError to true when API call fails', () => {
    mockUnsplashService.searchPhotos.and.returnValue(
      throwError(() => new Error('API error')),
    );

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(component.hasError()).toBeTrue();
    expect(component.options().length).toBe(0);
  });

  it('should keep stream alive after an error and recover on next search', () => {
    // First call fails
    mockUnsplashService.searchPhotos.and.returnValue(
      throwError(() => new Error('API error')),
    );

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(component.hasError()).toBeTrue();

    // Second call succeeds
    const photos = [createMockPhoto()];
    mockUnsplashService.searchPhotos.and.returnValue(of(photos));

    component.searchQuery.setValue('Nature');
    jasmine.clock().tick(1500);

    expect(component.hasError()).toBeFalse();
    expect(component.options().length).toBe(1);
    expect(component.isLoading()).toBeFalse();
  });

  it('should reset hasError before each new search', () => {
    mockUnsplashService.searchPhotos.and.returnValue(
      throwError(() => new Error('API error')),
    );

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(component.hasError()).toBeTrue();

    // Start a new search — hasError should reset before API call
    mockUnsplashService.searchPhotos.and.returnValue(of([]));
    component.searchQuery.setValue('Trees');
    jasmine.clock().tick(1500);

    expect(component.hasError()).toBeFalse();
  });

  it('should set isLoading to false after search completes', () => {
    mockUnsplashService.searchPhotos.and.returnValue(of([]));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(component.isLoading()).toBeFalse();
  });

  it('should map photos to ImageControlOption format', () => {
    const photo = createMockPhoto({
      description: 'Beautiful landscape',
    });
    mockUnsplashService.searchPhotos.and.returnValue(of([photo]));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    const options = component.options();
    expect(options.length).toBe(1);
    expect(options[0].value).toBe('https://unsplash.com/small');
    expect(options[0].cover).toBe('https://unsplash.com/thumb');
    expect(options[0].label).toBe('Beautiful landscape');
    expect(options[0].author.fullName).toBe('Test User');
    expect(options[0].author.profileUrl).toBe(
      'https://unsplash.com/@testuser',
    );
  });

  it('should use "Unsplash Image" as fallback label when description is null', () => {
    const photo = createMockPhoto({ description: null });
    mockUnsplashService.searchPhotos.and.returnValue(of([photo]));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    expect(component.options()[0].label).toBe('Unsplash Image');
  });

  it('should debounce subsequent searches by 1500ms', () => {
    mockUnsplashService.searchPhotos.and.returnValue(of([]));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    mockUnsplashService.searchPhotos.calls.reset();

    component.searchQuery.setValue('Na');
    jasmine.clock().tick(500);
    component.searchQuery.setValue('Nat');
    jasmine.clock().tick(500);
    component.searchQuery.setValue('Nature');
    jasmine.clock().tick(1500);

    // Only the last value should trigger a search
    expect(mockUnsplashService.searchPhotos).toHaveBeenCalledTimes(1);
    expect(mockUnsplashService.searchPhotos).toHaveBeenCalledWith('Nature');
  });

  it('should not search for empty or whitespace queries', () => {
    mockUnsplashService.searchPhotos.and.returnValue(of([]));

    fixture.detectChanges();
    jasmine.clock().tick(0);

    mockUnsplashService.searchPhotos.calls.reset();

    component.searchQuery.setValue('   ');
    jasmine.clock().tick(1500);

    expect(mockUnsplashService.searchPhotos).not.toHaveBeenCalled();
  });

  it('should close dialog with selected image path without query params', () => {
    component.selectImage('https://unsplash.com/photo?w=400&h=300');

    expect(component.value()).toBe('https://unsplash.com/photo');
    expect(mockDialogRef.close).toHaveBeenCalledWith(
      'https://unsplash.com/photo',
    );
  });

  it('should close dialog with null when close is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });
});
