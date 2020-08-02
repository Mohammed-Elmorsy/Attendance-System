import {Injectable} from '@angular/core';
import {Employee} from '../_models/employee';
import {Attendance} from '../_models/attendance';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
  constructor(private http: HttpClient ) {
  }
public newemp:Employee;

DailyReport() {
  return this.http.get<Attendance[]>('http://localhost:8010/listAttendance');
 
}

getMonthlyReport(empID, month) {
  return this.http.get<Attendance[]>('http://localhost:8010/monthlyReport',
  { params:{empID ,month} });
 
}


  
/*   add(emp: Employee) {
    
    this.newemp =new Employee(10,"33","33",23,"333","33");
    return this.http.post<Employee[]>('http://localhost:8010/register',emp);
  } */

  // TimeLeaving(id) {
  //   return this.http.post<Employee>('http://localhost:8010//edit',
  //     {empID: id,LeavingTime:this.LeavingTime });
  // }

}
