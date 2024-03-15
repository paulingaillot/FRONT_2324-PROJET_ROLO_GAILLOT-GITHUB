import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventUpdateComponent } from './event/event-update/event-update.component';
import { ConnectComponent } from './connect/connect.component';
import { ConnectLoginComponent } from './connect/connect-login/connect-login.component';
import { ConnectRegisterComponent } from './connect/connect-register/connect-register.component';
import { TchatComponent } from './tchat/tchat.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule, mapToCanActivate } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';


export const routes: Routes = [
  { path: 'event', component: EventListComponent, canActivate: mapToCanActivate([AuthGuardService])},
  { path: 'login', component: ConnectLoginComponent},
  { path: '', redirectTo: 'event', pathMatch: 'full'},
  { path: '**', redirectTo: 'event', pathMatch: 'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
