import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }

  intercept(req,next){
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();

    if(accessToken)
    {
       req = req.clone({
        setHeaders:{
          'Authorization': `Bearer ${accessToken}`
        }
      })
    }

      return next.handle(req).pipe(catchError(
        err => 
        {
          //console.log(err);
          if(err.status === 401)
          {
            return this.authService.getNewAccessToken().pipe(map(
              (response) => 
              {
                //If reload successful update tokens
                if (response.newAccessToken && response.newRefreshToken) 
                {
                  //Update tokens
                  localStorage.setItem("token", response.newAccessToken);
                  localStorage.setItem("refreshToken", response.newRefreshToken);
                  //Clone our fieled request ant try to resend it
                  req = req.clone({
                    setHeaders: {
                      'Authorization': `Bearer ${response.newAccessToken}`
                    }
                  });
                  console.log('new access token generated')
                  console.log(response)
                  return next.handle(req).pipe(
                    catchError(
                      err => {
                        console.log('error 1 with refresh token')
                        this.authService.logout(); 
                        return throwError('errooooooooor')
                      }
                    )
                  );
                }
                else 
                {
                  //Logout from account
                  console.log(response)
                  return this.authService.logout();
                }
              }));
          }
        }
      ))

  }
}
