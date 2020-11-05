import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class ListesService {

  private listes: Map<string, any[]> = new Map<string, any[]>();
  private charge = new BehaviorSubject<boolean>(null);

  constructor(private afs: AngularFirestore) { }

  public charger() {
    if (!this.charge.value) {
      const listingCollection = this.afs.collection<any>('listes').get();
      listingCollection.subscribe(listesFirebase => {
        listesFirebase.forEach(listeFirebase => {
          if (listeFirebase) {
            const listeData = listeFirebase.data();
            this.listes.set(listeData.code, listeData.valeurs);
          }
        });
        this.charge.next(true);
      });
      return listingCollection;
    }
    return null;
  }

  public getListes() {
    return this.listes;
  }

  public getListe(code: string) {
    return this.listes.get(code);
  }
}
