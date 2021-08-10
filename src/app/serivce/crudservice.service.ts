import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import {Student} from '../../shared/student';
@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  studentsRef:any;
  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    return this.fireservice.collection('task2').add(data);
  }
  View(){
    return this.fireservice.collection('task2').snapshotChanges();
  }
  // GetStudentsList() {
  //   this.studentsRef = this.fireservice.collection('task2');
  //   return this.studentsRef;
  // }  
  Delete(id:any)
  {
    this.fireservice.doc('task2/'+id).delete();
  }
  Update(id:any,data:any){
     this.fireservice.doc('task2/'+id).update(data);
  }
}
