import { Injectable } from '@angular/core';
import { User } from './models/User'; // Assurez-vous que le chemin d'importation est correct
import { HttpClient } from '@angular/common/http';
import { throwError, Observable, catchError, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    
  }

  login(jwtToken: string, refreshToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  loadUser(): Observable<User> {
    const headers = { 'Authorization': 'Bearer ' + this.getJWTToken() };
    return this.http.get<User>('http://localhost:3000/users/get', { headers }).pipe(
      map(userObj => {
        const user = new User(
          userObj._id,
          userObj.name,
          userObj.surname,
          userObj.username,
          userObj.mail,
          userObj.picture,
          userObj.password,
          new Date(userObj.born),
          userObj.is_admin
        );
        return user;
      }),
      catchError(error => {
        // Handle or rethrow error
        throw error;
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
  }

  getJWTToken():string {
    if(localStorage.getItem('jwtToken')) return localStorage.getItem('jwtToken')!;
    else return "";
  }

  getRefreshToken():string {
    if(localStorage.getItem('jwtToken')) return localStorage.getItem('jwtToken')!;
    else return "";
  }

  isLoggedIn(): Observable<boolean> {
    console.log(this.getJWTToken())
    const headers = { 'Authorization': 'Bearer ' + this.getJWTToken() };
    console.log("il va jusque la")
    return this.http.get<any>('http://localhost:3000/users/isAuth', { headers })
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        map(response => true),
        catchError(error => of(false))
      );
  }
  
}
