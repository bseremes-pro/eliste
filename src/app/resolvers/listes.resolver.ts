import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ListesService } from './../services/listes.service';

@Injectable()
export class ListesResolver implements Resolve<any> {

  constructor(public listeSvc: ListesService) { }

  resolve() {
    return this.listeSvc.charger();
  }
}
