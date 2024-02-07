import { Component } from '@angular/core';
import { AuthService } from '../../../../Components/Services/auth.service';




export interface history{
 
  businessIsActive:number;
  broadbandActive:number;
subscriptionEndDate:string;
subscriptionStartDate:string;
broadbandPlans:plan;
businessPlans:plan;
planshow:plan;
 
}

export interface plan
{
  id:number;
  dataLimit:string;
  planName:string;
  planType:string;
  price:number;
  speed:string;
  validity:number;
  service:service;
 
}

export interface service{
  id:number;
  serviceName:string;
}
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.scss',

})
export class UserHistoryComponent {
  hist:any;
  plandet?:plan;

 constructor(public auth:AuthService){}

 ngOnInit()
 {
   const idstring=localStorage.getItem("userId");

   this.auth.getUserAllPlansDetaiils(idstring).subscribe((data)=>{
     this.hist=data;
     for (const item of this.hist) {
  
       if(item.broadbandPlans != null)
     {
     item.planshow=item.broadbandPlans;

     }else if(item.businessPlans != null){
       item.planshow=item.businessPlans;
      
    
   }
  
  }
     console.log(this.hist,"business plans");
    })
 }

}
