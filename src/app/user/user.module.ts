import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { WildcardComponent } from './wildcard/wildcard.component';




@NgModule({
  declarations: [
    
    UserComponent,
    WildcardComponent
   
  ],
  imports: [
    CommonModule,
    
    UserRoutingModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
