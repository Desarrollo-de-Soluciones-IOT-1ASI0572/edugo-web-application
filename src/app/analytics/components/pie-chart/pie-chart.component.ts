import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartType,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController
} from 'chart.js';
import {Alert} from '../../models/alert.model';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit{
  public firstChart!: Chart;

  constructor(private alertService: AlertService) {
    // Registramos los elementos necesarios para el gráfico tipo pie
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
  }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((alerts: Alert[]) => {
      const grouped = this.groupByType(alerts);
      const labels = Object.keys(grouped);
      const dataValues = Object.values(grouped);

      this.firstChart = new Chart('firstChart', {
        type: 'pie' as ChartType,
        data: {
          labels,
          datasets: [{
            label: 'Alertas',
            data: dataValues,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Alertas por Tipo'
            }
          }
        }
      });
    });
  }

  private groupByType(alerts: Alert[]): { [type: string]: number } {
    const result: { [type: string]: number } = {};
    alerts.forEach(alert => {
      const type = alert.type;
      result[type] = (result[type] || 0) + 1;
    });
    return result;
  }
}
