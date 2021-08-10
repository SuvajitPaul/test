import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import{LayoutService} from '../../../serivce/layout.service';
// import {IComponent} from '../icomponent';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  // options: GridsterConfig = {
  //   draggable: {
  //     enabled: true
  //   },
  //   pushItems: true,
  //   resizable: {
  //     enabled: true
  //   }
  // };
  // layout: GridsterItem[] = [];
  get options(): GridsterConfig {
    return this.layoutService.options;
  }
  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }
  // get components(): IComponent[] {
  //   return this.layoutService.components;
  // }
  constructor(private layoutService: LayoutService) { }
  

   

  ngOnInit(): void {
    
  }
  addItem(){
    this.layoutService.addItem();
  }
  deleteItem(item:any){
    this.layoutService.deleteItem(item);
  }
  // dropItem(id:any){
  //   this.layoutService.dropItem(id);
  // }
  // setDropId(id:any){
  //   this.layoutService.setDropId(id);
  // }
  // getComponentRef(item:any){
  //   this.layoutService.getComponentRef(item);
  // }
  
}
