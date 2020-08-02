import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _authService:AuthService,
    private _router:Router){}
  
    canActivate():boolean {

      if(this._authService.isLoggedIn()) {

        alert("you don't have access to this page");
        this._authService.navigateByRole();
        return false;
      } 
      else {  
        return true;
      }
      
    }
}
