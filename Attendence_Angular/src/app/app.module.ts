import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,FormControl,FormGroup} from '@angular/forms'
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { DailyReportsComponent } from './features/employee/daily-reports/daily-reports.component';
import { MonthlyReportsComponent } from './features/employee/monthly-reports/monthly-reports.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './auth/guards/admin.guard';
import {TokenInterceptorService} from './auth/interceptors/token-interceptor.service'
import { SecurityEmployeeGuard } from './auth/guards/security-employee.guard';
import { EmployeeGuard } from './auth/guards/employee.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { EmployeeService } from './_services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { InterceptorService } from './auth/interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DailyReportsComponent,
    MonthlyReportsComponent,
    routingComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [AuthService,AuthGuard,SecurityEmployeeGuard,EmployeeGuard,LoginGuard
    ,EmployeeService,
    { 
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
