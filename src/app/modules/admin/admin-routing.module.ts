import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AnalyticsPageComponent } from './Components/analytics-page/analytics-page.component';
import { PlansComponent } from '../../Components/plans/plans.component';
import { BroadbandUserPageComponent } from './Components/broadband-user-page/broadband-user-page.component';
import { BusinessUserPageComponent } from './Components/business-user-page/business-user-page.component';
import { NotFoundComponent } from '../../Components/not-found/not-found.component';
import { AdminHomepageComponent } from './Components/admin-homepage/admin-homepage.component';
import { PlansPageComponent } from './Components/plans-page/plans-page.component';

const routes: Routes = [
  {
    path: 'admin-homepage',
    component: AdminHomepageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'plans', component: PlansPageComponent },
      { path: 'broadband-users', component: BroadbandUserPageComponent },
      { path: 'business-users', component: BusinessUserPageComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
