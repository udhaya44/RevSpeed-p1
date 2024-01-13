import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-form-pop',
  templateUrl: './form-pop.component.html',
  styleUrl: './form-pop.component.scss'
})
export class FormPopComponent {

  formData: FormGroup;

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<FormPopComponent>,
    private dialog: MatDialog ,
  ) {
    this.formData = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      businessName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    });
  }
  get formControls() {
    return this.formData.controls;
  }

  submitForm() {
    if (this.formData.valid) {
      this.auth.submitForm(this.formData.value).subscribe(
        (response: any) => {
          console.log('Form data submitted successfully:', response);
          this.showSuccessPopup();
          this.closeForm();
        },
        (error: any) => {
          console.error('Error submitting form data:', error);
        }
      );
    } else {
      console.error("form is invalid");
    }
  }

  closeForm() {
    // Close the dialog
    this.dialogRef.close();
  }
  showSuccessPopup() {
    // Open the success popup
    this.dialog.open(SuccessPopupComponent);
  }

}
