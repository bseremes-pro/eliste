import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgMathPipesModule } from 'angular-pipes';
import { NgFloorPipeModule } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  imports: [CommonModule, IonicModule, NgMathPipesModule],
  declarations: [TimeDifferencePipe, TimeAgoPipe, CapitalizePipe],
  exports: [NgFloorPipeModule, TimeDifferencePipe, TimeAgoPipe, CapitalizePipe],
  entryComponents: [],
})
export class PipesModule {}
