import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/_models/employee';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
   employee:Employee[]=[];
   ConfirmEmp:Employee[]=[];
  constructor(private adminService:AdminService,private authService: AuthService) { }

  ngOnInit() {}

    ClikedToConfirmEmp(id){
      
      this.adminService.Confirmed(id).subscribe(a=>{
        console.log(a);
        this.ConfirmEmp=a;
      })}//ConfirmEmployee

      onHide(e) {
        this.employee.splice(this.employee.indexOf(e), 1);
     }

}

