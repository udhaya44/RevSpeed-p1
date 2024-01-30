import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resetdialog',
  templateUrl: './resetdialog.component.html',
  styleUrl: './resetdialog.component.scss'
})
export class ResetdialogComponent {
  constructor(private auth :AuthService,private dialogRef: MatDialogRef<ResetdialogComponent>){}
  newPassword: string = '';
  confirmPassword: string = '';

  id:any;
  

  resetPassword() {
    this.id=localStorage.getItem("userId");
    console.log("user id is to update pass",this.id);
    console.log(this.newPassword);
    
    
    this.auth.updatePasswordAfterLogin(this.id,this.newPassword).subscribe((data)=>{
      console.log(data);
     
      
    })

    this.dialogRef.close();
  }

}
