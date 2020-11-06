import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../../components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ListeModule } from '../../../../pipes/liste.module';

import { ListesResolver } from '../../../../resolvers/listes.resolver';

import { LivreEditionPage } from './liste-edition.page';
import { LivresService } from '../../listes.service';
import { LivreEditionResolver } from './liste-edition.resolver';

const routes: Routes = [
  {
    path: '',
    component: LivreEditionPage,
    resolve: {
      data: LivreEditionResolver,
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
  declarations: [LivreEditionPage],
  providers: [LivresService, LivreEditionResolver, ListesResolver],
})
export class LivreEditionModule {}
