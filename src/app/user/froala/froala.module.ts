import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FroalaRoutingModule } from './froala-routing.module';
import { FroalaComponent } from './froala/froala.component';
import { UserModule } from '../user.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FroalaComponent
  ],
  imports: [
    CommonModule,
    FroalaRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    UserModule
  ]
})
export class FroalaModule { }
