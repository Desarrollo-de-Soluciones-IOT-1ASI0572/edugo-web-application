import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.model';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-drivers-list',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.css',
})
export class DriversListComponent {
  drivers: Driver[] = [];

  constructor(private router: Router, private driverService: DriverService) { }

  selectedUserType: string = '';

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
      console.log(this.drivers);
    });
  }
  navigateToUser() {
    console.log('Valor seleccionado: ', this.selectedUserType);
    if (this.selectedUserType === 'driver') {
      console.log('Navigating to drivers...');
      this.router.navigate(['profiles/drivers']);
    } else if (this.selectedUserType === 'student') {
      console.log('Navigating to students...');
      this.router.navigate(['profiles/students']);
    } else {
      console.error('No user type selected');
    }
  }
}
