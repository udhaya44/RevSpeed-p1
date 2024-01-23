import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AnalyticsPageComponent } from './Components/analytics-page/analytics-page.component';
import { AdminHomepageComponent } from './Components/admin-homepage/admin-homepage.component';

const routes: Routes = [
  {
    path: 'admin-homepage',
    component: AdminHomepageComponent,
    children: [
      { path: '', component:  AdminDashboardComponent },
      {path:'analytics', component:AnalyticsPageComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
