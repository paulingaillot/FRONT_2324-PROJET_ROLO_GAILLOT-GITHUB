import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { throwError, Observable, catchError, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface userData {
  username: string;
  picture: string;
}

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit{
  private socket: Socket;
  users: string[] = []; // Add this line
  roomName: String;
  userImage: any = {}; // Add this line
  user: any;

  constructor(private authService: AuthService, private http: HttpClient, private route : ActivatedRoute) {
    this.authService.loadUser().subscribe(user => {
      this.user = user;

      this.socket = io('https://back-2324-projet-rolo-gaillot-github.onrender.com', {
        query: {
          username:  this.user.username
        }
      });

      if(this.route.snapshot.paramMap.get('username') !== null) this.selectUser(this.route.snapshot.paramMap.get('username')!);

      this.getMessages().subscribe(data => {
          // Mettez à jour le contenu du textarea avec le message reçu
          var messagesTextarea = document.getElementById("messages");
          if (messagesTextarea) {
            let timestamp = Date.now(); // Remplacez ceci par votre timestamp en millisecondes
            let date = new Date(timestamp);
            let formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
          messagesTextarea.innerHTML += "["+formattedDate +"] <b>" + data.from + "</b> : " + data.message + '<br>';
  
          // Faites défiler le textarea vers le bas pour afficher les nouveaux messages
          messagesTextarea.scrollTop = messagesTextarea.scrollHeight;
          }
      });

    });

  }

  ngOnInit(): void {

    this.getUsers().subscribe(data => {
      data.forEach((user: userData) => {
        this.users.push(user.username);
        this.userImage[user.username] = user.picture;
      });
    });
  }

  sendMessage(): void {
    if(this.roomName === undefined) return;
    const message = (document.getElementById('message') as HTMLInputElement).value;
    this.socket.emit('message', this.roomName, message);
    (document.getElementById('message') as HTMLInputElement).value = "";
  }

  getMessages(): Observable<{ from: string, message: string }> {
    return new Observable(observer => {
      this.socket.on('message', (data: { from: string, message: string }) => observer.next(data));
    });
  }

  getUsers(): Observable<userData[]> {
    return this.http.get<userData[]>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/all');
  }
  
  selectUser(username: string): void {
    var roomName = this.getRoomName( this.user.username, username);
    this.socket.emit('leave room', this.roomName);
    this.socket.emit('join room', roomName);
    this.roomName = roomName;

    var messagesTextarea = document.getElementById("messages")!.innerHTML = "";  
    this.restoreHistory();
  }
  
  restoreHistory() {
    return this.http.get<any>(`https://back-2324-projet-rolo-gaillot-github.onrender.com/tchat/restore/${this.roomName}`).subscribe(data => {
        var messagesTextarea = document.getElementById("messages");
        if (messagesTextarea) {
          data.messages.forEach((message2: any) => {
            let date = new Date(message2.timestamp);
            let formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            if (messagesTextarea) messagesTextarea.innerHTML += "["+formattedDate+ "] <b>" + message2.sender + "</b> : " + message2.content + '<br>';
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
    return throwError(err);
  }

  getImage(username: string): Observable<any> {
    return this.http.get<any>('https://back-2324-projet-rolo-gaillot-github.onrender.com/users/userPicture/' + username)
      .pipe(map((response: any) => response.user));
  }

  getOtherUsername(): string {
    try {
      const usernames = this.roomName.split('-');
      return usernames[0] === this.user.username ? usernames[1] : usernames[0];
    } catch(e) {
      return "";
    }
  }

}
