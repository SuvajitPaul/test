import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  role:any;
  role_id:any;
  val:any;
  ngOnInit(): void {
    console.log('Hello');
    this.val=localStorage.getItem('authData');
    this.role_id=JSON.parse(this.val);
    // this.role_id=this.val.map((n:any)=>{
    //      const obj={n};
    //      return obj;
    // });
   console.log('data',this.role_id.role_id);
    
    // this.router.navigateByUrl('/user/home');
  }
  isShown = false;
  navbar()
  {
    this.isShown = !this.isShown;
  }
  
  data:any;
  login:any={};
  
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
    // this.data=localStorage.getItem('authData');
    // this.login = JSON.parse(this.data);
    //  console.log('oooo', this.login);
    //    this.login.isLogin='0';
    //   this.login.role_id='0';
    //  console.log(this.login);
    // localStorage.setItem('authData',JSON.stringify(this.login));
    //this.router.navigateByUrl('/')
  }
}
