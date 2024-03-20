import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { throwError, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit{
  private socket: Socket;
  users: string[] = []; // Add this line
  roomName: String

  constructor(private authService: AuthService, private http: HttpClient) {
    this.socket = io('http://localhost:3000', {
      query: {
        username: this.authService.loadUser().username
      }
    });
  }

  ngOnInit(): void {
    this.getUsers().subscribe(users => {
      this.users = users; // Update the list of users
    });
    this.getMessages().subscribe(data => {
      console.log(`message reçcu : ` + data.message);
        // Mettez à jour le contenu du textarea avec le message reçu
        var messagesTextarea = document.getElementById("messages");
        if (messagesTextarea) {
        messagesTextarea.innerHTML += "<b>" + data.from + "</b> : " + data.message + '<br>';

        // Faites défiler le textarea vers le bas pour afficher les nouveaux messages
        messagesTextarea.scrollTop = messagesTextarea.scrollHeight;
        }
    });
  }

  sendMessage(): void {
    const message = (document.getElementById('message') as HTMLInputElement).value;
    this.socket.emit('message', this.roomName, message);
  }

  getMessages(): Observable<{ from: string, message: string }> {
    return new Observable(observer => {
      this.socket.on('message', (data: { from: string, message: string }) => observer.next(data));
    });
  }

  getUsers(): Observable<string[]> {
    return new Observable(observer => {
      this.socket.on('users', (users: string[]) => {observer.next(users)});
    });
  }
  
  selectUser(username: string): void {
    var roomName = this.getRoomName(this.authService.loadUser().username, username);
    console.log(roomName)
    this.socket.emit('leave room', this.roomName);
    this.socket.emit('join room', roomName);
    this.roomName = roomName;

    var messagesTextarea = document.getElementById("messages")!.innerHTML = "";  
    this.restoreHistory();
  }
  
  restoreHistory() {
    console.log("test de fonctionnement")
    console.log(this.roomName)
    return this.http.get<any>(`http://localhost:3000/tchat/restore/${this.roomName}`).subscribe(data => {
        console.log("Allo");
        console.log(data)
        var messagesTextarea = document.getElementById("messages");
        if (messagesTextarea) {
          data.messages.forEach((message2: any) => {
            console.log(message2)
            if (messagesTextarea) messagesTextarea.innerHTML += "<b>" + message2.sender + "</b> : " + message2.content + '<br>';
          });
      
          // Scroll the textarea down to display the new messages
          messagesTextarea.scrollTop = messagesTextarea.scrollHeight;
        }
    });  
  }

  getRoomName(user1:String, user2: String) {
    // Sort the usernames
    let users = [user1, user2].sort();
  
    // Join the usernames with a hyphen
    let roomName = users.join('-');
  
    return roomName;
  }

  private handleError(err:any) {
    console.log("ERREURR")
    console.log(err);
    return throwError(err);
  }

  getImage(username:String) {
    this.http.get<any>('http://localhost:3000/users/getUserByUsername/'+username)
    .subscribe(response => {
      return response.user;
    });
  }

}
