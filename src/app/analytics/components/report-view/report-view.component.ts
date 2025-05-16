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
import { DriverAnalytics } from '../../models/driver-analytics.model';

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
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent implements OnInit {
  drivers: DriverAnalytics[] = [];
  dataSource = new MatTableDataSource<DriverAnalytics>(this.drivers);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['driverName', 'detour', 'lateness', 'speeding', 'averageArrivalTime', 'averageDistance'];
  searchTerm: string = '';

  constructor(private analyticsService: AnalyticsServiceService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.analyticsService.getDriverAnalytics().subscribe({
      next: (data) => {
        this.drivers = data;
        this.dataSource.data = this.drivers;
        this.dataSource.paginator = this.paginator;
        this.setupFilter();
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      }
    });
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: DriverAnalytics, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.driverName.toLowerCase().includes(searchStr);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAverageArrivalTime(arrivalTimes: { time: string }[]): string {
    const times = arrivalTimes.map(at => {
      const [hours, minutes] = at.time.split(':').map(Number);
      return hours * 60 + minutes;
    });
    const average = times.reduce((a, b) => a + b, 0) / times.length;
    const hours = Math.floor(average / 60);
    const minutes = Math.round(average % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getAverageDistance(distances: { kilometers: number }[]): number {
    return Number((distances.reduce((a, b) => a + b.kilometers, 0) / distances.length).toFixed(2));
  }
}
