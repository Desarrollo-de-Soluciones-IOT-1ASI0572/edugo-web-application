import { Routes } from '@angular/router';
import { ReportViewComponent } from './analytics/components/report-view/report-view.component';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import { DriversListComponent } from './profiles/components/drivers-list/drivers-list.component';
import { StudentsListComponent } from './profiles/components/students-list/students-list.component';
import { DriverDetailComponent } from './profiles/components/driver-detail/driver-detail.component';
import { StudentDetailComponent } from './profiles/components/student-detail/student-detail.component';
import {DashboardSectionComponent} from './analytics/pages/dashboard-section/dashboard-section.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  // ✅ protegidas con authGuard
  { path: 'analytics/dashboard', component: DashboardSectionComponent, canActivate: [authGuard] },
  { path: 'analytics/reports', component: ReportViewComponent, canActivate: [authGuard] },
  { path: 'profiles/drivers', component: DriversListComponent, canActivate: [authGuard] },
  { path: 'profiles/students', component: StudentsListComponent, canActivate: [authGuard] },
  { path: 'drivers/:id', component: DriverDetailComponent, canActivate: [authGuard] },
  { path: 'students/:id', component: StudentDetailComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in' },
];
