import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { extendMoment } from 'moment-range';
import * as Moment from 'moment';

import { EventService, IGroupedEvent, IEvent } from '../event.service';

const moment = extendMoment(Moment);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, OnDestroy {
  date: Moment.Moment;
  selectedDate: Moment.Moment;
  days;
  events: IGroupedEvent[];
  selectedDateSubscription;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private eventService: EventService
  ) {
    iconRegistry.addSvgIcon('calendar-today', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-today.svg'));
  }

  ngOnInit() {
    this.date = moment();
    this.events = this.eventService.getEvents();
    this.days = this.initializeDays();
    this.selectedDateSubscription = this.eventService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
    }, (error) => {
      console.log(error.message);
    });
  }

  ngOnDestroy() {
    this.selectedDateSubscription.unsubscribe();
  }

  selectDate(date: Moment.Moment) {
    this.eventService.setDate(date);
  }

  selectToday() {
    this.eventService.setDate(moment());
  }

  private initializeDays() {
    const daysRange = this.getDaysRange();

    const days = Array.from(daysRange.by('day')).map((day) => {
      const dayEvents = this.eventService.getEventsByDate(day.toDate());

      return {
        date: day,
        dayTaskStatus: this.getDayTaskStatus(dayEvents),
        hoursWorked: this.getHoursWorked(dayEvents),
        isToday: this.date.format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
        isWeekend: day.day() === 0 || day.day() === 6
      };
    });

    return days;
  }

  private getDaysRange() {
    const endDate = moment();
    const startDate = endDate.clone().subtract(6, 'days');

    return moment.range(startDate, endDate);
  }

  private getDayTaskStatus(dayEvents: IEvent[]) {
    if (!dayEvents.length || dayEvents.every(event => !event.tasksCount)) {
      return 'none';
    }

    if (dayEvents.some(event => event.isRejected)) {
      return 'rejected';
    }

    if (dayEvents.length && dayEvents.every(event => event.isApproved)) {
      return 'approved';
    }

    return 'pending';
  }

  private getHoursWorked(dayEvents: IEvent[]) {
    const filteredEvents = dayEvents.filter(event => event.isHoursEventType === true);

    let minutesWorked = 0;
    filteredEvents.forEach(event => {
      const startTime = moment(event.firstTaskStart);
      const endTime = moment(event.lastTaskEnd);

      minutesWorked += endTime.diff(startTime, 'minutes');
    });

    if (!minutesWorked) {
      return '-';
    }

    const hoursWorked = moment().startOf('day').add(minutesWorked, 'minutes').subtract(30, 'minutes');

    return hoursWorked.format('H:mm');
  }
}
