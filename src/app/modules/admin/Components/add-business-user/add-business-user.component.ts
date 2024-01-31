// Inside your add-business-user.component.ts file
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../../../Components/success-popup/success-popup.component';

@Component({
  selector: 'app-add-business-user',
  templateUrl: './add-business-user.component.html',
  styleUrls: ['./add-business-user.component.scss']
})
export class AddBusinessUserComponent {
  formData: FormGroup;

  constructor(
    private adminservice: AdminService,
    private dialogRef: MatDialogRef<AddBusinessUserComponent>,
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      isBroadBandUser: [false],
      isBusinessUser: [true],

    });
    if (data && data.user) {
      // If editing, populate the form with user details
      this.formData.patchValue({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phoneNo: data.user.phoneNo,
        password: 'invalid', // Assuming you do not want to display the password in the form for editing
        address: data.user.address,
        isBroadBandUser: false,
        isBusinessUser: true,
      });
    }
  }

  get formControls() {
    return this.formData.controls;
  }

  submitForm() {
    console.log('form data',this.formData);
    if (this.formData.valid) {
      if (this.data && this.data.user) {
        // Editing existing user
        this.adminservice.updateBusinessUser(this.data.user.userId , this.formData.value).subscribe(
          (response: any) => {
            console.log('Form data updated successfully:', response);
            this.showSuccessPopup();
            this.closeForm();
            this.adminservice.notifyUserUpdate('success');
          },
          (error: any) => {
            console.error('Error updating form data:', error);
          }
        );
      } else {
        // Adding new user
        this.adminservice. addBusinessUser(this.formData.value).subscribe(
          (response: any) => {
            console.log('Form data submitted successfully:', response);
            this.showSuccessPopup();
            this.closeForm();
            this.adminservice.notifyUserUpdate('success');
          },
          (error: any) => {
            console.error('Error submitting form data:', error);
          }
        );
      }
    } else {
      console.error("Form is invalid");
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
