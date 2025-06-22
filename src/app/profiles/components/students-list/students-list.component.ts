import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-students-list',
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
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
})
export class StudentsListComponent {
  students: Student[] = [];
  selectedUserType: string = '';

  constructor(private router: Router, private studentService: StudentService) {}

  navigateToUser() {
    if (this.selectedUserType === 'driver') {
      this.router.navigate(['profiles/drivers']);
    } else if (this.selectedUserType === 'student') {
      this.router.navigate(['profiles/students']);
    } else {
      console.error('No user type selected');
    }
  }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
      console.log('Students loaded:', this.students);
    });
  }
}
