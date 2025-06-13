import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  ChartType,
  Tick,
  Scale,
  CoreScaleOptions
} from 'chart.js';
import { AnalyticsDriverService } from '../../services/analytics-service.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() conductorId!: number;

  public chart!: Chart;

  constructor(private driverService: AnalyticsDriverService) {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Tooltip,
      Legend,
      Title
    );
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
    this.driverService.getAnalyticsByDriverId(id).subscribe(driver => {
      const labels = driver.arrivalTimes.map((d: { day: string }) => d.day);
      const values = driver.arrivalTimes.map((d: { time: string }) => {
        const [hour, min] = d.time.split(':').map(Number);
        return hour * 60 + min;
      });

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('arrivalLineChart') as HTMLCanvasElement;
      if (!ctx) return;

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `Hora de llegada`,
            data: values,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            stepped: true,
            pointRadius: 5,
            pointBackgroundColor: 'rgb(75, 192, 192)',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              min: 400,
              ticks: {
                callback: function (
                  this: Scale<CoreScaleOptions>,
                  tickValue: string | number
                ): string {
                  if (typeof tickValue === 'number') {
                    const hours = Math.floor(tickValue / 60);
                    const minutes = tickValue % 60;
                    return `${hours}:${minutes.toString().padStart(2, '0')}`;
                  }
                  return String(tickValue);
                }
              },
              title: {
                display: true,
                text: 'Hora de llegada'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  const hours = Math.floor(value / 60);
                  const minutes = value % 60;
                  return `Hora de llegada: ${hours}:${minutes.toString().padStart(2, '0')}`;
                }
              }
            }
          }
        }
      });
    });
  }
}
