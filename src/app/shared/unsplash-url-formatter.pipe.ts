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
  transform(unsplashBaseUrl: string, dimensions: [number, number]): string {
    unsplashBaseUrl = unsplashBaseUrl.split('?')[0]; // Remove existing query params if any

    const crop = 'entropy';
    const [width, height] = dimensions;
    const quality = 80;
    const format = 'webp';

    return `${unsplashBaseUrl}?crop=${crop}&w=${width}&h=${height}&fm=${format}&q=${quality}`;
  }
}
