import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CrudserviceService } from 'src/app/serivce/crudservice.service';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  rows: any;
  expanded = {};
  timeout: any;
  details: any;
  ColumnMode = ColumnMode;
  SortType = SortType;
  loadingIndicator = true;
  reorderable = true;
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'age' }
  ];
  constructor(public service:CrudserviceService) {
    // this.fetch((data:any) => {
    //   this.rows = data;
    //   setTimeout(() => {
    //     console.log('pag');
    //     this.loadingIndicator = false;
    //     console.log('pag1');
    //   }, 50000);
    // });
    this.record();

  }

  ngOnInit(): void {
  }


  record(){
    this.service.View().subscribe((res) => {
      //console.log('kkk',res);
      //this.student = [];
      // this.a = res.forEach((item: any) => {
      //   console.log(item);
      this.rows = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      

      })
    })

  }


  onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  // fetch(cb: any) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/100k.json`);

  //   req.onload = () => {
  //     const rows = JSON.parse(req.response);

  //     for (const row of rows) {
  //       row.height = Math.floor(Math.random() * 80) + 50;
  //     }

  //     cb(rows);
  //   };

  //   req.send();
  // }

  // getRowHeight(row: any) {
  //   return row.height;
  // }




// constructor() {
//   this.details = this.fetch((data: any) => {
//     this.rows = data;
//     setTimeout(() => {
//       this.loadingIndicator = false;
//       console.log('loadingIndicator');
//     }, 5000);
//   });

//   console.log('details', this.details);
// }

}