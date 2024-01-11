import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserOngoingPlansComponent } from './Components/user-ongoing-plans/user-ongoing-plans.component';

const routes: Routes = [
  {path:'',component:UserDashboardComponent,
   children:[
    {path:'',redirectTo:"user-ongoing-pans",pathMatch:"full"},
    {path:"user-ongoing-pans",component:UserOngoingPlansComponent}
    
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
