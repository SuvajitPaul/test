import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { UserModule } from '../user.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { ChatService } from 'src/app/serivce/chat.service';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ChatRoutingModule
  ],
  providers:[ChatService]
})
export class ChatModule { }
