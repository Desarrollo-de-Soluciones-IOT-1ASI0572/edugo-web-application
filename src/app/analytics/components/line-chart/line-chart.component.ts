import { Component, OnInit } from '@angular/core';
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
export class LineChartComponent implements OnInit {
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
    this.driverService.getAnalyticsDrivers().subscribe(data => {
      const driver = data[0]; // Puedes cambiar a otro índice si deseas

      const labels = driver.arrivalTimesAtSchool.map((d: { date: string; time: string }) => d.date);
      const values = driver.arrivalTimesAtSchool.map((d: { date: string; time: string }) => {
        const [hour, min] = d.time.split(':').map(Number);
        return hour * 60 + min;
      });

      this.chart = new Chart('arrivalLineChart', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `Llegadas de ${driver.driverName}`,
            data: values,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            stepped: true,
            pointRadius: 5,
            pointBackgroundColor: 'rgb(75, 192, 192)',
          }]
        },
        options: {
          scales: {
            y: {
              min: 400,
              ticks: {
                callback: function (
                  this: Scale<CoreScaleOptions>,
                  tickValue: string | number,
                  index: number,
                  ticks: Tick[]
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
