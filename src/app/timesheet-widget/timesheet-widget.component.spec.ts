import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetWidgetComponent } from './timesheet-widget.component';

describe('TimesheetWidgetComponent', () => {
  let component: TimesheetWidgetComponent;
  let fixture: ComponentFixture<TimesheetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
