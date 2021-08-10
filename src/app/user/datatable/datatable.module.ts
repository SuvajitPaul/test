import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatableRoutingModule } from './datatable-routing.module';
import { DatatableComponent } from './datatable/datatable.component';
import { UserModule } from '../user.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { CrudserviceService } from 'src/app/serivce/crudservice.service';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    NgxDatatableModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DatatableRoutingModule
  ],
  providers:[CrudserviceService]
})
export class DatatableModule { }
