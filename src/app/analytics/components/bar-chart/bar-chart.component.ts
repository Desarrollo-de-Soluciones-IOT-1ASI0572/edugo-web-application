import {Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges} from '@angular/core';

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

  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() conductorId!: number;

  public chart!: Chart;

  constructor(private driverService: AnalyticsServiceService) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
  }

  ngOnInit(): void {

    if (this.conductorId) {
      this.loadChartData(this.conductorId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conductorId'] && !changes['conductorId'].firstChange) {
      this.loadChartData(this.conductorId);
    }
  }

  private loadChartData(id: number): void {
    this.driverService.getAnalyticsByDriverId(id).subscribe(data => {
      const labels = data.speedPerDay.map((item: { day: string }) => item.day);
      const speeds = data.speedPerDay.map((item: { averageSpeed: number }) => item.averageSpeed);


      const ctx = this.barCanvas.nativeElement.getContext('2d');
      if (!ctx) return console.error('No canvas context available for bar chart');

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Velocidad promedio (km/h)',
            data: speeds,

            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Velocidad promedio por día'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Km/h'
              }
            }
          }
        }
      });
    });
  }
}
