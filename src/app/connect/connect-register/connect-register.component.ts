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

    if (this.formData.password !== this.formData.repeatPassword) {
      // Si les mots de passe ne correspondent pas, ne pas soumettre le formulaire
      return;
    }

    // Supprimer le champ de confirmation du mot de passe du formData
    delete this.formData.repeatPassword;

    console.log(this.formData);
    this.http.post<any>('http://localhost:3000/users/addUser', this.formData)
    .subscribe(response => {
      console.log("L'user est inscrit et connecté")
      console.log(response)
      this.authService.login(new User(response));
      this.router.navigate(['/'])
        }, error => {
      console.error("Echec");
    });
    // Vous pouvez envoyer les données du formulaire à un service pour l'inscription
  }



}
