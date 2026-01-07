import { Pipe, PipeTransform } from '@angular/core';
/*
  &w=1080
  &h=720
  &fm=jpg
  &q=80
*/
@Pipe({
  name: 'unsplashUrlFormatter'
})
export class UnsplashUrlFormatterPipe implements PipeTransform {
  transform(unsplashBaseUrl: string, [width, height]: [number, number]): string {
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
