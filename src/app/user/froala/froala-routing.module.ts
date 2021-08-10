import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FroalaComponent } from './froala/froala.component';

const routes: Routes = [
  {
    path:'',
    component:FroalaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FroalaRoutingModule { }
