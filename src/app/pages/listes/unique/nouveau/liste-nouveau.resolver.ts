import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LivresService } from '../../listes.service';
// import { BoutiqueProduitModel } from '../livre-details.model';

import { DataStore } from '../../../../shell/data-store';

@Injectable()
export class LivreNouveauResolver implements Resolve<any> {
  constructor(private firebaseService: LivresService) {}

  resolve(route: ActivatedRouteSnapshot) {
    /* const userId = route.paramMap.get('id');

    const combinedUserDataSource: Observable<BoutiqueProduitModel> = this.firebaseService
      .getBoutiqueBaseDataSource(userId);

    const combinedUserDataStore: DataStore<BoutiqueProduitModel> = this.firebaseService
      .getBoutiqueBaseDataStore(combinedUserDataSource); */

    return { user: null };
  }
}
