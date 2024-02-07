import { Component, Inject } from '@angular/core';
import { SuccessPopupComponent } from '../../../../Components/success-popup/success-popup.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-plan-admin',
  templateUrl: './add-plan-admin.component.html',
  styleUrls: ['./add-plan-admin.component.scss']
})
export class AddPlanAdminComponent {

  formData: FormGroup;
  
  ottsArray = [
    { id: 'AmazonPrime', controlName: 'AmazonPrime', label: 'Amazon Prime' },
    { id: 'Hotstar', controlName: 'Hotstar', label: 'Hotstar' },
    { id: 'Netflix', controlName: 'Netflix', label: 'Netflix' },
    { id: 'Zee5', controlName: 'Zee5', label: 'Zee5' },
    { id: 'aha', controlName: 'aha', label: 'aha' }
  ];

  constructor(
    private adminservice: AdminService,
    private dialogRef: MatDialogRef<AddPlanAdminComponent>,
    private dialog: MatDialog,
    private formbuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = new FormGroup({
      planName: new FormControl('', [Validators.required]),
      datalimit: new FormControl('', [Validators.required]),
      bandWidth: new FormControl('', [Validators.required]),
      validity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      otts: this.otts,
    });

    if (data && data.plan) {
      // If editing, populate the form with plan details
      this.formData.patchValue({
        planName: data.plan.planName,
        datalimit: data.plan.dataLimit,
        bandWidth: data.plan.speed,
        validity: data.plan.validity,
        price: data.plan.price,
        otts: data.plan.otts,
      });
    }
  }
  
  otts = this.formbuilder.group({
    AmazonPrime: false,
    Hotstar: false,
    Netflix: false,
    Zee5:false,
    aha:false
  });

  get formControls() {
    return this.formData.controls;
  }

  submitForm() {
    console.log(this.formData);
    if (this.formData.valid) {
      this.adminservice.submitbroadbandForm(this.formData.value).subscribe(
        (response: any) => {
          console.log('Form data submitted successfully:', response);
          console.log(response);
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
