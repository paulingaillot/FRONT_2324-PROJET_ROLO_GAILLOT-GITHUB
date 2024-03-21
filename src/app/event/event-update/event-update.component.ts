import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let eventId = this.route.snapshot.paramMap.get('id');

    this.eventForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'prix': new FormControl(null, Validators.required),
      'theme': new FormControl(null, Validators.required),
      
      
    });

    this.http.get<any>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/${eventId}`)
      .subscribe(event => {
        this.eventForm.patchValue({
          name: event.name,
          date: event.date,
          prix: event.prix,
          theme: event.theme
        });
      });
  }

 

  onSubmit() {

    console.log(this.eventForm.value);
    
    let eventId = this.route.snapshot.paramMap.get('id');
    this.http.put<any>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/${eventId}`, this.eventForm.value)
      .subscribe(response => {
        console.log("L'event a été mis à jour")
        this.router.navigate(['/event-details',eventId])
      }, error => {
        console.error("Erreur lors de la mise à jour de l'event", error);
      });
  }
}
