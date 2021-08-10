import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ChatService } from 'src/app/serivce/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  data:any;
  data1:any;
  userid:any;
  username:any;
  username1:any;
  name:any;
  formdata:FormGroup;
  message="Enter text";
  msg:any;
 
  
  constructor(private formBuilder: FormBuilder,private mesgapi:ChatService) { 
    this.data=this.getdata();
    
    console.log('cren',this.data);
    this.formdata = this.formBuilder.group({
      message:['',Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(200)])]
    });
  }

  ngOnInit(): void {
    this.Viewdata();
  }
  getdata(){
    this.data1 = localStorage.getItem('authData');
    this.userid = JSON.parse(this.data1);
    this.username=this.userid.role;
    if(!this.username){ 
      this.username=this.userid.FirstName;  
      this.username1=this.userid.LastName;
      // this.name=this.username. concat(this.username1);
      return  this.username; 
    }else{
      return this.username;
    }
    
      
    
  }
  user:any;
  msgdata(){
    
    console.log(this.formdata.value.message);
    
    let record:any={};
    record['message']= this.formdata.value.message;
    //console.log('sdsad',this.data);
    record['user']=this.data;
  

    //console.log(record['fName']);
    this.mesgapi.Insert(record).then((res) => {
      console.log('data', res);
      record='';
     
      //console.log('data',res);

    }).catch((err) => {
      console.log(err);
    })

    //this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    
    this.formdata.reset();
    
  

  }
 
  msg1:any;
  
  Viewdata() {
    this.mesgapi.View().subscribe((res) => {
      //console.log('kkk',res);
      //this.student = [];
      // this.a = res.forEach((item: any) => {
      //   console.log(item);
      this.msg = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      

      })
      // this.msg=JSON.stringify(this.msg);
      // this.msg1=JSON.parse(this.msg);
      
      console.log('kk', this.msg);

      //this.student.push(this.a as Student);

      // this.b = JSON.stringify(this.a);
      // this.c = JSON.parse(this.b);
      // console.log(this.c);
      // this.student.push(this.c as Student);
    })
  }
  delete(id:any){
    let txt;
    let r = confirm("Are you want to delete");
    if (r == true) {
      this.mesgapi.Delete(id);
    } else {
      return;
    }
    
  }

editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '100',
  minHeight: '100',
  maxHeight: '100',
  width: 'auto',
  minWidth: '500',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
    // uploadUrl: 'v1/image',
    // //upload: (file: File),
    // uploadWithCredentials:boolean= false
    // sanitize:boolean= true
    // toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
}
}



