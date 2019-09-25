import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetWidgetComponent } from './timesheet-widget/timesheet-widget.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: '', component: TimesheetWidgetComponent },
  { path: 'new', component: TaskFormComponent },
  { path: 'timesheet', component: TimesheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
