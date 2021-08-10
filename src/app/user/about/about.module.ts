
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { UserModule } from '../user.module';


@NgModule({
  declarations: [
    AboutComponent
   
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    UserModule
  ]
})
export class AboutModule { }
