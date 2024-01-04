import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './Components/registration/registration.component';
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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
