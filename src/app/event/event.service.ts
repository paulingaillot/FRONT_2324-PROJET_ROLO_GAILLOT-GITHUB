import { Injectable } from '@angular/core';
import { throwError, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  constructor(private http: HttpClient) {


  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events').pipe(
    tap(data => console.log('All: ', JSON.stringify(data))),
    catchError(this.handleError)
    );
    }

    private handleError(err:any) {
      console.log(err);
      return throwError(err);
    }
}
