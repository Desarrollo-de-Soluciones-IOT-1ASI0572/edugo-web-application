import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController
} from 'chart.js';
import { AnalyticsServiceService } from '../../services/analytics-service.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() selectedDriverId: string = '';
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  constructor(private driverService: AnalyticsServiceService) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
  }

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDriverId']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.driverService.getDriverAnalytics().subscribe(data => {
      // Destruir el gráfico anterior si existe
      if (this.chart) {
        this.chart.destroy();
      }

      // Filtrar datos según el conductor seleccionado
      const filteredData = this.selectedDriverId
        ? data.filter(d => d.driverUserId === this.selectedDriverId)
        : data;

      const totals = { Lateness: 0, Detour: 0, Speeding: 0 };
      filteredData.forEach(driver => {
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
              text: 'Distribution of incidents'
            }
          }
        }
      });
    });
  }
}
