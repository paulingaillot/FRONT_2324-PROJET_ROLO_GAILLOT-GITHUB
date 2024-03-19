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

  constructor(private eventService: EventService, 
              private authService: AuthService, 
              private http: HttpClient, 
              private router: Router) { }

  ngOnInit(): void {
    console.log('test');
    this.eventService.getEvents().subscribe(events2 => {
      this.events = events2.map(event => event);
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
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

  
}