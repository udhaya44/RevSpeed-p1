import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-varify-otp',
  templateUrl: './varify-otp.component.html',
  styleUrl: './varify-otp.component.scss'
})
export class VarifyOtpComponent implements OnInit{
  otp:String = "";
  sendOtp: any;
  constructor(private router:Router){console.log(this.otp);

    
    // this.sendOtp=localStorage.getItem("otp");
    
  }

  ngOnInit(): void {
   
    
    console.log("reandom genrated otp in varify otp",this.sendOtp);
    
  }

  preOtp:any;
  getOtp(){
    this.preOtp=sessionStorage.getItem('otp');
    console.log("enter otp",this.otp);
    console.log("genrated otp",this.sendOtp);
    
    if(this.otp==this.preOtp){
      this.router.navigate(["/update-password"]);
      console.log("Otp match");
    }else{
      console.log("no");
      
    }
    
  }
 
 


}
