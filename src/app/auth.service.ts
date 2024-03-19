import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(user: any) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
}
