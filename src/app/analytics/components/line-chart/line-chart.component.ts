import {Component, OnInit} from '@angular/core';
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
  ChartType
} from 'chart.js';
import {AnalyticsServiceService} from '../../services/analytics-service.service';
import {Analytics} from '../../models/analytics.model';
import moment from 'moment'
@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{

  public chart!: Chart;

  constructor(private analyticService: AnalyticsServiceService) {
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
    moment.locale('es'); // Establece el locale en español si lo deseas

    this.analyticService.getAnalytics().subscribe((data: Analytics[]) => {
      const today = moment().startOf('day');
      const startOfWeek = moment().startOf('isoWeek'); // lunes

      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const arrivalTimes: (number | null)[] = Array(5).fill(null);

      const filteredData = data.filter((entry) => {
        const entryDate = moment(entry.date).startOf('day');
        return entryDate.isSameOrAfter(startOfWeek) && entryDate.isSameOrBefore(today);
      });

      filteredData.forEach((entry) => {
        const entryDate = moment(entry.date).startOf('day');
        const dayName = entryDate.format('dddd'); // 'Monday', 'Tuesday', etc.
        const index = daysOfWeek.indexOf(dayName);
        if (index !== -1) {
          const [hour, minute] = entry.arrival_time_school.split(':').map(Number);
          const arrivalInMinutes = hour * 60 + minute;
          arrivalTimes[index] = arrivalInMinutes;
        }
      });

      this.chart = new Chart('arrivalLineChart', {
        type: 'line',
        data: {
          labels: daysOfWeek,
          datasets: [
            {
              label: 'Tiempo de llegada al colegio esta semana',
              data: arrivalTimes,
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
              stepped: true,
              pointRadius: 5,
              pointBackgroundColor: 'rgb(75, 192, 192)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 420,
              ticks: {
                callback: function (tickValue: string | number) {
                  if (typeof tickValue === 'number') {
                    const hours = Math.floor(tickValue / 60);
                    const minutes = tickValue % 60;
                    return `${hours}:${minutes.toString().padStart(2, '0')}`;
                  }
                  return tickValue;
                },
              },
              title: {
                display: true,
                text: 'Hora de llegada',
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  const hours = Math.floor(value / 60);
                  const minutes = value % 60;
                  return `Hora de llegada: ${hours}:${minutes.toString().padStart(2, '0')}`;
                },
              },
            },
          },
        },
      });
    });
  }
}
