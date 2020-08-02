import {Component, OnInit} from '@angular/core';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Employee} from 'src/app/_models/employee';
import { SecurityEmployeeService } from 'src/app/_services/security-employee.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  employees: Employee[];
 
  constructor(private securityEmpServ: SecurityEmployeeService) {}
  
  onHide(e) {
    this.employees.splice(this.employees.indexOf(e), 1);

    this.securityEmpServ.attendAdd(e._id).subscribe(a => {
    console.log(a);
      alert('done'); 
    });
  }

  ngOnInit() {
    this.securityEmpServ.attendenceList()
    .subscribe(resultArray => {

      //var filteredResult = resultArray.filter(result => result.day === this.getCurrentDay())
      this.employees = resultArray;
      console.log(resultArray);
      //console.log(filteredResult);

    });
  }

}
