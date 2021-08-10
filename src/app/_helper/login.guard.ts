import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  value: any;
  data: any;
  login:any;
  islogin:any;
 
  constructor(private router: Router) { }
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let link1: any = (state.url == "/");

    if (link1) {
      this.value = this.authroute();
      
      if (this.value==null) {
        console.log("Success");

        return true;
      }
      else {

        this.router.navigateByUrl('/user/home');
        // return false;

      }
    }


    return true;
  }
  authroute(): any {
    this.data = localStorage.getItem('authData');
    // this.login = JSON.parse(this.data);
    //  console.log('oooo', this.login);
    //  this.islogin = this.login.isLogin;
    //  console.log(this.islogin);
    return this.data;
  }

}
