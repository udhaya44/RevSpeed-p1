import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './Components/user-header/user-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserOngoingPlansComponent } from './Components/user-ongoing-plans/user-ongoing-plans.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserHeaderComponent,
    UserOngoingPlansComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,MatButtonModule,
    MatMenuModule
  ]
})
export class UserModule { }
