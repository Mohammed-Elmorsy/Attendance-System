import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService:AuthService,
  private _router:Router){}

  canActivate():boolean {
    let role = this._authService.getUserPayLoad().role;
    if(this._authService.isLoggedIn() && role === "admin") {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }

  }  
}
