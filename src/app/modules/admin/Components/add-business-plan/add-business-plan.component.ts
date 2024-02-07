import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = this.formbuilder.group({
      planName: ['', [Validators.required]],
      datalimit: ['', [Validators.required]],
      bandWidth: ['', [Validators.required]],
      validity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    if (data && data.plan) {
      // If editing, populate the form with plan details
      this.formData.patchValue({
        planName: data.plan.planName,
        datalimit: data.plan.dataLimit,
        bandWidth: data.plan.speed,
        validity: data.plan.validity,
        price: data.plan.price,
      });
    }
  }

  get formControls() {
    return this.formData.controls;
  }

  submitForm() {
    if (this.formData.valid) {
      if (this.data && this.data.plan) {
        // Editing existing plan
        this.adminservice.updateBusinessPlan(this.data.plan.id, this.formData.value).subscribe(
          (response: any) => {
            console.log('Form data updated successfully:', response);
            this.showSuccessPopup();
            this.closeForm();
          },
          (error: any) => {
            console.error('Error updating form data:', error);
          }
        );
      } else {
        // Adding new plan
        this.adminservice.submitbusinessForm(this.formData.value).subscribe(
          (response: any) => {
            console.log('Form data submitted successfully:', response);
            this.showSuccessPopup();
            this.closeForm();
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
