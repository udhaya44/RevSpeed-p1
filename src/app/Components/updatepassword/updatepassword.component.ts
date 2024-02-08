import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss'
})
export class UpdatepasswordComponent implements OnInit {
  myForm:any;
  constructor( private snackBar: MatSnackBar,private auth:AuthService,private router: Router){
    this.myForm=new FormGroup({
      newpassword:new FormControl('',Validators.required),
      confirmnewpassword:new FormControl('',Validators.required)
    })
  }
  userId:any;
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    // this.updatePassword();
    throw new Error('Method not implemented.');
  }

 
  fpemail=sessionStorage.getItem("forgotpassword-email")

  get formControls() {
    return this.myForm.value;
  }

    updatePassword(){
      console.log(this.formControls.newpassword,this.formControls.confirmnewpassword);
      if(this.formControls.newpassword === this.formControls.confirmnewpassword){
        this.auth.updatePassword(this.fpemail,this.formControls.newpassword).subscribe(data=>{
        console.log(this.fpemail,this.formControls.newpassword);
        
        
        console.log("password update sucessfully");
        this.router.navigate(["/login"])
        this.openSnackBar();  
        console.log("login routing working");
        
        })
        
      }else{
        console.log("password does not match");
          
      }
  
  }

  openSnackBar() {
    this.snackBar.open('User profile Updatede ', 'close', {
      duration: 3000,
    });
  }

 
}
