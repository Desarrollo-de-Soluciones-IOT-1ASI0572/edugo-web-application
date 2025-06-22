import {Component, OnInit, ViewChild, ElementRef, SimpleChanges, Input, OnChanges} from '@angular/core';

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

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() conductorId!: number;

  public chart!: Chart;

  constructor(private driverService: AnalyticsServiceService) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
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
      const totals = {
        Lateness: data.incidentSummary.lateness,
        Detour: data.incidentSummary.detour,
        Speeding: data.incidentSummary.speeding
      };

      const ctx = this.pieCanvas.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('No canvas context for pie chart');
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

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
