import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-connect-register',
  templateUrl: './connect-register.component.html',
  styleUrls: ['./connect-register.component.css']
})
export class ConnectRegisterComponent {
  formData: any = {};
  errorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }


  onSubmit() {
    // Logique de soumission du formulaire ici

    if (this.formData.password !== this.formData.repeatPassword) {
      // Si les mots de passe ne correspondent pas, ne pas soumettre le formulaire
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    if (!this.isDateOfBirthValid()) {
      this.errorMessage = "La date de naissance doit être antérieure à la date actuelle.";
      return;
    }

    // Supprimer le champ de confirmation du mot de passe du formData
    delete this.formData.repeatPassword;

    this.http.post<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/addUser', this.formData)
    .subscribe(response => {
      this.errorMessage = "";
      console.log("L'utilisateur est inscrit et connecté");
      this.authService.login(response.accessToken, response.refreshToken);
      this.router.navigate(['/']);
    }, error => {
      console.error("Echec :", error);
      this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
    });
    // Vous pouvez envoyer les données du formulaire à un service pour l'inscription
  }
  isDateOfBirthValid(): boolean {
    const selectedDate = new Date(this.formData.born);
    const currentDate = new Date();
    return selectedDate <= currentDate;
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let arrayBuffer = e.target.result;
        let buffer = Buffer.from(arrayBuffer);
        // Mettre à jour la valeur de 'image' avec le buffer
        this.formData.picture = buffer
      };
      reader.readAsArrayBuffer(file);
    }
  }



}
