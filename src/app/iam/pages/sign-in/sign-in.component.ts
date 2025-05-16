import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationSectionComponent } from '../../components/authentication-section/authentication-section.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [AuthenticationSectionComponent]
})
export class SignInComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  onFormSubmit(credentials: { email: string; password: string }): void {
    this.authService.signIn(credentials.email, credentials.password).subscribe({
      next: () => this.router.navigate(['analytics/dashboard']),
      error: (err) => console.error('Error en login:', err)
    });
  }
}
