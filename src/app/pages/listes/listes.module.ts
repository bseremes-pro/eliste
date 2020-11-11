import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ComponentsModule } from '../../components/components.module';
import { environment } from '../../../environments/environment';
import { FirebaseCreateUserModal } from './pops/champs/liste-champs.modal';

const firebaseRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./liste/listes-liste.module').then(
            (m) => m.LivresBoutiqueListeModule
          ),
      },
      {
        path: 'nouveau',
        loadChildren: () =>
          import('./unique/nouveau/liste-nouveau.module').then(
            (m) => m.LivreNouveauModule
          ),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./unique/details/liste-details.module').then(
            (m) => m.LivreDetailsModule
          ),
      },
      {
        path: 'edition/:id',
        loadChildren: () =>
          import('./unique/edition/liste-edition.module').then(
            (m) => m.LivreEditionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(firebaseRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  declarations: [FirebaseCreateUserModal],
})
export class LivresModule {}
