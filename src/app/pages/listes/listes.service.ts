import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { Observable, of, throwError, combineLatest, from } from 'rxjs';
import { map, concatMap, switchMap } from 'rxjs/operators';

import { DataStore, ShellModel } from '../../shell/data-store';

import { LivreBaseModel } from './liste.model';
import { LivreCompletModel } from './unique/liste-details.model';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable()
export class LivresService {
  // Store pour la page liste des Listes
  private listeLivresDataStore: DataStore<Array<LivreBaseModel>>;
  // Store pour la page détails complète d'un Livre
  private livreCompletDataStore: DataStore<LivreCompletModel>;

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  /**
   * Crée une Liste
   * @param data données
   */
  public creerListe(data: any): Promise<any> {
    // on wrappe les data dans un BaseModel simple
    const base = new LivreBaseModel(data);
    // on supprime les champs générés
    delete base.id;
    delete base.isShell;
    return this.afStore.collection('elistes').add({ ...base });
  }

  /**
   * Modifie une Liste
   * @param data données
   */
  public modifierListe(data: any): Promise<void> {
    // on wrappe les data dans un BaseModel simple
    const base = new LivreBaseModel(data);
    const id = base.id;
    // on supprime les champs générés
    delete base.id;
    delete base.isShell;
    return this.afStore
      .collection('elistes')
      .doc(id)
      .set({ ...base });
  }

  /**
   * Renvoie un Observable sur la liste des Listes
   */
  public getListeListesDataSource(): Observable<Array<LivreBaseModel>> {
    return this.afStore
      .collection<LivreBaseModel>('elistes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((actions) =>
          actions.map((base) => {
            return { ...base } as LivreBaseModel;
          })
        )
      );
  }

  /**
   * Charge et renvoie la liste des Listes ou un shell model si en chargement
   * @param dataSource Observable sur la liste des Listes
   */
  public getListeListesDataStore(
    dataSource: Observable<Array<LivreBaseModel>>
  ): DataStore<Array<LivreBaseModel>> {
    if (!this.listeLivresDataStore) {
      // on initialise le shell model
      const shellModel: Array<LivreBaseModel> = [
        new LivreBaseModel(),
        new LivreBaseModel(),
        new LivreBaseModel(),
        new LivreBaseModel(),
      ];
      // on remplit notre store avec le shell model
      this.listeLivresDataStore = new DataStore(shellModel);
      // on lance le chargement la dataSource
      this.listeLivresDataStore.load(dataSource);
    }

    // dans tous les cas, on renvoie le store
    return this.listeLivresDataStore;
  }

  /**
   * Renvoie un Observable sur la base d'une Liste
   * @param id id de la Liste
   */
  private getListeBaseDataSource(id: string): Observable<LivreBaseModel> {
    return this.afStore
      .doc<LivreBaseModel>('elistes/' + id)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data();
          return { id, ...data } as LivreBaseModel;
        })
      );
  }

  /**
   * Renvoie un Observable sur une Liste Complet (base + details)
   * @param id id de la Liste
   */
  public getListeCompleteDataSource(id: string): Observable<LivreCompletModel> {
    // on commence par récupérer la base
    const baseObservable: Observable<LivreBaseModel> = this.getListeBaseDataSource(
      id
    );
    return baseObservable.pipe(
      concatMap((base) => {
        if (base) {
          // on combine les observables en un seul pour être synchro avec tous les changements
          return combineLatest([baseObservable]).pipe(
            map(([dataBase]: [LivreBaseModel]) => {
              // https://dev.to/napoleon039/how-to-use-the-spread-and-rest-operator-4jbb
              return {
                ...dataBase,
              } as LivreCompletModel;
            })
          );
        } else {
          // sinon on balance une erreur
          return throwError(
            'Un problème est survenu lors du chargement complet'
          );
        }
      })
    );
  }

  /**
   * Charge et renvoie un Livre Complet ou un shell model si en chargement
   * @param dataSource Observable sur un Livre Complet
   */
  public getListeCompleteDataStore(
    dataSource: Observable<LivreCompletModel>
  ): DataStore<LivreCompletModel> {
    // on initialise le shell model
    const shellModel: LivreCompletModel = new LivreCompletModel();
    // on remplit notre store avec le shell model
    this.livreCompletDataStore = new DataStore(shellModel);
    // on lance le chargement la dataSource
    this.livreCompletDataStore.load(dataSource);

    // dans tous les cas, on renvoie le store
    return this.livreCompletDataStore;
  }
}
