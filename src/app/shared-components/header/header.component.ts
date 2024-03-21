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

  
  tchat() {
    this.router.navigate(['/tchat']);
    }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  Account() {
    this.router.navigate(['/account']);
  }

  CreateEvent() {
    this.router.navigate(["/create-event"]);
  }
}
