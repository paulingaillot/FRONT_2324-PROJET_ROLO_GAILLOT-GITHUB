import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect-login',
  templateUrl: './connect-login.component.html',
  styleUrls: ['./connect-login.component.css']
})
export class ConnectLoginComponent {
  username: string = "";
  password: string = "";
  loginError: string = "";

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  checkPassword(formValues: any) {
    this.http.post<any>('http://localhost:3000/users/login', formValues)
      .subscribe(response => {
        console.log("L'utilisateur est connecté")
        this.authService.login(response.accessToken, response.refreshToken);
        this.router.navigate(['/']);
      }, error => {
        console.error(error + " Mauvais mot de passe");
        this.loginError = "Mauvais nom d'utilisateur ou mot de passe"; // Set the error message
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
