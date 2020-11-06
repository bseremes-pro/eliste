import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(input: any): any {
    if (!isString(input)) {
      return input;
    }
    if (!input.trim()) {
      return input;
    }
    return upperFirst(input);
  }

}

function isString(value: any): value is string {
  return typeof value === 'string';
}

export function upperFirst(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
