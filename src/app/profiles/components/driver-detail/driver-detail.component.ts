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

@Component({
  selector: 'app-driver-detail',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.css',
})
export class DriverDetailComponent {
  driver!: Driver;
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const driverId = this.route.snapshot.paramMap.get('id');
    this.driverService.getDrivers().subscribe((drivers) => {
      this.driver = drivers.find((d) => d.userId === driverId) as Driver;

      this.studentService.getStudents().subscribe((students) => {
        this.students = students.filter((student) =>
          this.driver.studentIds.includes(student.studentId)
        );
      });
    });
  }
}
