import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../event.service';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  favorites: any[]; 
  users: any[]; 
  user_actual: string;
  userDetails: { [userId: string]: any } = {};
  isUserFavorited: boolean = false;
  constructor(private eventService: EventService, 
    private authService: AuthService, 
    private http: HttpClient, 
    private router: Router,private route: ActivatedRoute,) {
      this.authService.loadUser().subscribe(user => {
        this.user_actual = user._id;
      });
     }


     ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');
      
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
  
        this.eventService.getFavoritesByEvent(eventId).subscribe(favorites => {
          this.favorites = favorites;
          this.favorites.forEach(favorite => {
           
            favorite.users.forEach((userId : string)=> {
              
              this.eventService.getUserById(userId).subscribe(user => {
                this.userDetails[userId] = user;
                if (userId === this.user_actual) {
                  this.isUserFavorited = true;
                }
              });
            });
          });
        });
      });
    }

navigateTo(url: string) {
this.router.navigateByUrl(url);
}
navigateToChat(username: string){
  this.router.navigate(['/tchat', username])
}
navigateToEdit(event_id: String){
  this.router.navigate(['/edit-event', event_id])
}
addToFavourite(): void {
  const eventId = this.route.snapshot.paramMap.get('id');
  this.eventService.addToFavorites(eventId, this.user_actual).subscribe(response => {
    // Reload the page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/event-details', eventId]);
    });
  });
}

deleteFromFavorite(): void {
  const eventId = this.route.snapshot.paramMap.get('id');
  this.eventService.deleteFromFavorites(eventId, this.user_actual).subscribe(response => {
    // Reload the page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/event-details', eventId]);
    });
  });
}

}
