import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import * as moment from 'moment';

import { EventService, IEvent } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit, OnDestroy {
  selectedDate: moment.Moment;
  selectedDateSubscription: Subscription;
  dayEvents: IEvent[];
  hourEvents: IEvent[];
  expenseEvents: IEvent[];
  additionalHourEvents: IEvent[];
  workStartTime: moment.Moment;
  workEndTime: moment.Moment;

  constructor(
    private eventService: EventService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon('clock', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clock.svg'))
      .addSvgIcon('money', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/money.svg'));
  }

  ngOnInit() {
    this.selectedDateSubscription = this.eventService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
      this.dayEvents = this.eventService.getEventsByDate(date.toDate());

      this.hourEvents = this.dayEvents.filter((event) => event.isHoursEventType);
      this.expenseEvents = this.dayEvents.filter((event) => event.isExpenseType);
      this.additionalHourEvents = this.dayEvents.filter((event) => event.isAdditionalHoursEventType);

      if (this.hourEvents.length) {
        const startTimeEvent = this.hourEvents.reduce((savedEvent, currentEvent) => {
          return (currentEvent.firstTaskStart < savedEvent.firstTaskStart) ? currentEvent : savedEvent;
        });

        const endTimeEvent = this.hourEvents.reduce((savedEvent, currentEvent) => {
          return (currentEvent.firstTaskStart > savedEvent.firstTaskStart) ? currentEvent : savedEvent;
        });

        this.workStartTime = moment(startTimeEvent.firstTaskStart);
        this.workEndTime = moment(endTimeEvent.lastTaskEnd);
      }
    }, (error) => {
      console.log(error.message);
    });
  }

  ngOnDestroy() {
    this.selectedDateSubscription.unsubscribe();
  }

  getDuration(startDate: Date, endDate: Date) {
    const startTime = moment(startDate);
    const endTime = moment(endDate);
    const minutesWorked = endTime.diff(startTime, 'minutes');

    return moment().startOf('day').add(minutesWorked, 'minutes').format('H:mm');
  }
}
