import { Injectable } from '@angular/core';
import { User } from './models/User'; // Assurez-vous que le chemin d'importation est correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(user: any) {
    localStorage.setItem('isAuthenticated', 'true');

    localStorage.setItem('user', JSON.stringify(user));
    const userJson = localStorage.getItem('user');
    console.log(userJson);

  }

  loadUser(): User {
    const userJson = localStorage.getItem('user');
    console.log(userJson);
    if (userJson) {
      const userObj = JSON.parse(userJson);
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
    }
    return new User();
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
}
