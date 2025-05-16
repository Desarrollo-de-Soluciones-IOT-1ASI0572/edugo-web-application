import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController
} from 'chart.js';
import { AnalyticsDriverService } from '../../services/analytics-service.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  constructor(private driverService: AnalyticsDriverService) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
  }

  ngOnInit(): void {
    this.driverService.getAnalyticsDrivers().subscribe(data => {
      const totals = { Lateness: 0, Detour: 0, Speeding: 0 };
      data.forEach(driver => {
        totals.Lateness += driver.incidentSummary.lateness;
        totals.Detour += driver.incidentSummary.detour;
        totals.Speeding += driver.incidentSummary.speeding;
      });

      const ctx = this.pieCanvas.nativeElement.getContext('2d');
      if (!ctx) return console.error('No canvas context for pie chart');

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Lateness', 'Detour', 'Speeding'],
          datasets: [{
            label: 'Incidentes',
            data: [totals.Lateness, totals.Detour, totals.Speeding],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Distribución de incidentes'
            }
          }
        }
      });
    });
  }
}
