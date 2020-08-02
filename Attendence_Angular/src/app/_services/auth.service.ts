import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import {  tap } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  errmsg:string;
  private baseURL = 'http://localhost:8010';

  helper = new JwtHelperService();
  decodedToken:any;

  constructor(
    private httpClient: HttpClient,
    private router:Router
  ) { }
   
  //signup
  public registerUser(user){
    return this.httpClient.post<any>(this.baseURL+'/register',user)
  }

  //login
  public loginUser(user){
   return this.httpClient.post<any>(this.baseURL+'/login',user)
   
  }
  
  public logout(){
    //just remove the access token and redirect
    console.log("user logged out successfully");
    this.httpClient.delete<any>(this.baseURL+'/logout')
    localStorage.removeItem('token');  
    localStorage.removeItem('refreshToken');  
    this.router.navigate(["/login"]);

  }

  getAccessToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

/*   setAccessToken() {
    this.getNewAccessToken().subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.accessToken)
      },
      err => {
        console.log(err);
        alert("problem with the token")
      }
      
    )
    
  } */

  //get a new access token from server 
  getNewAccessToken() {
    return this.httpClient.post<any>(this.baseURL+'/token', {
      refreshToken: this.getRefreshToken()
    })
  }

  isLoggedIn(){     
    const token = localStorage.getItem('token');
    //return  !this.helper.isTokenExpired(token);
    return !!token
  }

  getUserPayLoad(){
    let token = this.getAccessToken();
    if (token) {
        let userPayload = atob(token.split('.')[1]);
        // console.log(userPayload);
        return JSON.parse(userPayload);
    }else{
      return "null";
    }
  }

  navigateByRole(){
    let role = this.getUserPayLoad().role;
    console.log(role);
    switch(role){
      case "employee":
        this.router.navigate(["/profile/employee"]);
        break;
      case "securityEmployee":
        this.router.navigate(["/profile/securityEmployee"]);
        break;
      case "admin":
        this.router.navigate(["/profile/admin"]);
        break;
      default:
        this.router.navigate(["/register"]);
    }
  }
}

