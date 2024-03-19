import { Component } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../event.service';
import { AuthService } from '../../auth.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  events:Event[]= []
  constructor(private eventService: EventService, private authService: AuthService, private http: HttpClient, private router: Router) { }
  
  ngOnInit() {
    console.log('test');
    return this.eventService.getEvents().subscribe(events2 => {
      this.events = events2; console.log(events2);
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
    this.router.navigate([url]);
}

  getImageUrl(imageBlob: Blob): string | undefined {
    try {
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error('Error getting image URL:', error);
    return '';
  }
  }

}
