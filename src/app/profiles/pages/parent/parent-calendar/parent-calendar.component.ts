import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarSectionComponent } from '../../../../analytics/pages/calendar-section/calendar-section.component';

@Component({
  selector: 'app-parent-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    CalendarSectionComponent
  ],
  templateUrl: './parent-calendar.component.html',
  styleUrls: ['./parent-calendar.component.css']
})
export class ParentCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
