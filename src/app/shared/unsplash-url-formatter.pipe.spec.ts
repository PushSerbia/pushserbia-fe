import { UnsplashUrlFormatter } from './unsplash-url-formatter';

describe('UnsplashUrlFormatterPipe', () => {
  let pipe: UnsplashUrlFormatter;

  beforeEach(() => {
    pipe = new UnsplashUrlFormatter();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format URL with width, height, and webp params', () => {
    const result = pipe.transform('https://images.unsplash.com/photo-123', {
      width: 600,
      height: 400,
    });
    expect(result).toContain('w=600');
    expect(result).toContain('h=400');
    expect(result).toContain('fm=webp');
    expect(result).toContain('q=80');
    expect(result).toContain('crop=entropy');
  });

  it('should strip existing query params from base URL', () => {
    const result = pipe.transform(
      'https://images.unsplash.com/photo-123?ixlib=rb-4.0.3&auto=format',
      { width: 300, height: 200 },
    );
    expect(result).not.toContain('ixlib');
    expect(result).not.toContain('auto=format');
    expect(result).toContain('w=300');
    expect(result).toContain('h=200');
  });

  it('should handle URL without existing query params', () => {
    const result = pipe.transform('https://images.unsplash.com/photo-456', {
      width: 100,
      height: 100,
    });
    expect(result).toBe(
      'https://images.unsplash.com/photo-456?crop=entropy&w=100&h=100&fm=webp&q=80',
    );
  });
});
