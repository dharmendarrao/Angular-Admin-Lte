import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


import { DashboardComponent } from '../container/dashboard/dashboard.component';
import { ListComponent } from '../container/user/list/list.component';
import { AddEditComponent } from '../container/user/add-edit/add-edit.component';
import { LoginComponent } from '../login/login.component';
import { AuthService  as AuthGuard  } from '../auth.service';
import { LogoutComponent } from '../logout/logout.component';
import { DynamicPageComponent } from '../container/user/dynamic-page/dynamic-page.component';
import { MainAreaComponent } from '../main-area/main-area.component';

const appRoutes:Routes=[
  {path:'', redirectTo: '/dashboard', pathMatch:'full'},
  {path:'mainarea', redirectTo: '/dashboard', pathMatch:'full'},
  {path:'mainarea', component:MainAreaComponent , pathMatch:'full'},
  {path:'login', component:LoginComponent , pathMatch:'full'},
  {path:'logout', component:LogoutComponent , pathMatch:'full'},
{path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
{path:'user_list', component:ListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
{path:'add', component:AddEditComponent, canActivate: [AuthGuard]},
{path:'dynamic_form', component:DynamicPageComponent, canActivate: [AuthGuard]},
{path:'user_list/edit/:id', component:AddEditComponent, pathMatch: 'full', canActivate: [AuthGuard]},
{path:'**', redirectTo: '/dashboard'},
];


@NgModule({
  imports: [
  RouterModule.forRoot(appRoutes)
  ],
  exports:[
   RouterModule
  ],
  
  
  declarations: []
})
export class AppRoutingModule { }
