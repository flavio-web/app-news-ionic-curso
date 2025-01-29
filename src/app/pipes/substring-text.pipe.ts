import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substringText',
  standalone: true
})
export class SubstringTextPipe implements PipeTransform {

  transform( texto: string, caracteres: number = 80 ): string {
    if( texto.length > caracteres ){
      return texto.substring(0, caracteres) + '...';
    }

    return texto;
  }

}
