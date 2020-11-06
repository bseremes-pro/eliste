import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LivresService } from '../../listes.service';
import { LivreCompletModel } from '../liste-details.model';

import { DataStore } from '../../../../shell/data-store';

@Injectable()
export class LivreEditionResolver implements Resolve<any> {
  constructor(private livresService: LivresService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    const completDataSource: Observable<LivreCompletModel> = this.livresService.getListeCompleteDataSource(
      id
    );

    const completDataStore: DataStore<LivreCompletModel> = this.livresService.getListeCompleteDataStore(
      completDataSource
    );

    return { livre: completDataStore };
  }
}
