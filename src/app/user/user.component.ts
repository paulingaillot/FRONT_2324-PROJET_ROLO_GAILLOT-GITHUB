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

  onSubmit() {  
    console.log(this.profileForm.value);
  }

  ngOnInit(): void {
    this.user = this.authService.loadUser();
    console.log(this.user);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let arrayBuffer = e.target.result;
        let buffer = Buffer.from(arrayBuffer);
        // Mettre à jour la valeur de 'image' avec le buffer
        this.profileForm.patchValue({
          image: buffer
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
