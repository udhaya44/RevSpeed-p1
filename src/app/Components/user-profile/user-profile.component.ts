import { Component } from '@angular/core';
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
export class UserProfileComponent {
  userData:any;
  constructor(public dialog: MatDialog, private auth:AuthService){
 
    this.auth.getUserDetails().subscribe(data=>{
      this.userData=data;
      console.log(this.userData);
      
    })
  }
  // openDialog() {
  //   this.dialog.open(UpdateProfileComponent);
  // }

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
    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {

        // this.sessionService.setUser(updatedUser);
      }
      (error: any) => {
        console.log(error);
      };
    });
  }

}
