import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage
  ],
  templateUrl: './authentication-section.component.html',
  styleUrls: ['./authentication-section.component.css']
})
export class AuthenticationSectionComponent {
  @Output() formSubmitted = new EventEmitter<{ username: string; password: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {

      this.formSubmitted.emit(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  goToDashboard() {
    this.router.navigate(['analytics/dashboard']);
  }
}
