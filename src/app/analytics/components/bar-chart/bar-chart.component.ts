import {Component, OnInit} from '@angular/core';
import {
  Chart,
  ChartType,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import {AnalyticsServiceService} from '../../services/analytics-service.service';
import {Analytics} from '../../models/analytics.model';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  public secondChart!: Chart;

  constructor(private analyticsService: AnalyticsServiceService) {
    // ✅ Registrar los componentes necesarios para el gráfico de barras
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend,
      Title
    );
  }

  ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe((analytics: Analytics[]) => {
      const grouped: { [day: string]: number[] } = {};

      analytics.forEach(entry => {
        const day = this.formatDay(entry.date);
        if (!grouped[day]) {
          grouped[day] = [];
        }
        grouped[day].push(entry.avg_speed_kmh);
      });

      const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
      const labels: string[] = [];
      const averages: number[] = [];

      weekdays.forEach(day => {
        const values = grouped[day];
        if (values && values.length > 0) {
          labels.push(day);
          const sum = values.reduce((a, b) => a + b, 0);
          averages.push(+(sum / values.length).toFixed(2));
        }
      });

      const data = {
        labels,
        datasets: [{
          label: 'Velocidad promedio por día (km/h)',
          data: averages,
          backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }]
      };

      this.secondChart = new Chart("secondChart", {
        type: 'bar' as ChartType,
        data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Velocidad promedio por día de la semana (solo con datos)'
            },
            legend: {
              display: false
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

  private formatDay(dateStr: string): string {
    const date = new Date(dateStr + 'Z');
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getUTCDay()];
  }
}
