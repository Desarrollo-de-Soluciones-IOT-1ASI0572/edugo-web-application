import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { AnalyticsServiceService } from '../../services/analytics-service.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() selectedDriverId: string = '';
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  constructor(private driverService: AnalyticsServiceService) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
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

      const labels = filteredData.map(d => d.driverName);
      const values = filteredData.map(d => d.distanceTraveled.reduce((acc: number, k: any) => acc + k.kilometers, 0));

      const ctx = this.barCanvas.nativeElement.getContext('2d');
      if (!ctx) return console.error('No canvas context available for bar chart');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Total distance (km)',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Kilometers traveled by driver'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
