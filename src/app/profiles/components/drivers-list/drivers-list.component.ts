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
import { DriverProfile } from '../../../analytics/models/driver.model';
import { DriverProfileService } from '../../../analytics/services/driver-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentModalComponent } from '../add-student-modal/add-student-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private router: Router,
    private driverProfileService: DriverProfileService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.driverProfileService.getDriverProfiles().subscribe((data) => {
      this.drivers = data;
    });
  }

  navigateToUser() {
    if (this.selectedUserType === 'driver') {
      this.router.navigate(['profiles/drivers']);
    } else if (this.selectedUserType === 'student') {
      this.router.navigate(['profiles/students']);
    } else {
      console.error('No user type selected');
    }
  }

  openAddStudentModal() {
    const dialogRef = this.dialog.open(AddStudentModalComponent, {
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBar.open('Student and wristband created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }
}
