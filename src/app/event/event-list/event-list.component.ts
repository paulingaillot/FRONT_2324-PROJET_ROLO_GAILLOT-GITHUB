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

  logout() {
    this.authService.logout();
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  getImageUrl(blob: Blob): string | undefined {
    try {
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error getting image URL:', error);
      return '';
    }
  }
}