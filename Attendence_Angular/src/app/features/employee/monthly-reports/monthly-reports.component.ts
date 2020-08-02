import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-monthly-reports',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.css']
})
export class MonthlyReportsComponent implements OnInit {

  month:number = null;
  empID:number = this.authService.getUserPayLoad().id;
  attendanceData:any[];

  getReport(){
    console.log(this.month);
    this.empService.getMonthlyReport(this.empID, this.month).subscribe(res=>{
      console.log('res '+ res);
      this.attendanceData = res;
      console.log(this.attendanceData);
    }, err=>{
      console.log(err)
    })
  }

  constructor(private empService:EmployeeService, private authService:AuthService) { }

  ngOnInit() {
  }

}
