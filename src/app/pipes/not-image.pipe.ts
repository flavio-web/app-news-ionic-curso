import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notImage',
  standalone: true
})
export class NotImagePipe implements PipeTransform {

  transform( image?: string | null ): string {
    if( image ) return image;

    return 'assets/img/not-image.png';
  }

}
