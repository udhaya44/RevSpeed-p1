import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'',component:UserDashboardComponent,
   children:[
    
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }