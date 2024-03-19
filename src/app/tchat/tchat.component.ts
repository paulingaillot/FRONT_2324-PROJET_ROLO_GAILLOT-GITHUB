import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit{
  private socket: Socket;
  users: string[] = []; // Add this line

  constructor(private authService: AuthService) {
    this.socket = io('http://localhost:3000', {
      query: {
        username: this.authService.loadUser().username
      }
    });
  }

  ngOnInit(): void {
    this.getUsers().subscribe(users => {
      this.users = users; // Update the list of users
      console.log(users); // Do something with the list of users
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (message: string) => observer.next(message));
    });
  }

  getUsers(): Observable<string[]> {
    return new Observable(observer => {
      this.socket.on('users', (users: string[]) => {console.log(users);observer.next(users)});
    });
  }

}
