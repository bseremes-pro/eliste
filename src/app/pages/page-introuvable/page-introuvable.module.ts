import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { PageIntrouvable } from './page-introuvable.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageIntrouvable
      }
    ])
  ],
  declarations: [PageIntrouvable]
})
export class PageIntrouvableModule { }
