import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helper/auth.guard';
import { LoginGuard } from './_helper/login.guard';


const routes: Routes = [
  {
    path:'user',
    canActivate:[AuthGuard],
    loadChildren: () => import('./user/user.module').then(m=>m.UserModule),
    
    
  },
  {
    path:'',
    canActivate:[LoginGuard],
    loadChildren: () => import('./preauth/preauth.module').then(m=>m.PreauthModule),
    
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
