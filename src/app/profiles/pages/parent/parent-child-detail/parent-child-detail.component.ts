import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-parent-child-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './parent-child-detail.component.html',
  styleUrls: ['./parent-child-detail.component.css']
})
export class ParentChildDetailComponent implements OnInit {
  child!: Student;
  loading = true;
  childId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.childId = +params['id'];
      this.loadChildDetails();
    });
  }

  loadChildDetails(): void {
    this.studentService.getStudentById(this.childId).subscribe({
      next: (student: Student) => {
        this.child = student;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading child details:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
