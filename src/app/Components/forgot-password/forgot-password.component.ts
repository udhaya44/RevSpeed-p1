import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VarifyOtpComponent } from '../varify-otp/varify-otp.component';
import { log } from 'console';



export class Email{
  toMail:any;
  
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    ismailsend:boolean | undefined;
  forgotPasswordForm: FormGroup;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
   private auth:AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.emailData=new Email();
   
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  // toMail:string[]=[];

  // message:string | undefined;
  isuserpresent=false;
  emailData:any;
  randomNumber:number |undefined;
  emailispresent:any;
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.formControls['email'].value;
      console.log(email);
       this.emailData.toMail= this.formControls['email'].value;
       this.auth.isEmailPresent(this.formControls['email'].value).subscribe(response=>{
        this.emailispresent=response;
        console.log("user is present with email",this.emailispresent);  
       })  
      if(this.emailispresent){  
        console.log("Email tyuiotyui",this.emailData.toMail); 
        this.auth.sendotp(this.emailData.toMail).subscribe(
          (response) => {
            console.log(response,"return otp");
            sessionStorage.setItem('otp',response);
            this.isuserpresent=false;
            sessionStorage.setItem("forgotpassword-email",this.formControls['email'].value)  ;
            this.openDialog();
            console.log('Password reset email sent successfully.');
          },
          (error) => {
            console.error('Error sending password reset email:', error);
          }

        );
      }else{
        this.isuserpresent=true
        console.log("email does not present");
        
      }
      }
     
  }
  


  openDialog(){

    this.dialog.open(VarifyOtpComponent, {
      width: '250px',
    });
  }
}


