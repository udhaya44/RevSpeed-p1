import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
   private auth:AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.formControls['email'].value;
      console.log(email);
      

      this.auth.sendPasswordResetEmail(email).subscribe(
        (response) => {
          console.log('Password reset email sent successfully.');
        },
        (error) => {
          console.error('Error sending password reset email:', error);
        }
      );
    }
  }

}
