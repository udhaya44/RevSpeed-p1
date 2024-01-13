import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Email{
  toMail:string[]=[];
  subject:string | undefined;
  message:string | undefined;
  
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  // myGroup: FormGroup;
  passwordFormControl: any;
  confirmPasswordFormControl: any;
  emaildata: Email;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.passwordFormControl = this.myGroup.get('password');
    this.confirmPasswordFormControl = this.myGroup.get('confirmPassword');
    this.emaildata = new Email();
  
  }
 
  myGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.createPasswordStrengthValidator,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
  });

  get formControls() {
    return this.myGroup.controls;
  }

 ifEmailExist(){
  
 }
  
  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      // const hasSpecial=/[]

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.controls['password'];
    const confirmPassword = formGroup.controls['confirmPassword'];
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchPassword: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Define the phone number format (10 digits)
    const value = control.value;

    if (value && !phonePattern.test(value)) {
      return { phoneNumber: true }; // Return an error object if the input is invalid
    }

    return null; // Return null if the input is valid
  }

  UserData: any;

  toMail:string[]=[];

  message:string | undefined;

 
  
  onSubmit() {

    console.log(this.myGroup.value);
    this.auth.registerNewUser(this.myGroup.value).subscribe((response) => {
      this.UserData = response;

      this.UserData.toMail=[this.UserData.email];
      this.UserData.subject="Registration successful - Welcome to Revspeed"; 
      this.UserData.message=`Hi ${this.UserData.firstName},  We are delighted to inform you that your registration on RevSpeed was successful! Welcome to our community.`
      console.log('this is user data', this.UserData);
      console.log(this.emaildata);
      this.auth.sendEmailForRegisteration(this.UserData).subscribe(data=>{
          console.log("mail send succesfully");
          
      })
      this.openSnackBar();
      this.router.navigate(['/login']);
    });
  }

  openSnackBar() {
    this.snackBar.open('Registration success', 'close', {
      duration: 3000,
    });
  }
}
