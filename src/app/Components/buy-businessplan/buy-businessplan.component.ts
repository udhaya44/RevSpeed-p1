import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BuyPlanComponent } from '../buy-plan/buy-plan.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-businessplan',
  templateUrl: './buy-businessplan.component.html',
  styleUrl: './buy-businessplan.component.scss'
})
export class BuyBusinessplanComponent {

  businessplanId=sessionStorage.getItem("broadbandPlandid");
  loginuserId=localStorage.getItem("userId");
  // You may need to add necessary properties and methods here

  constructor(private snackBar: MatSnackBar,public router:Router, public auth:AuthService, public dialogRef: MatDialogRef<BuyBusinessplanComponent>) { }


  Businessplandlinkdata = {
    broadbandPlans: null,
    businessPlans: {
      id: this.businessplanId

    },
    user: {
      userId: this.loginuserId
    },
    subscriptionStartDate: this.getCurrentDate(),
    businessIsActive: true
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
      this.auth.purchesBroadbandPlan(this.Businessplandlinkdata).subscribe((data)=>{
        console.log(data);   
        this.openSnackBar();
      })
    }
    else{
      this.router.navigate(["/login"])

    }

    
   


    this.closeDialog();
  }

  openSnackBar() {
    this.snackBar.open('Registration success', 'close', {
      duration: 3000,
    });
  }



}
