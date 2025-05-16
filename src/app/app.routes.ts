import { Routes } from '@angular/router';
import { ReportViewComponent } from './analytics/components/report-view/report-view.component';

export const routes: Routes = [
    { path: 'report-view', component: ReportViewComponent },
    { path: '', redirectTo: '/report-view', pathMatch: 'full' },
];
