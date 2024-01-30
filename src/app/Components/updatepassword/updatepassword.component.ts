import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { log } from 'console';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss'
})
export class UpdatepasswordComponent implements OnInit {
  myForm:any;
  constructor(private auth:AuthService){
    this.myForm=new FormGroup({
      newpassword:new FormControl('',Validators.required),
      confirmnewpassword:new FormControl('',Validators.required)
    })
  }
  ngOnInit(): void {
    this.updatePassword();
    throw new Error('Method not implemented.');
  }

 
  fpemail=sessionStorage.getItem("forgotpassword-email")

  get formControls() {
    return this.myForm.value;
  }

    updatePassword(){
      console.log(this.formControls.newpassword,this.formControls.confirmnewpassword);
      
      if(this.formControls.newpassword === this.formControls.confirmnewpassword){
        this.auth.updatePassword(this.fpemail,this.formControls.newpassword)
        console.log(this.fpemail,this.formControls.newpassword);
        
        console.log("password update sucessfully");
      
        
      }else{
        console.log("password does not match");
          
      }
  
    
  }
}
