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
import { TranslateModule } from '@ngx-translate/core';
import {DriverProfile} from '../../../analytics/models/driver.model';
import {DriverProfileService} from '../../../analytics/services/driver-profile.service';
@Component({
  selector: 'app-drivers-list',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.css',
})
export class DriversListComponent {
  drivers: DriverProfile[] = [];
  selectedUserType: string = '';

  constructor(private router: Router, private driverProfileService: DriverProfileService) {}


  ngOnInit(): void {
    this.driverProfileService.getDriverProfiles().subscribe((data) => {
      this.drivers = data;
      console.log('Driver profiles loaded:', this.drivers);
    });
  }

  navigateToUser() {
    console.log('Valor seleccionado: ', this.selectedUserType);
    if (this.selectedUserType === 'driver') {
      this.router.navigate(['profiles/drivers']);
    } else if (this.selectedUserType === 'student') {
      this.router.navigate(['profiles/students']);
    } else {
      console.error('No user type selected');
    }
  }
}
