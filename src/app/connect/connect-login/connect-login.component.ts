import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable, catchError, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-connect-login',
  templateUrl: './connect-login.component.html',
  styleUrls: ['./connect-login.component.css']
})
export class ConnectLoginComponent {
  username: string= "";
  password: string= "";

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  checkPassword(formValues: any) {
    this.http.post<any>('http://localhost:3000/users/login', formValues)
    .subscribe(response => {
      console.log("L'user est connecté")
      this.authService.login(response.user);
      this.router.navigate(['/'])
        }, error => {
      console.error(error+" Bad password");
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
}