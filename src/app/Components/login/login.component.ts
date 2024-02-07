import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { authGuard } from '../../guards/auth.guard';

@Injectable({providedIn: 'root',})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  invalidCredentials = false;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get formControls() {
    return this.loginForm.controls;
  }
  jwtToken: any;
  onSubmit() {
    // this.auth.login(this.loginForm.value);
    console.log(this.loginForm.value);
    if (this.loginForm.value != null && this.loginForm.valid) {
      console.log('we have to sub');
      this.auth.genrateToken(this.loginForm.value).subscribe(
        (response) => {
          this.jwtToken = response;
          console.log('this is my jwt token' + this.jwtToken.jwtToken);
          localStorage.setItem('token', this.jwtToken.jwtToken);
          // this.auth.loginUser(this.jwtToken.jwtToken)
          // this.auth.isLoggedIn();

          this.getUserDetails();

          console.log( "is authenticated",this.auth.isAuthenticatedUser());
          if (this.auth.isAuthenticatedUser()) {
            // this.invalidCredentials = false; // Reset invalidCredentials if login is successful
            this.getUserDetails();
          } else {
            // this.invalidCredentials = true;
          }
          
          // this.router.navigate(['/user']);
        },
        (error) => {
          console.log(error);
          this.invalidCredentials = true;
        }
      );
    } else {
      console.log('Fields are empty');
      if (this.formControls.email.hasError('required')) {
        console.log('Email is required');
      }
      if (this.formControls.email.hasError('email')) {
        console.log('Invalid email format');
      }
      if (this.formControls.password.hasError('required')) {
        console.log('Password is required');
      }
      if (this.formControls.password.hasError('minlength')) {
        console.log('Password should be at least 6 characters long');
      }
    }
  }

  isAdmin(): boolean {
    return this.userDetails && this.userDetails.role === 'admin';
  }

  // Check if the user has the 'user' role
  isUser(): boolean {
    this.userDetails && this.userDetails.role === 'user'
    return this.userDetails && this.userDetails.role === 'user';
  }

  @Output() 
  emitEvent = new EventEmitter();
  userDetails:any;
  getUserDetails(){
    this.auth.getUserDetails().subscribe((response)=>{
      this.userDetails=response;
      this.emitEvent.next(this.userDetails);
      

      localStorage.setItem("userId",this.userDetails.userId)
      
      localStorage.setItem("userRole",this.userDetails.role)
      if(this.userDetails.role==="ADMIN"){
        this.isAdmin();
        this.router.navigate(['/admin/admin-homepage/dashboard']);
      }else{
       
      this.isUser();
        this.router.navigate(['/user']);
      }
     
      console.log(response);
      console.log("user role is :-",this.userDetails.role);
      
     

    })
  }
  
}
