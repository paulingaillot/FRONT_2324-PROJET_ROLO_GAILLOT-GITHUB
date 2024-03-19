import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-connect-register',
  templateUrl: './connect-register.component.html',
  styleUrls: ['./connect-register.component.css']
})
export class ConnectRegisterComponent {
  formData: any = {};

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }


  onSubmit() {
    // Logique de soumission du formulaire ici
    console.log(this.formData);
    this.http.post<any>('http://localhost:3000/users/addUser', this.formData)
    .subscribe(response => {
      console.log("L'user est inscrit et connecté")
      console.log(response)
      this.authService.login(new User(response.user));
      this.router.navigate(['/'])
        }, error => {
      console.error("Echec");
    });
    // Vous pouvez envoyer les données du formulaire à un service pour l'inscription
  }

  onFileSelected(event: any) {
    // Logique pour gérer la sélection d'une image depuis les fichiers locaux ici
    const file: File = event.target.files[0];
    console.log(file);
    // Vous pouvez traiter le fichier comme nécessaire, par exemple, le téléverser sur un serveur
  }

}
