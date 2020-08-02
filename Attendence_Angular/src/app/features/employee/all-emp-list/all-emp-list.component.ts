import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-all-emp-list',
  templateUrl: './all-emp-list.component.html',
  styleUrls: ['./all-emp-list.component.css']
})
export class AllEmpListComponent implements OnInit {

 constructor(private adminService:AdminService) { }
 employees : Employee[] = [];
 
 ngOnInit() {
   this.adminService.getEmployees().subscribe(res =>{
      console.log(res); 
      this.employees = res;
     
   })
 }

 deleteEmp(id){
   this.adminService.deleteEmployee(id).subscribe(
     res =>console.log(res),
     err => console.log(err)
   )
 }

 onHide(e) {
  this.employees.splice(this.employees.indexOf(e), 1);
}

}
