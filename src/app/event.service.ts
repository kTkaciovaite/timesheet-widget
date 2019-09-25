import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { mockedData } from './mockedData';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IEvent {
  quantity: number;
  price: number;
  eventType: string;
  isExpenseType: boolean;
  isHoursEventType: boolean;
  isAdditionalHoursEventType: boolean;
  isWorkHour: boolean;
  isApproved: boolean;
  isRejected: boolean;
  tasksCount: number;
  firstTaskStart: Date;
  lastTaskEnd: Date;
}

export interface IGroupedEvent {
  date: Date;
  events: IEvent[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: IGroupedEvent[] = [];
  private initialDate = moment();
  private selectedDate = new BehaviorSubject<moment.Moment>(this.initialDate);

  constructor() {
    this.events = mockedData;
  }

  getEvents() {
    return this.events;
  }

  getEventsByDate(day: Date): IEvent[] {
    const filteredEvents = this.events.filter(event => day.toLocaleDateString() === event.date.toLocaleDateString());

    return filteredEvents[0] && filteredEvents[0].events || [];
  }

  getSelectedDate(): Observable<moment.Moment> {
    return this.selectedDate.asObservable();
  }

  setDate(newDate: moment.Moment) {
    this.selectedDate.next(newDate);
  }
}
