import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrl: './deletedialog.component.scss'
})
export class DeletedialogComponent {


  constructor(private auth :AuthService,
    public dialogRef: MatDialogRef<DeletedialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  id:any;


  onYesClick(): void {
  console.log("hi");
  
    this.auth.deleteUserById(this.id).subscribe((data)=>{
      console.log("user deleted with id",this.id);
      
    })
    
    this.dialogRef.close(true);
  }

}
