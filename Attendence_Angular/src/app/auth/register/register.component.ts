import { SecurityEmployeeService } from 'src/app/_services/security-employee.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  constructor(private _auth:AuthService,private SecurityEmp:SecurityEmployeeService ,private router:Router) { }

  ngOnInit() {
  }
  register(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res =>{
        console.log(res);
        alert("You have registered successfully! ... please wait to confirm your acount");
        this.router.navigate(["/"]);
        

      },
      err => {
        console.log(err);
        alert("there are some errors during registeration!");
      }
    )
  }
}
