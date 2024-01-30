import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../user-services/dashboard.service';

@Component({
  selector: 'app-user-ongoing-plans',
  templateUrl: './user-ongoing-plans.component.html',
  styleUrl: './user-ongoing-plans.component.scss'
})
export class UserOngoingPlansComponent implements OnInit {
  planispresent=false;
  UserPlansData: any[] = [];
  oneUser:any;
  constructor(private dashService:DashboardService){}
  id= localStorage.getItem("userId");
  ngOnInit(): void {
    this.dashService.getUserAllPlansDetails(this.id).subscribe(data=>{
      this.UserPlansData=data;
      console.log(this.UserPlansData[0]);
       this.oneUser=this.UserPlansData[0];
       if(this.UserPlansData[0]){
         this.planispresent=true;
       }else{
        this.planispresent=false;
       }
      
    })
    throw new Error('Method not implemented.');
  }




}
