import { Component, OnInit } from '@angular/core';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Employee} from 'src/app/_models/employee';
import { SecurityEmployeeService } from 'src/app/_services/security-employee.service';
import {filter, map} from 'rxjs/operators'

@Component({
  selector: 'app-leavingemplist',
  templateUrl: './leavingemplist.component.html',
  styleUrls: ['./leavingemplist.component.css']
})
export class LeavingemplistComponent implements OnInit {

  constructor(private securityEmpServ:SecurityEmployeeService) { }
  employees: any[];

  getCurrentDay() {return new Date().toDateString()}

  onHide(e) {
    this.employees.splice(this.employees.indexOf(e), 1);

    this.securityEmpServ.leavingAdd(e.empID).subscribe(a => {alert('done'); });

  }
  ngOnInit() {

      this.securityEmpServ.leavingList()
/*       .pipe(

        filter( result => result.day === this.getCurrentDay())

      ) */
      .subscribe(resultArray => {

      var filteredResult = resultArray.filter(result => result.day === this.getCurrentDay())
      this.employees = filteredResult;
      console.log(resultArray);
      console.log(filteredResult);

    });

  }   
}
 