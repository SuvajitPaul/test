
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudserviceService } from '../../../serivce/crudservice.service';
import { Student } from '../../../../shared/student';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public studentForm: FormGroup;
  public studentupdateForm: FormGroup;
  firstName: any;
  lastName: any;
  email: any;
  mobileNumber: any;
  touched: boolean = false;
  showmsg: boolean = true;
  p: number = 1;
  total: number = 8;
  student: any;
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;


  editform:boolean=false;
  constructor(public fb: FormBuilder, public crudapi: CrudserviceService) {

    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.studentupdateForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  ngOnInit(): void {
    this.Viewdata();
  }

  // studenForm() {
  //   this.studentForm = this.fb.group({
  //     firstName: ['', [Validators.required, Validators.minLength(2)]],
  //     lastName: [''],
  //     email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  //     mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  //   })  
  // }
  title = 'Portfolio';
  isShown = false;
  navbar() {
    this.isShown = !this.isShown;
  }
  ResetForm() {
    this.studentForm.reset();
  }

  submitStudentData() {
    if(!this.editform){
      this.showmsg = false;
    console.log(this.studentForm.value.firstName);
    let record: any = {};
    record['firstName'] = this.studentForm.value.firstName;
    record['lastName'] = this.studentForm.value.lastName;
    record['email'] = this.studentForm.value.email;
    record['mobileNumber'] = this.studentForm.value.mobileNumber;

    //console.log(record['fName']);
    this.crudapi.Insert(record).then((res) => {
      console.log('data', res);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.mobileNumber = '';
      //console.log('data',res);

    }).catch((err) => {
      console.log(err);
    })

    //this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
    }

    
  };



  Viewdata() {
    this.crudapi.View().subscribe((res) => {
      //console.log('kkk',res);
      //this.student = [];
      // this.a = res.forEach((item: any) => {
      //   console.log(item);
      this.student = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;

      })
      console.log('kk', this.student);
      //this.student.push(this.a as Student);

      // this.b = JSON.stringify(this.a);
      // this.c = JSON.parse(this.b);
      // console.log(this.c);
      // this.student.push(this.c as Student);
    })




  }


  //  let s = this.crudapi.GetStudentsList(); 
  //   s.snapshotChanges().subscribe((data:any) => {
  //     this.student = [];
  //     data.forEach((item:any) => {
  //       let a:any = JSON.stringify(item.payload.doc.data()); 
  //       //this.a.fname = item.fName;
  //       this.student.push(this.a as Student);
  //       console.log('data',this.student);
  //     });
  //   });

  handlePageChange(event: any) {
    this.p = event;
  }

  Deleterecord(id: any, i: any) {
    console.log(i);
    if (i) {
      this.showmsg = true;

      this.crudapi.Delete(id);
    } else {
      this.crudapi.Delete(id);
    }
  }

  // update:any;
  // Updaterecord(id:any)
  // {
  //   let up=this.crudapi.Update(id);
  //   //up.snapshotChanges().subscribe(()
  // }
  showData: boolean = false;
  showdata() {
    this.showData = true;

  }
  collapse() {
    this.showData = false;
  }

  edit: boolean = false;
  addstudent: boolean = true;
  updateWithId: any;
  Updaterecord(record: any) {
    this.edit = true;
    this.addstudent = false;
    this.showData = false;
    console.log('record', record);
    //this.studentupdateForm.controls.firstName=record.fName;
    // this.studentupdate.editfname=record.fName;
    // console.log('studentupdateForm',this.studentupdate.editfname);
    // this.studentupdate.editlname=record.lastName;
    // this.studentupdate.editmail=record.email;
    // this.studentupdate.editmob=record.mobileNumber;
    // console.log('rec',this.studentupdate);

    this.updateWithId = record.id;

    this.studentupdateForm.patchValue({
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      mobileNumber: record.mobileNumber,
      email: record.email,
    })

  }

  update() {
    console.log('outside');
    if (this.studentupdateForm.valid) {
      console.log('inside');
      this.studentupdateForm.value["id"] = this.updateWithId;
      //console.log( this.updateData.value);
      console.log(this.studentupdateForm.value);
      this.crudapi.Update(this.updateWithId, this.studentupdateForm.value);

      // this.studentupdateForm.reset();
      // this.addstudent = true;

      this.edit = false;
      this.showData=true;
      this.addstudent = true;
    }
    else {
      alert('fill data properly');
    }
  }


  cancel() {
    this.edit = false;
    this.showData=true;
    this.addstudent = true;
  }


}