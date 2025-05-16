import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students-list',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
})
export class StudentsListComponent {
  students: Student[] = [];

  constructor(private router: Router, private studentService: StudentService) {}
  selectedUserType: string = '';

  navigateToUser() {
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
  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(this.students);
    });
  }
}
