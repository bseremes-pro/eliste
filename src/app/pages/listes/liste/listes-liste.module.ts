import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ListeModule } from '../../../pipes/liste.module';

import { ListesResolver } from '../../../resolvers/listes.resolver';

import { LivresListePage } from './listes-liste.page';
import { LivresService } from '../listes.service';
import { LivresListePageResolver } from './listes-liste.resolver';

const routes: Routes = [
  {
    path: '',
    component: LivresListePage,
    resolve: {
      data: LivresListePageResolver,
      liste: ListesResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    PipesModule,
    ListeModule,
  ],
  declarations: [LivresListePage],
  providers: [LivresService, LivresListePageResolver, ListesResolver],
})
export class LivresBoutiqueListeModule {}
