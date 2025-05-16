import { Component } from '@angular/core';
import {PieChartComponent} from '../../components/pie-chart/pie-chart.component';
import {LineChartComponent} from '../../components/line-chart/line-chart.component';
import {BarChartComponent} from '../../components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-dashboard-section',
  imports: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent
  ],
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent {

}
