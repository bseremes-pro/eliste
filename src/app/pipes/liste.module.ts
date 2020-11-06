import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from './../../environments/environment';

import { ListesService } from './../services/listes.service';
import { ListePipe } from './liste.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    declarations: [
        ListePipe
    ],
    exports: [
        ListePipe
    ],
    providers: [
        ListesService
    ]
})
export class ListeModule { }
