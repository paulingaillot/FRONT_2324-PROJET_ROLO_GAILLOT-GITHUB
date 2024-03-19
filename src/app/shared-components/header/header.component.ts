import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }


  logout() {
    this.authService.logout(); // Appel de la fonction disconnect du service AuthService
  }

  isUserLoggedIn() {
    console.log(this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  Account() {
    this.router.navigate(['/account']);
  }
}
