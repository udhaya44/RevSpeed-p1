import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';
import { ResetdialogComponent } from '../resetdialog/resetdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  existingData: any;
  @Output() profileUpdated: EventEmitter<any> = new EventEmitter<any>(); // Event emitter

  constructor(  private snackBar: MatSnackBar,private auth:AuthService,private dialogRef: MatDialogRef<ResetdialogComponent>){}

  myGroup = new FormGroup({
   
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
  });

  get formControls() {
    return this.myGroup.controls;
  }


  userId:any;
  ngOnInit(): void {
    // Assuming you have a method in your data service to get existing data
    this.auth.getUserDetails().subscribe((data) => {
      this.existingData = data;

      this.userId=this.existingData.userId;
      // Set form values based on existing data
      this.myGroup.setValue({
        firstName: this.existingData.firstName,
        lastName: this.existingData.lastName,
        // email: this.existingData.email,
        phoneNo: this.existingData.phoneNo,
        address: this.existingData.address
      });
    });
  }

  
  onSubmit() {
    console.log(this.userId,"user id ");
    
    this.auth.updateUserProfile(this.userId,this.myGroup.value).subscribe((data)=>{
      console.log(data);
      this.profileUpdated.emit();
      this.openSnackBar();  
    })
    console.log(this.myGroup.value);
    this.dialogRef.close();
}

openSnackBar() {
  this.snackBar.open('User profile Updatede ', 'close', {
    duration: 3000,
  });
}
}
