import { Routes } from '@angular/router';
import { DsComponent } from '@layout/ds/ds.component';
import { dsRoutes } from '@layout/ds/ds.routes';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'docs',
    component: DsComponent,
    children: dsRoutes,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
