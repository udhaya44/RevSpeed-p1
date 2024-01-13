import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userData:any;
  constructor(public dialog: MatDialog, private auth:AuthService){
 
    this.auth.getUserDetails().subscribe(data=>{
      this.userData=data;
      console.log(this.userData);
      
    })
  }
  openDialog() {
    this.dialog.open(UpdateProfileComponent);
  }

}
