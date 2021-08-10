import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-froala',
  templateUrl: './froala.component.html',
  styleUrls: ['./froala.component.css']
})
export class FroalaComponent implements OnInit {
  formdata:FormGroup;
  data:number=0;
  placeholder:any="Please Enter";
  editorContent:any="";
  
  constructor(public fb: FormBuilder) { 
    this.formdata = this.fb.group({
      description:['',Validators.required]
    });
  }

  ngOnInit(): void {
     this.data;
  }
  submitData(){
    if(this.data){
      this.data=0;
    }else{
      this.data=1;
      
    }
  }
}
