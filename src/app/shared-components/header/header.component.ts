import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  Accueil() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout(); // Appel de la fonction disconnect du service AuthService
  }

  
  tchat() {
    this.router.navigate(['/tchat']);
    }

    isUserLoggedIn() {
      return this.isLoggedIn;
    }

  Account() {
    this.router.navigate(['/account']);
  }

  CreateEvent() {
    this.router.navigate(["/create-event"]);
  }
}
