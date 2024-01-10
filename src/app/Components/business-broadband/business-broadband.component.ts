import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPopComponent } from '../form-pop/form-pop.component';

@Component({
  selector: 'app-business-broadband',
  templateUrl: './business-broadband.component.html',
  styleUrl: './business-broadband.component.scss'
})
export class BusinessBroadbandComponent {
  constructor(public dialog: MatDialog) {}
  
    openDialog() {
      this.dialog.open(FormPopComponent);
    }

}
