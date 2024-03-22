import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../event.service';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  maxEventPrice = 0;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedTheme: string = '';
  user_actual: any;
  constructor(private eventService: EventService, 
              private authService: AuthService, 
              private http: HttpClient, 
              private router: Router) {
                this.authService.loadUser().subscribe(user => {
                  this.user_actual = user.username;
                });
               }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events2 => {
      this.events = events2.map(event => event);
      this.calculateMaxPrice();
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
  redirectToEventDetails(eventId: String) {
    this.router.navigate(['/event-details', eventId]);
  }

  // Function to filter events by name
  filterByName(eventName: string) {
    this.eventService.filterByName(eventName).subscribe(filteredEvents => {
      this.events = filteredEvents;
    });
  }

  // Function to filter events by price range
  filterByPrice(minPrice: number, maxPrice: number) {
    this.eventService.filterByPrice(minPrice, maxPrice).subscribe(filteredEvents => {
      this.events = filteredEvents;
    });
  }

  // Function to filter events by theme
  filterByTheme(theme: string) {
    this.eventService.filterByTheme(theme).subscribe(filteredEvents => {
      this.events = filteredEvents;
    });
  }
  callfilterByTheme(){
    if (this.selectedTheme!= ''){
      this.eventService;this.filterByTheme(this.selectedTheme);
    }
    
  }

  // Function to sort events by price in ascending order
  sortByPriceAscending() {
    this.eventService.sortByPriceAscending().subscribe(sortedEvents => {
      this.events = sortedEvents;
    });
  }

  // Function to sort events by price in descending order
  sortByPriceDescending() {
    this.eventService.sortByPriceDescending().subscribe(sortedEvents => {
      this.events = sortedEvents;
    });
  }

  // Function to sort events by date in ascending order
  sortByDateAscending() {
    this.eventService.sortByDateAscending().subscribe(sortedEvents => {
      this.events = sortedEvents;
    });
  }

  // Function to sort events by date in descending order
  sortByDateDescending() {
    this.eventService.sortByDateDescending().subscribe(sortedEvents => {
      this.events = sortedEvents;
    });
  }

  calculateMaxPrice() {
    this.maxEventPrice = Math.max(...this.events.map(event => event.prix));
  }
}