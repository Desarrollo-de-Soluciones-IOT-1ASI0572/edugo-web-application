import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { StudentService, CreateStudentRequest } from '../../services/student.service';
import { WristbandService } from '../../services/wristband.service';
import { CreateWristbandRequest } from '../../models/wristband.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule,
    MatSnackBarModule
  ],
  templateUrl: './add-student-modal.component.html',
  styleUrl: './add-student-modal.component.css'
})
export class AddStudentModalComponent {
  studentForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private wristbandService: WristbandService,
    private snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      homeAddress: ['', [Validators.required]],
      schoolAddress: ['', [Validators.required]],
      studentPhotoUrl: ['', [Validators.required]],
      parentProfileId: [null, [Validators.required]],
      driverId: [null, [Validators.required]],
      rfidCode: ['', [Validators.required, Validators.minLength(4)]],
      wristbandStatus: ['ACTIVE', [Validators.required]]
    });
  }

  onSave(): void {
    if (this.studentForm.valid) {
      this.isLoading = true;

      const formValue = this.studentForm.value;

      const studentData: CreateStudentRequest = {
        name: formValue.name,
        lastName: formValue.lastName,
        homeAddress: formValue.homeAddress,
        schoolAddress: formValue.schoolAddress,
        studentPhotoUrl: formValue.studentPhotoUrl,
        parentProfileId: formValue.parentProfileId,
        driverId: formValue.driverId
      };

      this.studentService.createStudent(studentData).subscribe({
        next: (students) => {
          const createdStudent = students[0];

          // Datos para crear el wristband
          const wristbandData: CreateWristbandRequest = {
            rfidCode: formValue.rfidCode,
            wristbandStatus: formValue.wristbandStatus,
            studentId: createdStudent.id
          };

          console.log('📦 Datos enviados para wristband:', wristbandData);

          this.wristbandService.createWristband(wristbandData).subscribe({
            next: (wristbands) => {
              this.isLoading = false;
              this.snackBar.open('Student and wristband created successfully!', 'Close', {
                duration: 3000,
                panelClass: ['success-snackbar']
              });
              this.dialogRef.close({ success: true, student: createdStudent, wristband: wristbands });
            },
            error: (error) => {
              this.isLoading = false;
              this.snackBar.open('Error creating wristband. Please try again.', 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Error creating student. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.studentForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
