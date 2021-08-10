import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { LayoutItemDirective } from 'src/app/directives/layout-item.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LayoutItemDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
      
    
    
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
