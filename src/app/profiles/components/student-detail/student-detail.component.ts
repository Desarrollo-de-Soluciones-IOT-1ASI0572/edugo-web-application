import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-detail',
  imports: [],
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
    const studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudents().subscribe((students) => {
      this.student = students.find((s) => s.studentId === studentId) as Student;
    });
  }
}
