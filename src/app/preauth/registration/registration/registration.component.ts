import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/serivce/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { RegserviceService } from 'src/app/serivce/regservice.service';
//import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;
  uploadProgress: any;
  downloadURL: any;
  uploadState: any;
  //downloadURL: Observable<string>;
  inputFile: any=null;
  isRegisterFormValid: boolean = false;
  
  RegisterForm: FormGroup;
  localUrl: any = [];
  genderArray: any = [
    { "id": 1, "Gender": "Male" },
    { "id": 2, "Gender": "Female" },
    { "id": 3, "Gender": "Others" }
  ];
  role:any=[
    { "id": 1, "Role": "Admin" },
    { "id": 2, "Role": "Manager" },
    { "id": 3, "Role": "User" }
  ]




  public gender = [];


  FirstName: String = '';
  LastName: String = '';
  UserName: String = '';
  Phonenumber: any = '';
  dob: any = '';
  email: any = '';
  password: any = '';
  confirmPassword: any = '';
  id: number = 0;
  acceptTerms: any = '';
  minDate = new Date(1995, 1, 1);
  maxDate = new Date();
  


  //private dialogRef: MatDialogRef<RegistrationComponent>
  constructor(private formBuilder: FormBuilder, private service: RegserviceService, private afStorage: AngularFireStorage) {

    // this.RegisterForm = this.formBuilder.group({

    //   LastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    //   inputFile:['',Validators.required],


    // })



    this.RegisterForm = this.formBuilder.group({
      FirstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      LastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      UserName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      Phonenumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      role_id:['',Validators.required],

      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      acceptTerms: [false, Validators.requiredTrue],
      inputFile:['',Validators.required]


    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });
    // this.roleservice.getemployee().subscribe(data =>{
    console.log('RegisterForm', this.RegisterForm);

  }

  ngOnInit(): void {
  }
  

  progressfile:boolean=false;
  upload(event: any): any {
    this.inputFile = event.target.files;
    //check file is valid
    //   if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = (event: any) => {
    //         this.localUrl = event.target.result;
    //     }
    //     reader.readAsDataURL(event.target.files[0]);
    // }

    if (!this.validateFile(this.inputFile[0].name)) {
      this.delete();
      alert('Please upload pdf or png');

      console.log('Selected file format is not supported');
      return false;
    }
    //  else {
    //   //this.file(this.inputFile);
    //   this.progressfile=true;
    //   console.log('file');
      
    //   const id = Math.random().toString(36).substring(2);
    //   let ref: AngularFireStorageReference = this.afStorage.ref(id);
    //   let task: AngularFireUploadTask = ref.put(event.target.files[0]);
    //   //this.uploadState = task.snapshotChanges();
    //   this.uploadProgress = task.percentageChanges();
    //   //this.downloadURL = ref.getDownloadURL();
    //   //  this.downloadURL = concat(
    //   //   task.snapshotChanges().pipe(filter(() => false)),
    //   //   defer(() => this.ref.getDownloadURL()),
    //   // );
    // }


  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'png') {
      return true;
    }
    else {
      return false;
    }
  }
  delete() {
    console.log('file', this.inputFile);
    this.RegisterForm.controls.inputFile.reset();
    console.log('file', this.inputFile);
    //console.log('file',this.inputFile);
  }
  // down:any;
  // async downloadurl(ref:any){
  //   console.log('ref',ref);
  //   return this.down = await ref.getDownloadURL().toPromise();
  // }

  deleteImg() {
    this.inputFile = '';
  }
  reset() {
    this.RegisterForm.reset();
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


  record: any;
  value() {
    
    if (this.RegisterForm.valid) {
      this.file(this.inputFile);

      console.log('inside if');
      this.isRegisterFormValid = false;
      this.record = this.RegisterForm.getRawValue();
      console.log(this.record);
      

      let record:any={};
    record['FirstName']= this.RegisterForm.value.FirstName;
    record['LastName']= this.RegisterForm.value.LastName;
    record['UserName']= this.RegisterForm.value.UserName;
    record['Phonenumber']= this.RegisterForm.value.Phonenumber;
    record['email']= this.RegisterForm.value.email;
    record['dob']= this.RegisterForm.value.dob;
    record['gender']= this.RegisterForm.value.gender;
    record['role_id']= this.RegisterForm.value.role_id;
    record['password']= this.RegisterForm.value.password;
    record['acceptTerms']= this.RegisterForm.value.acceptTerms;
    //record['message']= this.RegisterForm.value.FirstName;
    //console.log('sdsad',this.data);
   

    //console.log(record['fName']);
    this.service.Insert(record).then((res) => {
      console.log('data', res);
      record='';
     
      //console.log('data',res);

    }).catch((err) => {
      console.log(err);
    })
      
     
    } else {
      console.log('inside else');
      this.isRegisterFormValid = true;
      return;
    }
    // console.log('formData ' + this.RegisterForm.invalid, this.RegisterForm.controls);

    // console.log(this.RegisterForm.getRawValue());
  }

  file(inputfile:any){
    this.progressfile=true;
    const id = Math.random().toString(36).substring(2);
      let ref: AngularFireStorageReference = this.afStorage.ref(id);
      let task: AngularFireUploadTask = ref.put(inputfile);
      
      this.uploadProgress = task.percentageChanges();
  }
  // closeMe() {
  //   this.dialogRef.close();
  // }
}

