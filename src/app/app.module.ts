import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppApiHitService } from './app-api-hit.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthService  } from './auth.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { ListComponent } from './container/user/list/list.component';
import { AddEditComponent } from './container/user/add-edit/add-edit.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { StyleChangeDirective } from './style-change.directive';
import { TransformSlashePipe } from './transform-slashe.pipe';
import { LoginComponent } from './login/login.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { LogoutComponent } from './logout/logout.component';
import { DynamicPageComponent } from './container/user/dynamic-page/dynamic-page.component';
import { TestPipe } from './test.pipe';
import { DisbaleControlDirective } from './disbale-control.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContainerComponent,
    DashboardComponent,
    ListComponent,
    AddEditComponent,
    StyleChangeDirective,
    TransformSlashePipe,
    LoginComponent,
    MainAreaComponent,
    LogoutComponent,
    DynamicPageComponent,
    TestPipe,
    DisbaleControlDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule

  ],
  providers: [AppApiHitService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
