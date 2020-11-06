import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../../components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ListeModule } from '../../../../pipes/liste.module';

import { ListesResolver } from '../../../../resolvers/listes.resolver';

import { LivreDetailsPage } from './liste-details.page';
import { LivresService } from '../../listes.service';
import { LivreDetailsResolver } from './liste-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: LivreDetailsPage,
    resolve: {
      data: LivreDetailsResolver,
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
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    ListeModule,
  ],
  declarations: [LivreDetailsPage],
  providers: [LivresService, LivreDetailsResolver, ListesResolver],
})
export class LivreDetailsModule {}
