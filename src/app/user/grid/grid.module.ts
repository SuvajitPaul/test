import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid/grid.component';
import { UserModule } from '../user.module';
import { GridsterModule } from 'angular-gridster2';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

@NgModule({
  declarations: [
    GridComponent,
    Example1Component,
    Example2Component
  ],
  imports: [
    CommonModule,
    UserModule,
    GridsterModule,
    GridRoutingModule
  ],
  entryComponents: [
    Example1Component,
    Example2Component
  ]
})
export class GridModule { }
