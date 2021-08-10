
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { WildcardComponent } from './wildcard/wildcard.component';

const routes: Routes = [

  // {
  //   path:'',
  //   component:UserComponent

  // },
  // {
  //   path:'',
  //   loadChildren: () => import('./home/home.module').then(m=>m.HomeModule),
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },

  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule),
  },
  {
    path: 'froala',
    loadChildren: () => import('./froala/froala.module').then(m=>m.FroalaModule),
  },
  {
    path: 'grid',
    loadChildren: () => import('./grid/grid.module').then(m=>m.GridModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m=>m.ChatModule),
  },
  {
    path: 'datatable',
    loadChildren: () => import('./datatable/datatable.module').then(m=>m.DatatableModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m=>m.ProfileModule)
  }
  // {
  //   path:"**",
  //   component:WildcardComponent
  // }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
