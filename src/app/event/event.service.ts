import { Injectable } from '@angular/core';
import { throwError, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/Event';
import { User } from '../models/User';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getEvents(): Observable<Event[]> {
    const headers = { 'Authorization': 'Bearer ' + this.authService.getJWTToken() };
    return this.http.get<Event[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/events').pipe(
    tap(data => console.log('All: ', JSON.stringify(data))),
    catchError(this.handleError)
    );
    }
  getUserById(userId: string): Observable<User> {
      return this.http.get<any>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/users/${userId}`).pipe(
        catchError(this.handleError)
      );
    }
  getEventById(eventId: any): Observable<Event> {
      return this.http.get<Event>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/${eventId}`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
      );
      }
  getFavoritesByEvent(eventId: any): Observable<any[]> {
        return this.http.get<any[]>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/favorites/event/${eventId}`).pipe(
          tap(data => console.log('Favorites by event: ', data)),
          catchError(this.handleError)
        );
      }
    
  getFavoritesByUser(userId: any): Observable<any[]> {
      return this.http.get<any[]>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/favorites/user/${userId}`).pipe(
        tap(data => console.log('Favorites by user: ', data)),
        catchError(this.handleError)
      );
    }
  addToFavorites(eventId: any,userId: string): Observable<any> {
          
        return this.http.post<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/favorites', { userId, eventId }).pipe(
          tap(data => console.log('Event added to favorites:', data)),
          catchError(this.handleError)
        );
      }
  deleteFromFavorites(eventId: any, userId: string): Observable<any> {
    const url = `https://back-2324-projet-rolo-gaillot-github.onrender.com/favorites`;
    const body = { userId, eventId };
    return this.http.delete<any>(url, { body }).pipe(
      tap(data => console.log('Event deleted from favorites:', data)),
      catchError(this.handleError)
    );
  }
  // Method to filter events by name
  filterByName(eventName: string): Observable<Event[]> {
    return this.http.get<Event[]>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/filter/name/${eventName}`).pipe(
      tap(data => console.log(`Filtered events by name (${eventName}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to filter events by price range
  filterByPrice(minPrice: number, maxPrice: number): Observable<Event[]> {
    return this.http.get<Event[]>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/filter/price/${minPrice}/${maxPrice}`).pipe(
      tap(data => console.log(`Filtered events by price range (${minPrice} - ${maxPrice}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to filter events by theme
  filterByTheme(theme: string): Observable<Event[]> {
    return this.http.get<Event[]>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/events/filter/theme/${theme}`).pipe(
      tap(data => console.log(`Filtered events by theme (${theme}): `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by price in ascending order
  sortByPriceAscending(): Observable<Event[]> {
    return this.http.get<Event[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/events/sort/price/ascending').pipe(
      tap(data => console.log('Sorted events by price (ascending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by price in descending order
  sortByPriceDescending(): Observable<Event[]> {
    return this.http.get<Event[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/events/sort/price/descending').pipe(
      tap(data => console.log('Sorted events by price (descending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by date in ascending order
  sortByDateAscending(): Observable<Event[]> {
    return this.http.get<Event[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/events/sort/date/ascending').pipe(
      tap(data => console.log('Sorted events by date (ascending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Method to sort events by date in descending order
  sortByDateDescending(): Observable<Event[]> {
    return this.http.get<Event[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/events/sort/date/descending').pipe(
      tap(data => console.log('Sorted events by date (descending): ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  
  private handleError(err:any) {
      console.log(err);
      return throwError(err);
    }
}
