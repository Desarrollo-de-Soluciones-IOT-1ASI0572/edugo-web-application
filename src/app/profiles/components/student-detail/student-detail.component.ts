import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule, TranslateModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(studentId).subscribe((data) => {
      this.student = data;
      console.log('Student details:', this.student);
    });
  }
}
