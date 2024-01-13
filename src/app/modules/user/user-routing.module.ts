import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserOngoingPlansComponent } from './Components/user-ongoing-plans/user-ongoing-plans.component';
import { UserProfileComponent } from '../../Components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',component:UserDashboardComponent,
   children:[
    {path:'',redirectTo:"user-ongoing-pans",pathMatch:"full"},
    {path:"user-ongoing-pans",component:UserOngoingPlansComponent},
    {path:'user-profile', component:UserProfileComponent},
    
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
