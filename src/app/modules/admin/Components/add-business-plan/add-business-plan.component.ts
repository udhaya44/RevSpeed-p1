import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../../../Components/success-popup/success-popup.component';

@Component({
  selector: 'app-add-business-plan',
  templateUrl: './add-business-plan.component.html',
  styleUrl: './add-business-plan.component.scss'
})
export class AddBusinessPlanComponent {
  formData: FormGroup;

  constructor(
    private adminservice: AdminService,
    private dialogRef: MatDialogRef<AddBusinessPlanComponent>,
    private dialog: MatDialog,
    private formbuilder: FormBuilder
  ) {
    this.formData = this.formbuilder.group({
      planName: ['', [Validators.required]],
      datalimit: ['', [Validators.required]],
      bandWidth: ['', [Validators.required]],
      validity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  submitForm() {
    if (this.formData.valid) {
      this.adminservice.submitForm(this.formData.value).subscribe(
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
