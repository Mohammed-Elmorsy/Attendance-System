import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  ConfirmEmp:Employee[]=[];
  EmpRequests:Employee[]=[];
 constructor(private adminServ:AdminService) { }

 ngOnInit() {
   this.adminServ.getRequests().subscribe(res =>{
     this.EmpRequests = res;
   })
 }


   ClikedToConfirmEmp(id){
     
     this.adminServ.Confirmed(id).subscribe(a=>{
       console.log(a);
       this.ConfirmEmp=a;
     })}//ConfirmEmployee
 
     onHide(e) {
       this.EmpRequests.splice(this.EmpRequests.indexOf(e), 1);
    }

    cancelRequest(id){
      this.adminServ.deleteEmployee(id).subscribe(
        res => console.log(res),
        err => console.log(err)
        )
    }

}
