import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LivresService } from '../../listes.service';
import { LivreCompletModel } from '../liste-details.model';

import { DataStore } from '../../../../shell/data-store';

@Injectable()
export class LivreDetailsResolver implements Resolve<any> {
  constructor(private firebaseService: LivresService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const userId = route.paramMap.get('id');

    const combinedUserDataSource: Observable<LivreCompletModel> = this.firebaseService.getListeCompleteDataSource(
      userId
    );

    const combinedUserDataStore: DataStore<LivreCompletModel> = this.firebaseService.getListeCompleteDataStore(
      combinedUserDataSource
    );

    return { user: combinedUserDataStore };
  }
}
