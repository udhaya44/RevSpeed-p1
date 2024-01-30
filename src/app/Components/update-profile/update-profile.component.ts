import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';
import { ResetdialogComponent } from '../resetdialog/resetdialog.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  existingData: any;

  constructor(private auth:AuthService,private dialogRef: MatDialogRef<ResetdialogComponent>){}

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
    
    // this.auth.updateUserProfile(this.userId,this.myGroup.value).subscribe((data)=>{
    //   console.log(data);
      
    // })
    console.log(this.myGroup.value);
    
    // Add your update profile logic here
    // You can access the updated values using this.myGroup.value
    this.dialogRef.close();

}




}
