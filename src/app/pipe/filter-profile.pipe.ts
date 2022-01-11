import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProfile',
})
export class FilterProfilePipe implements PipeTransform {
  transform(value: any, input: any): any {
    if (input) {
      const inputstring = input.toString();
      const year = inputstring.substr(
        inputstring.length - 4,
        inputstring.length
      );
      const month = inputstring.substring(
        inputstring.length - 6,
        inputstring.length - 5
      );
      const day = inputstring.substring(0, inputstring.length - 7);
      value = day + '-' + month + '-' + year;
      return value;
    } else {
      return value;
    }
  }
}
