import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminprofileComponent } from './core/profile/adminprofile/adminprofile.component';
import { SecurityprofileComponent } from './core/profile/securityprofile/securityprofile.component';
import { EmpListComponent } from './features/employee/emp-list/emp-list.component';
import { AuthGuard } from './auth/guards/admin.guard';
import { SecurityEmployeeGuard } from './auth/guards/security-employee.guard';
import { EmployeeGuard } from './auth/guards/employee.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { EmployeeprofileComponent } from './core/profile/employeeprofile/employeeprofile.component';
import { RequestsComponent } from './features/employee/requests/requests.component';
import { AllEmpListComponent } from './features/employee/all-emp-list/all-emp-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './core/home/home.component';
import { MonthlyReportsComponent } from './features/employee/monthly-reports/monthly-reports.component';

const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "profile/admin", component: AdminprofileComponent, canActivate: [AuthGuard],
    children: [
      { path: "requests", component: RequestsComponent, canActivate: [AuthGuard] },
      { path: "empList", component: AllEmpListComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: "profile/securityEmployee", component: SecurityprofileComponent, canActivate: [SecurityEmployeeGuard],
    children: [
      { path: "empList", component: EmpListComponent, canActivate: [SecurityEmployeeGuard] },
      { path: "monthlyReport", component: MonthlyReportsComponent, canActivate: [SecurityEmployeeGuard] },
    ]
  },
  {
    path: "profile/employee", component: EmployeeprofileComponent, canActivate: [EmployeeGuard],
    children: [
      { path: "monthlyReport", component: MonthlyReportsComponent, canActivate: [EmployeeGuard] },
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegisterComponent, LoginComponent, AdminprofileComponent,
  RequestsComponent, AllEmpListComponent, SecurityprofileComponent, EmpListComponent,
  EmployeeprofileComponent, PageNotFoundComponent
]