import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsServiceService } from '../../services/analytics-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import {DriverProfileService} from '../../services/driver-profile.service';

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
    MatPaginatorModule,
    TranslateModule,
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css',
})
export class ReportViewComponent implements OnInit {
  displayedColumns: string[] = [
    'driverName',
    'detour',
    'lateness',
    'speeding',
    'averageArrivalTime',
    'averageVelocity',
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private driverProfileService: DriverProfileService,
    private analyticsService: AnalyticsServiceService
  ) {}

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverProfileService.getDriverProfiles().subscribe({
      next: (profiles) => {
        const driverData = profiles.map((profile) => ({
          driverName: profile.fullName,
          userId: profile.id,
          detour: 0,
          lateness: 0,
          speeding: 0,
          averageArrivalTime: '--:--',
          averageVelocity: 0,
        }));

        this.dataSource.data = driverData;
        this.dataSource.paginator = this.paginator;

        driverData.forEach((driver) => {
          this.analyticsService.getAnalyticsByDriverId(driver.userId).subscribe({
            next: (analytics) => {

              const speeds = analytics.speedPerDay.map((s: any) => s.averageSpeed);
              const averageVelocity = speeds.reduce((sum: number, val: number) => sum + val, 0) / speeds.length;


              const arrivalTimesInMinutes = analytics.arrivalTimes.map((t: any) => {
                const [hour, minute] = t.time.split(':').map(Number);
                return hour * 60 + minute;
              });

              let averageArrival = '--:--';
              if (arrivalTimesInMinutes.length > 0) {
                const avgMinutes = Math.round(
                  arrivalTimesInMinutes.reduce((sum:number, val:number) => sum + val, 0) / arrivalTimesInMinutes.length
                );
                const hours = Math.floor(avgMinutes / 60).toString().padStart(2, '0');
                const minutes = (avgMinutes % 60).toString().padStart(2, '0');
                averageArrival = `${hours}:${minutes}`;
              }


              driver.detour = analytics.incidentSummary.detour;
              driver.lateness = analytics.incidentSummary.lateness;
              driver.speeding = analytics.incidentSummary.speeding;
              driver.averageVelocity = Math.round(averageVelocity);
              driver.averageArrivalTime = averageArrival;


              this.dataSource.data = [...this.dataSource.data];
            },
            error: (err) => {
              console.warn(`Error loading analytics for driver ${driver.userId}`, err);
            },
          });
        });
      },
      error: (error) => {
        console.error('Error loading driver profiles:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
