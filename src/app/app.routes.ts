import { Routes } from '@angular/router';
import { ReportViewComponent } from './analytics/components/report-view/report-view.component';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import { DashboardSectionComponent } from './analytics/pages/dashboard-section/dashboard-section.component';
import { DriversListComponent } from './profiles/components/drivers-list/drivers-list.component';
import { StudentsListComponent } from './profiles/components/students-list/students-list.component';
import { DriverDetailComponent } from './profiles/components/driver-detail/driver-detail.component';
import { StudentDetailComponent } from './profiles/components/student-detail/student-detail.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'analytics/dashboard', component: DashboardSectionComponent },
  { path: 'analytics/reports', component: ReportViewComponent },
  { path: 'profiles/drivers', component: DriversListComponent },
  { path: 'profiles/students', component: StudentsListComponent },
  { path: 'drivers/:id', component: DriverDetailComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in' },
];
