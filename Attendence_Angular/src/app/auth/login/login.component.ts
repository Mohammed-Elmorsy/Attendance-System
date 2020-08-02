import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    userName:"",
    password:""
  };
  helper = new JwtHelperService();
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  
  login(){
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        if(res.message === 'invalid user'){
          alert("invalid username or password");
        }
        else
        {
          localStorage.setItem('token',res.accessToken );
          localStorage.setItem('refreshToken',res.refreshToken );
          this.authService.decodedToken = this.helper.decodeToken(res.accessToken);
          this.authService.navigateByRole();
        }
      },
      err => {
        console.log(err);
        alert("server error")
      }
    )
  }
}
