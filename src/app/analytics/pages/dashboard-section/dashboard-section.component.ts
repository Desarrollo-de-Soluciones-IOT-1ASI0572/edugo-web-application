import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from '../../components/pie-chart/pie-chart.component';
import {LineChartComponent} from '../../components/line-chart/line-chart.component';
import {BarChartComponent} from '../../components/bar-chart/bar-chart.component';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard-section',
  imports: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    NgForOf,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatOption,
  ],
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent implements OnInit {

  conductores: { id: number, nombre: string }[] = [];


  selectedConductorId: number = 1;

  constructor(private usuarioService: UserService) {}


  ngOnInit(): void {
    this.usuarioService.obtenerConductores().subscribe(conductores => {
      this.conductores = conductores;
      if (conductores.length > 0) {
        this.selectedConductorId = conductores[0].id;
      }
    });
  }

  onConductorChange(selectedId: number): void {
    this.selectedConductorId = selectedId;
    console.log('Conductor seleccionado:', selectedId);
  }

}
