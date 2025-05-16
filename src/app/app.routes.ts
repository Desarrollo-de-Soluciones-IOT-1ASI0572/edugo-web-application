import { Routes } from '@angular/router';
import { DashboardSectionComponent } from './analytics/pages/dashboard-section/dashboard-section.component';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'dashboard', component: DashboardSectionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
