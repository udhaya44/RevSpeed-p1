import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { AddPlanAdminComponent } from '../add-plan-admin/add-plan-admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddBusinessPlanComponent } from '../add-business-plan/add-business-plan.component';

interface Plan {
  planId: string;
  planName: string;
  datalimit: string;
  bandWidth: string;
  validity: string;
  price: string;
  otts?: {
    AmazonPrime: boolean;
    Hotstar: boolean;
    Netflix: boolean;
    Zee5: boolean;
    aha: boolean;
  };
  planCategory: string;
}

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  styleUrl: './plans-page.component.scss'
})
export class PlansPageComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Plan>;
  displayedColumns: string[] = ['planId', 'planName', 'datalimit', 'bandWidth', 'validity', 'price', 'actions'];
  planTypeToggle:string = 'broadband';
  constructor(private adminservice: AdminService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Plan>();
  }

  ngOnInit(): void {
    // Set default plans
    this.selectPlan('business');
  }

  openDialog() {
    console.log("inside open dialogue");

    if (this.planTypeToggle === 'business') {
      this.dialog.open(AddBusinessPlanComponent, {
        width: '40rem',
      });
    } else {
      this.dialog.open(AddPlanAdminComponent, {
        width: '40rem',
        height: '80vh'
      });
    }
  }


  deletePlan(plan: Plan) {
    console.log('Deleting plan:', plan);
    // Implement your delete logic here
  }

  editPlan(plan: Plan) {
    console.log('Editing plan:', plan);
    // Implement your edit logic here
  }

  selectPlan(planType: string): void {
    if (planType === 'business') {
      this.planTypeToggle = planType;
      this.adminservice.getBusinessPlans().subscribe((plans: any[]) => {
        this.dataSource = new MatTableDataSource(plans);
      });
    } else {
      this.planTypeToggle = 'broadband';
      this.adminservice.getPlans().subscribe((plans: any[]) => {
        this.dataSource = new MatTableDataSource(plans);
      });
    }
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
      
}
