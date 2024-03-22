import { Component } from '@angular/core';
import { User } from '../models/User';
import { Buffer } from 'buffer';
import { AuthService } from '../auth.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  profileForm: any = {};
  user: User = new User();

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  edit() {
    this.router.navigate(['/account/edit']);
  }



  ngOnInit(): void {
    this.authService.loadUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}
