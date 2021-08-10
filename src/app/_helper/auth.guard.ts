import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data: any;
  login: any;
  islogin: any;
  value: any;
  googleLogin: any;
  constructor(private router: Router) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let link: any = (state.url == "/user/home" || state.url == "/user" || state.url == "/user/dashboard" || state.url == "/user/about" || state.url == "/user/gallery" || state.url == "/user/contactus" || state.url == "/user/froala" || state.url == "/user/chat" || state.url == "/user/datatable" || state.url == "/user/profile");

    if (link) {
      // this.data = localStorage.getItem('authData');
      // this.login = JSON.parse(this.data);
      this.islogin = this.authroute();
      // this.googleLogin = localStorage.getItem('authData');
      // this.loginhis.i=JSON.parse(this.googleLogin);
      if (this.islogin.isLogin == '1') {
        console.log("Success");

        return true;
      }
      else {

        this.router.navigateByUrl('/');
        return false;

      }
    }








    return true;

  }

  authroute(): any {
    this.data = localStorage.getItem('authData');
    if (this.data) {
      this.login = JSON.parse(this.data);
      return this.login;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }

    // this.login = JSON.parse(this.data);
    // console.log('oooo', this.login);
    // this.islogin = this.login.isLogin;
    // console.log(this.islogin);

  }
}
