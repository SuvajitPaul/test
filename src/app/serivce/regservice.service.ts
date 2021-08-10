import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegserviceService {

  constructor(public fireservice:AngularFirestore) {}
    Insert(data:any){
      return this.fireservice.collection('regdata').add(data);
    }
    View(){
      return this.fireservice.collection('regdata').snapshotChanges();
    }
    Update(id:any,data:any){
      this.fireservice.doc('regdata/'+id).update(data);
   }
   }

