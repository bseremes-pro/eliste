import { Pipe, PipeTransform } from '@angular/core';
import { ListesService } from './../services/listes.service';

@Pipe({
  name: 'liste',
  pure: true
})
export class ListePipe implements PipeTransform {

  constructor(public ls: ListesService) { }

  transform(value: any, code: string, prop: string): any {
    const liste = this.ls.getListe(code);
    if (liste) {
      const resultat = liste.find(elem => elem.code === value);
      if (resultat && prop) { return resultat[prop]; }
      return resultat || value;
    }
    return value;
  }

}
