import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-register',
  templateUrl: './connect-register.component.html',
  styleUrls: ['./connect-register.component.css']
})
export class ConnectRegisterComponent {
  formData: any = {};

  onSubmit() {
    // Logique de soumission du formulaire ici
    console.log(this.formData);
    // Vous pouvez envoyer les données du formulaire à un service pour l'inscription
  }

  onFileSelected(event: any) {
    // Logique pour gérer la sélection d'une image depuis les fichiers locaux ici
    const file: File = event.target.files[0];
    console.log(file);
    // Vous pouvez traiter le fichier comme nécessaire, par exemple, le téléverser sur un serveur
  }

}
