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
  getEventById(eventId: any): Observable<Event> {
      return this.http.get<Event>(`http://localhost:3000/events/${eventId}`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
      );
      }
  // Method to filter events by name
  filterByName(eventName: string): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:3000/events/filter/name/${eventName}`).pipe(
      tap(data => console.log(`Filtered events by name (${eventName}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to filter events by price range
  filterByPrice(minPrice: number, maxPrice: number): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:3000/events/filter/price/${minPrice}/${maxPrice}`).pipe(
      tap(data => console.log(`Filtered events by price range (${minPrice} - ${maxPrice}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to filter events by theme
  filterByTheme(theme: string): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:3000/events/filter/theme/${theme}`).pipe(
      tap(data => console.log(`Filtered events by theme (${theme}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by price in ascending order
  sortByPriceAscending(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events/sort/price/ascending').pipe(
      tap(data => console.log('Sorted events by price (ascending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by price in descending order
  sortByPriceDescending(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events/sort/price/descending').pipe(
      tap(data => console.log('Sorted events by price (descending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by date in ascending order
  sortByDateAscending(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events/sort/date/ascending').pipe(
      tap(data => console.log('Sorted events by date (ascending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by date in descending order
  sortByDateDescending(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events/sort/date/descending').pipe(
      tap(data => console.log('Sorted events by date (descending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err:any) {
      console.log(err);
      return throwError(err);
    }
}
