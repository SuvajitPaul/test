import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    return this.fireservice.collection('message').add(data);
  }
  View(){
    return this.fireservice.collection('message').snapshotChanges();
  }
  Delete(id:any)
  {
    this.fireservice.doc('message/'+id).delete();
  }
  uploadFile(data:any){
    return this.fireservice.collection('files').add(data);
  }
}
