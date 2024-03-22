import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError, Observable, catchError, tap, of, map, switchMap, pipe, concatMap} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   retryCount = 0;
   maxRetryCount = 3;

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getJWTToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && this.retryCount < this.maxRetryCount) {
          console.log("L'utilisateur n'a plus accès au Back. Génération d'un nouveau JWT Token.")
          this.retryCount++;
          var rtoken = this.authService.getRefreshToken();
          return this.getNewToken(rtoken).pipe(
            concatMap((data:any) => {
              console.log("Nouveau token généré");
              this.authService.saveJWTToken(data.accessToken.toString());
              const authRequestRetry = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + data.accessToken)
              });
              return next.handle(authRequestRetry);
            })
          );
        }
        return throwError(error);
      })
    );
  }


  getNewToken(rtoken : string): Observable<any> {
    this.authService.saveJWTToken(rtoken);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + rtoken);
    return this.http.post<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/token', { headers })
    .pipe(
      map(response => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
}