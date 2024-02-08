import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { AuthService } from '../Services/auth.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { ResetdialogComponent } from '../resetdialog/resetdialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userData:any;
  constructor(public dialog: MatDialog, private auth:AuthService){
   
   
  }
  ngOnInit(): void {
    this.userDatamethod();
    throw new Error('Method not implemented.');
  }
  // openDialog() {
  //   this.dialog.open(UpdateProfileComponent);
  // }

  userDatamethod(){
    this.auth.getUserDetails().subscribe(data=>{
      this.userData=data;
      console.log(this.userData);
      
    })
  }

  user: any;

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DeletedialogComponent, {
      width: '25%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogReset(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(ResetdialogComponent, {
      width: '25%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogUpdate(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '25%',
      data: { ...this.user },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.profileUpdated.subscribe(() => {
      console.log("data updated when dialog close");
      
      this.userDatamethod(); // Update user data when profile is updated
    });
  }

}
