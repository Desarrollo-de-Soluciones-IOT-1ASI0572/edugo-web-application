import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DriverProfileService } from '../../services/driver-profile.service'; // ✅ usa el nuevo servicio
import { DriverProfile } from '../../models/driver.model';
import {AnalyticsServiceService} from '../../services/analytics-service.service'; // Asegúrate que exista este modelo

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
    NgForOf,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    PieChartComponent,
  ],
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css'],
})
export class DashboardSectionComponent implements OnInit {
  conductores: { id: number, nombre: string }[] = [];

  selectedConductorId: number = 1;

  constructor(private driverProfileService: DriverProfileService, private analyticsService: AnalyticsServiceService) {}

  ngOnInit(): void {
    this.driverProfileService.getDriverProfiles().subscribe(perfiles => {
      this.conductores = perfiles.map(p => ({
        id: p.id,
        nombre: p.fullName
      }));

      if (this.conductores.length > 0) {
        this.selectedConductorId = this.conductores[0].id;

        this.analyticsService.syncAnalyticsLogsForDriver(this.selectedConductorId);

      }
    });
  }

  onConductorChange(selectedId: number): void {
    this.selectedConductorId = selectedId;
    console.log('Conductor seleccionado:', selectedId);

    this.analyticsService.syncAnalyticsLogsForDriver(selectedId);

  }

  onDriverChange(): void {

  }
}
