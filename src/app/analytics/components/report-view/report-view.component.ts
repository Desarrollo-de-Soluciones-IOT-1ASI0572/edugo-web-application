import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsServiceService } from '../../services/analytics-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Incident {
  date: string;
  type: string;
  hour: string;
  location: string;
  observations: string;
  driverId: string;
}

// Datos falsos para pruebas
const FAKE_INCIDENTS: Incident[] = [
  { date: '2023-10-01', type: 'Incidents', hour: '10:00', location: 'Location A', observations: 'Observation 1', driverId: '1' },
  { date: '2023-10-02', type: 'Delays', hour: '11:00', location: 'Location B', observations: 'Observation 2', driverId: '2' },
  { date: '2023-10-03', type: 'Emergencies', hour: '12:00', location: 'Location C', observations: 'Observation 3', driverId: '3' },
  { date: '2023-10-04', type: 'Incidents', hour: '09:00', location: 'Location D', observations: 'Observation 4', driverId: '1' },
  { date: '2023-10-05', type: 'Delays', hour: '08:30', location: 'Location E', observations: 'Observation 5', driverId: '2' },
  { date: '2023-10-06', type: 'Emergencies', hour: '07:45', location: 'Location F', observations: 'Observation 6', driverId: '3' },
  { date: '2023-10-07', type: 'Incidents', hour: '06:15', location: 'Location G', observations: 'Observation 7', driverId: '1' },
  { date: '2023-10-08', type: 'Delays', hour: '05:50', location: 'Location H', observations: 'Observation 8', driverId: '2' },
  { date: '2023-10-09', type: 'Emergencies', hour: '04:30', location: 'Location I', observations: 'Observation 9', driverId: '3' },
];

@Component({
  selector: 'app-report-view',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel,
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent implements OnInit {
  reportTypes = ['Incidents', 'Delays', 'Emergencies'];
  selectedDriver = '';
  selectedReportType = '';
  selectedDate: Date | null = null;
  incidents: Incident[] = [];
  dataSource = new MatTableDataSource<Incident>(this.incidents);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private analyticsService: AnalyticsServiceService) { }

  ngOnInit() {
    this.incidents = FAKE_INCIDENTS;
    this.dataSource.data = this.incidents;
    this.dataSource.paginator = this.paginator;
    this.resetFilters();
  }

  applyFilter() {
    const typeFilter = this.selectedReportType.trim().toLowerCase();
    const driverFilter = this.selectedDriver.trim().toLowerCase();
    const dateFilter = this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : '';

    this.dataSource.data = this.incidents.filter(incident => {
      const matchesType = typeFilter ? incident.type.toLowerCase().includes(typeFilter) : true;
      const matchesDriver = driverFilter ? incident.driverId.toLowerCase().includes(driverFilter) : true;
      const matchesDate = dateFilter ? incident.date === dateFilter : true;
      return matchesType && matchesDriver && matchesDate;
    });
  }

  resetFilters() {
    this.selectedReportType = '';
    this.selectedDriver = '';
    this.selectedDate = null;
    this.dataSource.data = this.incidents;
  }
}
