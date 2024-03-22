import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError, Observable, catchError, tap, of, map, switchMap, pipe} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   retryCount = 0;
   maxRetryCount = 3;

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getJWTToken();
    console.log(authToken);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Erreur interceptée : "+error.status)
        if (error.status === 403 && this.retryCount < this.maxRetryCount) {
          console.log("Il retente la requête !! ");
          this.retryCount++;
          var rtoken = this.authService.getRefreshToken();
          console.log("Breakpoint 1 "+ rtoken)
          return this.getNewToken(rtoken).pipe(
            switchMap((data:any) => {
              console.log("Breakpoint 2")

              console.log("Nouveau token généré : "+data.accessToken.toString());
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
    console.log("il va jusque laaa" + rtoken);
    this.authService.saveJWTToken(rtoken);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + rtoken);
    return this.http.post<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/token', { headers })
    .pipe(
      map(response => {
        console.log('Response: ', response);
        return response;
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }
  
}