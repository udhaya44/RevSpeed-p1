import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrl: './buy-plan.component.scss'
})
export class BuyPlanComponent {

  broadbandplanId=sessionStorage.getItem("broadbandPlandid");
  loginuserId=localStorage.getItem("userId");
  // You may need to add necessary properties and methods here

  constructor(public router:Router, public auth:AuthService, public dialogRef: MatDialogRef<BuyPlanComponent>) { }


  broadbandplandlinkdata = {
    broadbandPlans: {
      id: this.broadbandplanId
    },
    businessPlans: null,
    user: {
      userId: this.loginuserId
    },
    subscriptionStartDate: this.getCurrentDate(),
    broadbandActive: true
  };

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);  // Add leading zero if needed
    const day = ('0' + today.getDate()).slice(-2);  // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    console.log("todays date",this.getCurrentDate());
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  
 
  buyPlan(): void {
    localStorage.getItem("token");
    if(localStorage.getItem("token")){
      this.auth.purchesBroadbandPlan(this.broadbandplandlinkdata).subscribe((data)=>{
        console.log(data);   
      })
    }
    else{
      this.router.navigate(["/login"])

    }

    
   


    this.closeDialog();
  }



}
