import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';
import { AuthenticationService } from '../../../../iam/services/authentication.service';

@Component({
  selector: 'app-parent-children',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './parent-children.component.html',
  styleUrls: ['./parent-children.component.css']
})
export class ParentChildrenComponent implements OnInit {
  children: Student[] = [];
  loading = true;
  parentId!: number;

  constructor(
    private studentService: StudentService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadParentChildren();
  }

  loadParentChildren(): void {
    const profileId = this.authService.getProfileId(); // ← Usamos el profile_id

    if (profileId) {
      this.parentId = parseInt(profileId, 10);
      this.studentService.getStudentsByParentId(this.parentId).subscribe({
        next: (students: Student[]) => {
          this.children = students;
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  viewChildDetails(childId: number): void {
    this.router.navigate(['/parent/children', childId]);
  }
}
