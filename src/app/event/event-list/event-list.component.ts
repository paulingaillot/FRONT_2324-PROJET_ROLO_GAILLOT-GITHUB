import { Component } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../event.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  events:Event[]= []
  constructor(private eventService: EventService, private http: HttpClient) { }
  
  ngOnInit() {
    console.log('test');
    return this.eventService.getEvents().subscribe(events2 => {
      this.events = events2; console.log(events2);
    });
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
