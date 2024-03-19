import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

export const routes: Routes = [
  { path: 'event',  canActivate: mapToCanActivate([AuthGuardService]), component: EventListComponent}, 
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
