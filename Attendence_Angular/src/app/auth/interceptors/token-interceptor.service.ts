import { Injectable ,Injector} from '@angular/core';
import {HttpRequest, HttpHandler,HttpEvent, HttpInterceptor} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service'
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { mergeMap, map ,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  helper = new JwtHelperService();

  intercept(req, next){
    let authService = this.injector.get(AuthService)

    /*const accessToken = authService.getAccessToken();
    const refreshToken = authService.getRefreshToken(); */


  /*       let tokenizedReq = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(tokenizedReq); */

    const accessToken = authService.getAccessToken();
    const refreshToken = authService.getRefreshToken();

        if (accessToken) 
        {
            let tokenizedReq  = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            } );
        

          return next.handle(tokenizedReq).catch(err => {
              console.log(err);
              if (err.status === 401) 
              {
                  //if (err.error.message == "Token is exp") {
                    
                    return authService.getNewAccessToken().pipe(map(
                      (data: any) => {
                        //If reload successful update tokens
                        if (data.status == 200) 
                        {
                          //Update tokens
                          localStorage.setItem("token", data.accessToken);
                          //Clone our fieled request ant try to resend it
                          tokenizedReq = req.clone({
                            setHeaders: {
                              'Authorization': `Bearer ${accessToken}`
                            }
                          });
                          console.log('new access token generated')
                          return next.handle(tokenizedReq).catch(err => {
                            console.log('error 1 with refresh token')
                          });
                        }
                        else 
                        {
                          //Logout from account
                          console.log('loggging out first if')
                          return authService.logout();
                        }

                      })); 
              }      
              else 
              {
                      //Logout from account 
                      console.log('loggging out second if')
                      return authService.logout();
              } 

          });    
        }
  }

}
