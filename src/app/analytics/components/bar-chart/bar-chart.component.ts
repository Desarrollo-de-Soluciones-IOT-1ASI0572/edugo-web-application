import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { AnalyticsDriverService } from '../../services/analytics-service.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  constructor(private driverService: AnalyticsDriverService) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
  }

  ngOnInit(): void {
    this.driverService.getAnalyticsDrivers().subscribe(data => {
      const labels = data.map(d => d.driverName);
      const values = data.map(d => d.distanceTraveled.reduce((acc: number, k: any) => acc + k.kilometers, 0));

      const ctx = this.barCanvas.nativeElement.getContext('2d');
      if (!ctx) return console.error('No canvas context available for bar chart');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Distancia total (km)',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Kilómetros recorridos por conductor'
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
