import { Injectable } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';
import {Attendance} from '../_models/attendance';

@Injectable({
  providedIn: 'root'
})
export class SecurityEmployeeService {

  constructor(private http:HttpClient) { }

  getDay() {return new Date().toDateString()}
  getAttendTime() { return new Date().toTimeString()}
  getLeaveTime(){ return new Date().toTimeString()}

  attendenceList() { 
    return this.http.get<any>('http://localhost:8010/securityEmp/empList');
  }

  leavingList(){
    return this.http.get<any>('http://localhost:8010/leaving/list');
  }

  attendAdd(id) {
    
    return this.http.post<Employee>('http://localhost:8010/attendence/add',
      {empID: id, day: this.getDay(), attendenceTime: this.getAttendTime()});
  }



  leavingAdd(emp_id) {

    return this.http.post<Employee>('http://localhost:8010/leaving/add',
      {empID: emp_id, LeavingTime: this.getLeaveTime()});
  }

  FullReport() {
    return this.http.get<Attendance[]>('http://localhost:8010/FullReport');
   
  }

}
