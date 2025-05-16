import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  student!: Student;
  driver!: Driver;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudents().subscribe((students) => {
      this.student = students.find((s) => s.studentId === studentId) as Student;

      // Obtener el conductor asociado
      this.driverService.getDrivers().subscribe((drivers) => {
        this.driver = drivers.find((d) => d.userId === this.student.driverUserId) as Driver;
      });
    });
  }
}
