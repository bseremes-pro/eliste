import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Utilisateur } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  utilisateur$: Observable<Utilisateur>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.utilisateur$ = this.afAuth.authState.pipe(
      switchMap((utilisateur) => {
        // Logged in
        if (utilisateur) {
          return this.afStore
            .doc<Utilisateur>(`utilisateurs/${utilisateur.uid}`)
            .valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  private mettreAJourUtilisateur(utilisateur) {
    // Sets utilisateur data to firestore on login
    const utilisateurRef = this.afStore.doc(`utilisateurs/${utilisateur.uid}`);

    const data = {
      uid: utilisateur.uid,
      email: utilisateur.email,
      nomUsage: utilisateur.displayName,
      photoURL: utilisateur.photoURL,
    };

    return utilisateurRef.set(data, { merge: true });
  }

  async sInscrire(identifiants) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      identifiants.email,
      identifiants.password
    );
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async sInscrireAvecGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async sInscrireAvecFacebook() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async sInscrireAvecTwitter() {
    const provider = new auth.TwitterAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async seConnecter(identifiants) {
    const credential = await this.afAuth.signInWithEmailAndPassword(
      identifiants.email,
      identifiants.password
    );
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async seConnecterAvecGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async seConnecterAvecFacebook() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async seConnecterAvecTwitter() {
    const provider = new auth.TwitterAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['app']);
    return this.mettreAJourUtilisateur(credential.user);
  }

  async seDeconnecter() {
    await this.afAuth.signOut();
    this.router.navigate(['auth/connexion']);
  }
}
