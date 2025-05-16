import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { AnalyticsServiceService } from '../../services/analytics-service.service';
import { DriverAnalytics } from '../../models/driver-analytics.model';

@Component({
  selector: 'app-dashboard-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
export class DashboardSectionComponent implements OnInit {
  drivers: DriverAnalytics[] = [];
  selectedDriverId: string = '';

  constructor(private analyticsService: AnalyticsServiceService) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.analyticsService.getDriverAnalytics().subscribe(data => {
      this.drivers = data;
    });
  }

  onDriverChange(): void {
    // Los componentes hijos se actualizarán automáticamente cuando cambie selectedDriverId
  }
}
