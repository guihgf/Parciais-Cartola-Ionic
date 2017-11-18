import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatarNumeroPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatarNumero',
})
export class FormatarNumeroPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    return value.toLocaleString('pt-BR');
  }
}
