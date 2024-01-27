import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminHeaderComponent } from './Components/admin-header/admin-header.component';

import { AddPlanAdminComponent } from './Components/add-plan-admin/add-plan-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TotalPlansComponent } from './Components/total-plans/total-plans.component';
import { TotalUsersComponent } from './Components/total-users/total-users.component';
import { TotalSubscriptionsComponent } from './Components/total-subscriptions/total-subscriptions.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { AnalyticsPageComponent } from './Components/analytics-page/analytics-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { AdminHomepageComponent } from './Components/admin-homepage/admin-homepage.component';
import { MatInputModule } from '@angular/material/input';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlansPageComponent } from './Components/plans-page/plans-page.component';
import { BusinessUserPageComponent } from './Components/business-user-page/business-user-page.component';
import { BroadbandUserPageComponent } from './Components/broadband-user-page/broadband-user-page.component';
import { AddBusinessPlanComponent } from './Components/add-business-plan/add-business-plan.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHeaderComponent,
    TotalPlansComponent,
    TotalSubscriptionsComponent,
    TotalUsersComponent,
    AddPlanAdminComponent,
    AnalyticsPageComponent,
    AdminHomepageComponent,
    SideNavComponent,
    PlansPageComponent,
    BusinessUserPageComponent,
    BroadbandUserPageComponent,
    AddBusinessPlanComponent,
   
  ],
  imports: [
    CommonModule,
    NgbModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
