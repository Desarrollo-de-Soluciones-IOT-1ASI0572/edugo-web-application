import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarModule} from '@fullcalendar/angular';
import {LogEntry, LogsService} from '../../services/logs.service';
@Component({
  selector: 'app-calendar-section',
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar-section.component.html',
  styleUrl: './calendar-section.component.css'
})
export class CalendarSectionComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: [],
    dateClick: (arg) => {
      alert('Día seleccionado: ' + arg.dateStr);
    }
  };

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.logsService.getLogs().subscribe((logs: LogEntry[]) => {
      const events: EventInput[] = [];

      logs.forEach((log) => {
        const date = log.date;

        if (log.incident.lateness) {
          events.push({
            title: '🕒 Llegó tarde',
            date,
            color: '#ffc107'
          });
        }

        if (log.incident.speeding) {
          events.push({
            title: '🚀 Exceso de velocidad',
            date,
            color: '#dc3545'
          });
        }

        if (log.incident.detour) {
          events.push({
            title: '🚧 Desvío en la ruta',
            date,
            color: '#17a2b8'
          });
        }

        if (
          !log.incident.lateness &&
          !log.incident.speeding &&
          !log.incident.detour
        ) {
          events.push({
            title: '✅ A tiempo',
            date,
            color: '#28a745'
          });
        }
      });

      this.calendarOptions.events = events;
    });
  }

}
