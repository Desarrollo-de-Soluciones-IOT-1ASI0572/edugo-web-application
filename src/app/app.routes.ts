import { Routes } from '@angular/router';
import {DashboardSectionComponent} from './analytics/pages/dashboard-section/dashboard-section.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardSectionComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
