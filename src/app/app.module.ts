import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventUpdateComponent } from './event/event-update/event-update.component';
import { ConnectComponent } from './connect/connect.component';
import { ConnectLoginComponent } from './connect/connect-login/connect-login.component';
import { ConnectRegisterComponent } from './connect/connect-register/connect-register.component';
import { TchatComponent } from './tchat/tchat.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    EventListComponent,
    EventCreateComponent,
    EventDetailsComponent,
    EventUpdateComponent,
    ConnectComponent,
    ConnectLoginComponent,
    ConnectRegisterComponent,
    TchatComponent,
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
