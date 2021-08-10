import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleserviceService } from 'src/app/serivce/googleservice.service';
import { RegserviceService } from 'src/app/serivce/regservice.service';

import { RegistrationComponent } from 'src/app/preauth/registration/registration/registration.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Loginform: FormGroup;
  public id = [];
  public id1 = [];
  userName: any;
  passWord: any;
  userInformationname: any;
  password: any;
  public errorMsg: any;
  selectedCountry: any = {
    country: '0',
    state: '0'
  }
  loading = false;
  selectedCity: any = 0;
  selectedState: any = 0;
  modalRef!: MdbModalRef<RegistrationComponent>;
  title:string='Register';
  private _url: string = '/assets/role.json';
  private _url1: string = '/assets/country.json';
  private _url2: string = '/assets/state.json';
  private _url3: string = '/assets/city.json';
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private googleservice: GoogleserviceService, private regservice: RegserviceService,private modalService: MdbModalService,public dialog: MatDialog, private toaster: ToastrService) {

    this.Loginform = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    });

  }
  

  openModal() {
    //const dialogRef = this.dialog.open(RegistrationComponent);
    this.modalRef = this.modalService.open(RegistrationComponent, { data: { title: 'Custom title' }
    });
    
  }
  
  // getdetails(res:any){
  //   //this.getemployee();
  //  //let details:any = this.getemployee();
  //  //const detail = details.json();
  //  console.log('details',res);
  // }







  ngOnInit(): void {

    this.loadCountry();

    //this.getemployee();

  }
  country: any;
  loadCountry() {
    // this.apiService.getcountry().subscribe((res)=>{
    //   this.country = res;
    //   console.log('Country',this.country);
    // })    
    this.http.get(this._url1).subscribe((res) => {
      this.country = res;
      console.log('Country', this.country);
    })
  }

  state: any = [];
  loadState() {
    console.log('country', this.country);
    this.http.get(this._url2).subscribe((res) => {
      let stateArry: any = res;
      this.state = [];


      // for (let index = 0; index < stateArry.length; index++) {
      //   if(stateArry[index].country_id == this.selectedCountry.country ){
      //     this.state.push(stateArry[index])
      //   }
      // }

      // stateArry.forEach((e:any,i:number) => {
      //   if(e.country_id == this.selectedCountry.country){
      //     this.state.push(e)
      //   }
      // });

      this.state = stateArry.filter((e: any) => (e.country_id == this.selectedCountry.country));





      // if(filterStateArry.length > 0){
      //   this.state = filterStateArry
      // }

      console.log(this.state);
    })
  }

  city: any = [];
  loadcity() {
    this.http.get(this._url3).subscribe((res) => {
      let cityArry: any = res;
      this.city = [];
      this.city = cityArry.filter((e: any) => e.state_id == this.selectedState);
      console.log('city', this.city);
    })
  }

  getstateId() {
    console.log('selectedState', this.selectedState);

    //console.log('hi',this.selectedState);
    this.loadcity();
  }

  getcountryId(event: any) {
    console.log('selectedCountry', this.selectedCountry.country);
    this.loadState();
  }




  //   this.router.navigateByUrl('/user');

  // Submit() {
  //   this._userService.getemployee().subscribe((data: any) => {
  //     console.log(data[0]);
  //     this.userInformationid = data[0].UserId;
  //     this.password = data[0].Password;
  //     this.userName = this.RegisterForm.getRawValue().username;
  //     this.passWord = this.RegisterForm.getRawValue().password;

  //     console.log(this.userInformationid," ",this.userName);
  //     console.log(this.password ," ", this.passWord);
  //     if (this.userInformationid === this.userName && this.password === this.passWord) {
  //       sessionStorage.setItem('isLogin','1');
  //       localStorage.setItem('role_id',data[0].role_id)
  //       this.router.navigateByUrl('/listing');
  //     }
  //     else {
  //       localStorage.clear();
  //     }

  //   })


  // }
  //  data() {
  //   return this.http.get(this._url).subscribe((res) => {
  //     //return res;
  //     });
  //   }

  details: any;

  //  data(){
  //    return this.http.get(this._url).subscribe((res)=>{


  //    });
  //    //this.detail=this.details.json();
  //    //console.log(this.details);    
  //  }

  data: any;
  mydata() {
    this.loading = true;

    this.http.get(this._url).subscribe((res: any) => {
      // console.log(res);

      this.userName = this.Loginform.getRawValue().username;
      this.passWord = this.Loginform.getRawValue().password;

      let user = res.find((item: any) => item.Username === this.userName && item.Password === this.passWord);

      //console.log(user);

      if (user) {
        this.loading = false;
        this.toaster.success('Login', 'success');
        //user.isLogin=1;
        localStorage.setItem('authData', JSON.stringify(user));

        //let val1 = JSON.parse(this.val);
        // let val1=JSON.parse(this.data);
        // console.log(val1.role)
        //console.log('data',JSON.parse(isLogin.role_id));
        this.router.navigateByUrl('/user/home');
      }
      else {
        this.regdata();
        // this.loading = false;
        // console.log('credential incorrect');

      }




    })



  }

  googlelogin() {
    this.googleservice.googleLogin();
  }




  reg: any;
  regdata() {
    //this.userName = this.Loginform.getRawValue().username;
    //this.passWord = this.Loginform.getRawValue().password;
    this.regservice.View().subscribe((res) => {
      this.reg = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;


      })
      console.log(this.reg);
      let user = this.reg.find((item: any) => item.UserName === this.userName && item.password === this.passWord);
      console.log('find');
      if (user) {
        this.loading = false;
        user.isLogin=1;
        this.toaster.success('Login', 'success');
        console.log('credential correct');
        localStorage.setItem('authData', JSON.stringify(user));
        this.router.navigateByUrl('/user/home');
      }
      else {
        this.loading = false;
        this.toaster.error('credential incorrect', 'error');
        console.log('credential incorrect');

      }

    })

  }


}

