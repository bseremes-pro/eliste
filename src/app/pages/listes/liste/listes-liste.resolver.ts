import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { LivresService } from '../listes.service';
import { LivreBaseModel } from '../liste.model';

import { DataStore } from '../../../shell/data-store';

@Injectable()
export class LivresListePageResolver implements Resolve<any> {
  constructor(private livresService: LivresService) {}

  resolve() {
    const dataSource: Observable<Array<
      LivreBaseModel
    >> = this.livresService.getListeListesDataSource();

    const dataStore: DataStore<Array<
      LivreBaseModel
    >> = this.livresService.getListeListesDataStore(dataSource);

    return dataStore;
  }
}
