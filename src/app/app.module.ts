import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { BusinessBroadbandComponent } from './Components/business-broadband/business-broadband.component';
import { FibernetBroadbandComponent } from './Components/fibernet-broadband/fibernet-broadband.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SpeedtestComponent } from './Components/speedtest/speedtest.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DatePipe } from '@angular/common';
import { adminGuardGuard } from './guards/admin-guard.guard';
import {MatDialogModule} from '@angular/material/dialog';
import { SuccessPopupComponent } from './Components/success-popup/success-popup.component';
import { FormPopComponent } from './Components/form-pop/form-pop.component';
import { AuthService } from './Components/Services/auth.service';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { VarifyOtpComponent } from './Components/varify-otp/varify-otp.component';
import { UpdatepasswordComponent } from './Components/updatepassword/updatepassword.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { pipe } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { PlansComponent } from './Components/plans/plans.component';
import { BuyPlanComponent } from './Components/buy-plan/buy-plan.component';
import { DeletedialogComponent } from './Components/deletedialog/deletedialog.component';
import { ResetdialogComponent } from './Components/resetdialog/resetdialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuyBusinessplanComponent } from './Components/buy-businessplan/buy-businessplan.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    BusinessBroadbandComponent,
    FibernetBroadbandComponent,
    FooterComponent,
    ForgotPasswordComponent,
    FrontPageComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
    NotFoundComponent,
    SpeedtestComponent,
    ContactUsComponent,
    RegistrationComponent,
    SuccessPopupComponent,
    FormPopComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    VarifyOtpComponent,
    UpdatepasswordComponent,

    PlansComponent,
    BuyPlanComponent,
    DeletedialogComponent,
    ResetdialogComponent,
    BuyBusinessplanComponent  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatCardModule,
    FontAwesomeModule
 
    

 
 
  ],
  providers: [
    DatePipe,
    AuthService,
   
    
  
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
