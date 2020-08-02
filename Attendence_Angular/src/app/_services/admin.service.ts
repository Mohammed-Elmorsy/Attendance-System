import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  adminRouter = 'http://localhost:8010/admin';

  getEmployees() {
    return this.http.get<Employee[]>(this.adminRouter+'/empList');
  }
  getRequests() {
    return this.http.get<Employee[]>(this.adminRouter+'/requests');
  }

  Confirmed(id) {
    var UserName=Math.random().toString(36).substring(8);
    var Password=Math.random().toString().slice(2,6);
    console.log(UserName,Password);

    return this.http.post<Employee[]>(this.adminRouter+'/EditEmployee',
    {_id:id,userName:UserName,password:Password})
  }

  deleteEmployee(id) {
    return this.http.post<Employee>(this.adminRouter+'/deleteEmployee',{id});
  }
}
