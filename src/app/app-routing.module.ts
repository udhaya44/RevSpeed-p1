import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { SpeedtestComponent } from './Components/speedtest/speedtest.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { FibernetBroadbandComponent } from './Components/fibernet-broadband/fibernet-broadband.component';
import { BusinessBroadbandComponent } from './Components/business-broadband/business-broadband.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { RegistrationComponent } from './Components/registration/registration.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { userGuardGuard } from './guards/user-guard.guard';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UpdatepasswordComponent } from './Components/updatepassword/updatepassword.component';

const routes: Routes = [
  {
    path: 'front-page',
    component: FrontPageComponent,
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', component: HomePageComponent },
      { path: 'speed-test', component: SpeedtestComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'fibernet-broadband', component: FibernetBroadbandComponent },
      { path: 'business-broadband', component: BusinessBroadbandComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registeration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'update-password' ,component:UpdatepasswordComponent},
  // {path:'user-profile', component:UserProfileComponent},
  {
    path: 'admin',
    canActivate: [adminGuardGuard],
    // data: { expectedRole: 'admin' },
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  }, //lazy loading
  {
    path: 'user',
    canActivate: [userGuardGuard],
    // data: { expectedRole: 'user' },
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}
