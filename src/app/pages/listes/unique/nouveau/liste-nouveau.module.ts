import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../../components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ListeModule } from '../../../../pipes/liste.module';

import { ListesResolver } from '../../../../resolvers/listes.resolver';

import { LivreNouveauPage } from './liste-nouveau.page';
import { LivresService } from '../../listes.service';
import { LivreNouveauResolver } from './liste-nouveau.resolver';

const routes: Routes = [
  {
    path: '',
    component: LivreNouveauPage,
    resolve: {
      data: LivreNouveauResolver,
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
  declarations: [LivreNouveauPage],
  providers: [LivresService, LivreNouveauResolver, ListesResolver],
})
export class LivreNouveauModule {}
