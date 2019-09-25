import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './event.service';
import { TimesheetWidgetComponent } from './timesheet-widget/timesheet-widget.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SummaryComponent } from './summary/summary.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TimesheetWidgetComponent,
    TaskFormComponent,
    SummaryComponent,
    TimesheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
