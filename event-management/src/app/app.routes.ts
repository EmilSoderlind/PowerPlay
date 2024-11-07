import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'start', component: DashboardComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];
