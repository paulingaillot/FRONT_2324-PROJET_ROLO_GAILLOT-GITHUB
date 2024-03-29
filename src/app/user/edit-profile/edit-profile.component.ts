import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileForm: any = {};
  

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { this.authService.loadUser().subscribe(user => {
    this.profileForm = {
      name: user.name,
      surname: user.surname,
      mail: user.mail,
      born: user.born,}
  });}


  onSubmit() {    
    this.authService.loadUser().subscribe(user => {
      this.http.put<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/' + user._id, this.profileForm)
        .subscribe(response => {
          this.authService.login(this.authService.getJWTToken(), this.authService.getRefreshToken());
          this.router.navigate(['/account'])
        }, error => {
          console.error("Echec");
        });
    });
  }

  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let arrayBuffer = e.target.result;
        let buffer = Buffer.from(arrayBuffer);
        // Mettre à jour la valeur de 'image' avec le buffer
        this.profileForm.picture = buffer
      };
      reader.readAsArrayBuffer(file);
    }
  }

}
