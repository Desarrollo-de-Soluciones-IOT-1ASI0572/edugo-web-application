import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SignInComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;

    this.authService.signIn(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login error:', err)
    });
  }
}
