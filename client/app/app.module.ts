import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {CustomerComponent} from './components/customer/customer.component';
import {AdminComponent} from './components/admin/admin.component'
import { MyDatePickerModule } from 'mydatepicker';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { RouterModule, Routes } from '@angular/router';
import {pageNotFoundComponent} from './components/pagenotfound/pagenotfound.component'
import {CanActivateViaAuthGuard} from './components/security/auth.guard'
import {CanActivateViaAuthGuardAdmin} from './components/security/auth.guard.admin'
import {ConfirmDeactivateGuard} from './components/security/auth.deguard'
import {AuthService} from './components/security/auth.service'

const appRoutes: Routes = [
  { path: 'customer', component: CustomerComponent, canActivate: [
    CanActivateViaAuthGuard
  ] },
  { path: 'admin',      component: AdminComponent, canActivate: [
    CanActivateViaAuthGuardAdmin
  ] },
  { path: 'login',      component: TasksComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: '404', component: pageNotFoundComponent},
 {path: '**', redirectTo: '/404'},
  { path: '**', component: pageNotFoundComponent }
];


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,MyDatePickerModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJSftDw2ZAC-PU9AXx0u7UVhbKGqO90j0'
    }),RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, TasksComponent,CustomerComponent,AdminComponent,pageNotFoundComponent],
   providers: [
    AuthService,
    CanActivateViaAuthGuard,ConfirmDeactivateGuard,CanActivateViaAuthGuardAdmin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
