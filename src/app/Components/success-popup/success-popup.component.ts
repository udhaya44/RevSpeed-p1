import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.scss'
})
export class SuccessPopupComponent {

  constructor(private dialogRef: MatDialogRef<SuccessPopupComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
