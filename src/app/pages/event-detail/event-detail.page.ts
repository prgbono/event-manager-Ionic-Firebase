import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';

// We are importing ActivatedRoute because that is the module that handles navigation parameters 
// (like the event ID we sent to this page from event-list-page.html -- routerLink="/event-detail/{{ event.id }}">)

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  public guestName = '';

  constructor (private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventService
      .getEventDetail(eventId)
      .get()
      .then(eventSnapshot => {
        this.currentEvent = eventSnapshot.data();
        this.currentEvent.id = eventSnapshot.id;
      });
  }

  addGuest (guestName: string): void {
    this.eventService
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.currentEvent.price,
      )
      .then(() => this.guestName = '' );
  }
  
}

