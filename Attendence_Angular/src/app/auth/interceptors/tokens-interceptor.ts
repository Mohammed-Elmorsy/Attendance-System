import { Injectable ,Injector} from '@angular/core';
import {HttpRequest, HttpHandler,HttpEvent, HttpInterceptor,HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service'
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { mergeMap, map ,catchError, switchMap, filter,take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokensInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getAccessToken()) {
        request = this.addToken(request, this.authService.getAccessToken());
      }
  
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
    }
  
    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.getNewAccessToken().pipe(
      switchMap((token: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token.jwt);
        return next.handle(this.addToken(request, token.jwt));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
  }
}
}
