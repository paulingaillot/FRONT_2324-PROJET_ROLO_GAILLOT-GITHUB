import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../event.service';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  constructor(private eventService: EventService, 
    private authService: AuthService, 
    private http: HttpClient, 
    private router: Router,private route: ActivatedRoute,) { }


  ngOnInit(): void {

  const eventId = this.route.snapshot.paramMap.get('id');
  this.eventService.getEventById(eventId).subscribe(event => {
    this.event = event;
    console.log(event);
  });
}

navigateTo(url: string) {
this.router.navigateByUrl(url);
}

}
