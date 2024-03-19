import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError, Observable, catchError, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.eventForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'prix': new FormControl(null, Validators.required),
      'theme': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required),
      'creator':  new FormControl("65f428ed7d7c13d74e067faa", Validators.required)
    });
  }

  onSubmit() {
    console.log(this.eventForm.value);
    this.http.post<any>('http://localhost:3000/events/', this.eventForm.value)
    .subscribe(response => {
      console.log("L'event a été créé")
      this.router.navigate(['/'])
        }, error => {
      console.error("Fuck le code");
    });
    // Implement your logic to create a new Event here
  }
}