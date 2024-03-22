import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError, Observable, catchError, tap, of, map, switchMap, pipe} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getJWTToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.log("Il retente la requête")
          return of(this.authService.getRefreshToken()).pipe(
            switchMap((newToken: string) => {
              this.authService.saveJWTToken(newToken);
              const authRequestRetry = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + newToken)
              });
              return next.handle(authRequestRetry);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}