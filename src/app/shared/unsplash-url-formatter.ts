import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unsplashUrlFormatter',
})
export class UnsplashUrlFormatter implements PipeTransform {
  transform(unsplashBaseUrl: string, {width, height}: {width: number, height: number}): string {
    const baseUrl = unsplashBaseUrl.split('?')[0];
    const params = new URLSearchParams({
      crop: 'entropy',
      w: width.toString(),
      h: height.toString(),
      fm: 'webp',
      q: '80'
    });

    return `${baseUrl}?${params}`;
  }
}
