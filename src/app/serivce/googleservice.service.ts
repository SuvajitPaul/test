import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleserviceService {
  authData:any={
    role_id:3,
    isLogin:"1",
    
  };
  user:any;
  constructor(private fireauth:AngularFireAuth,private router: Router) {
    this.fireauth.authState.subscribe((res)=>{
      this.user=res;
      console.log('asasasas',this.user.displayName);
      this.authData.role=this.user.displayName;
    })
   }
  googleLogin()
  {
      this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res)=>{
       console.log('Login Succesfull');
       localStorage.setItem('authData',JSON.stringify(this.authData));
       this.router.navigateByUrl('/user/home');

     }).catch((err)=>{
       console.log(err);
     });
  }
}
