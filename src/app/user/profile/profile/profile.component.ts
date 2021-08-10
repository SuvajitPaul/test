import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegserviceService } from 'src/app/serivce/regservice.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  details: any = {};
  edit: boolean = false;
  isRegisterFormValid: boolean = false;
  pass: boolean = false;
  updateWithId: string = '';
  public profileupdateForm: FormGroup;
  doB: any;
  constructor(public fb: FormBuilder, private service: RegserviceService, private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) {
    this.profileupdateForm = this.fb.group({
      id: ['', Validators.required],

      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      Phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      oldpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });
  }

  ngOnInit(): void {
    this.profiledetails();
    console.log(this.details);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
    // this.doB =this.parseDate(this.details.dob);
    // console.log('date',this.doB);

  }
  Updaterecord(item: any) {
    this.edit = true;

    this.updateWithId = item.id;

    this.profileupdateForm.patchValue({
      id: item.id,

      Phonenumber: item.Phonenumber,
      email: item.email,
    })

  }

  update() {
    console.log('outside');
    if (this.profileupdateForm.valid) {
      console.log('inside');
      this.profileupdateForm.value["id"] = this.updateWithId;

      console.log(this.profileupdateForm.value);
      this.service.Update(this.updateWithId, this.profileupdateForm.value);


      this.details['email'] = this.profileupdateForm.value.email;
      this.details['Phonenumber'] = this.profileupdateForm.value.Phonenumber;






      this.edit = false;

    }
    else {
      alert('fill data properly');
    }
  }

  cancel() {
    this.edit = false;
  }



  // parseDate(date:any) {
  //   const parseDate = date.split('-');
  //   const parseTime = parseDate[2].split(' ');
  //   const parsedDate = `${parseTime[0]}/${parseDate[1]}/${parseDate[0]} ${parseTime[1]}`

  //   return parsedDate
  // }


  chnpassword() {
    this.pass = true;
  }
  resetpassword() {
    this.pass = false;
  }


  passwordupdate() {


    if (this.profileupdateForm.valid) {
      this.spinner.show();
      this.isRegisterFormValid = false;
      this.profiledetails();
      let oldPassword = this.details.password;
      let typeoldpassword = this.profileupdateForm.value.oldpassword;
      if (oldPassword === typeoldpassword) {

        let record: any = {};
        record['password'] = this.profileupdateForm.value.password;

        this.service.Update(this.updateWithId, record);

        this.details['password'] = this.profileupdateForm.value.password;

        setTimeout(() => {
          
          this.spinner.hide();


          

          this.toaster.success('password updated', 'success');
            
         
          this.profileupdateForm.reset();
        localStorage.removeItem("authData");
        this.router.navigateByUrl('/');


        }, 2000);
        

      }

    } else {


      console.log('inside else');
      this.isRegisterFormValid = true;
      return;
    }

  }

}
