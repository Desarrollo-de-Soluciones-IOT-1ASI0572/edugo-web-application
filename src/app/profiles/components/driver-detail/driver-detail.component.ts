import { Component } from '@angular/core';
import { Driver } from '../../models/driver.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {DriverProfile} from '../../../analytics/models/driver.model';
import {DriverProfileService} from '../../../analytics/services/driver-profile.service';

@Component({
  selector: 'app-driver-detail',
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
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.css',
})
export class DriverDetailComponent {
  driver!: DriverProfile;
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private driverProfileService: DriverProfileService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const driverId = Number(this.route.snapshot.paramMap.get('id'));

    this.driverProfileService.getDriverProfiles().subscribe((drivers) => {
      this.driver = drivers.find((d) => d.id === driverId)!;
    });

    this.studentService.getStudentsByDriverId(driverId).subscribe((students) => {
      this.students = students;
    });
  }
}
