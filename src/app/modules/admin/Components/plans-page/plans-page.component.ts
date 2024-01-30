import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { AddPlanAdminComponent } from '../add-plan-admin/add-plan-admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddBusinessPlanComponent } from '../add-business-plan/add-business-plan.component';

interface Plan {
  id: number;
  data_limit: string;
  planName: string;
  plan_type: string;
  price: number;
  speed: string;
  validity: string;
  service_id: number;
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
  displayedColumns: string[] = ['id', 'planName', 'data_limit', 'speed', 'validity', 'price', 'actions'];
  planTypeToggle:string = 'broadband';
  constructor(private adminservice: AdminService,
    public dialog: MatDialog, private cdr: ChangeDetectorRef) {
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
    const confirmDelete = confirm(`Are you sure you want to delete the plan "${plan.planName}"?`);

    if (confirmDelete) {
      let deleteService: Observable<any> | undefined;

      if (this.planTypeToggle === 'business') {
        deleteService = this.adminservice.deletePlan(plan.id);
      } else if (this.planTypeToggle === 'broadband') {
        // Assuming you have a delete method in your broadband service, replace 'deleteBroadbandPlan' with the actual method name
        deleteService = this.adminservice.deleleBroadbandplan(plan.id);
      }

      if (deleteService) {
        deleteService.subscribe(
          () => {
            console.log('Plan deleted successfully!');
            // Remove the deleted plan from the dataSource
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== plan.id);
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error deleting plan:', error);
            // Handle error, show a notification, or any other appropriate action
          }
        );
      } else {
        console.error('Invalid planTypeToggle value.');
        // Handle the case where planTypeToggle is neither 'business' nor 'broadband'
      }
    }
  }

  

  editPlan(plan: Plan) {
    console.log('Editing plan:', plan);
    if (this.planTypeToggle === 'business') {
      this.dialog.open(AddBusinessPlanComponent, {
        width: '40rem',
        data: { plan } // Pass the plan details to the dialog
      });
    } else {
      this.dialog.open(AddPlanAdminComponent, {
        width: '40rem',
        height: '80vh',
        data: { plan }
      });
    }
  }

  selectPlan(planType: string): void {
    if (planType === 'business') {
      this.planTypeToggle = planType;
      this.adminservice.getBusinessPlans().subscribe((plans: any[]) => {
        this.dataSource = new MatTableDataSource(plans);
        console.log(this.dataSource);
      });
    } else {
      this.planTypeToggle = 'broadband';
      this.adminservice.getPlans().subscribe((plans: any[]) => {
        this.dataSource = new MatTableDataSource(plans);
        console.log(this.dataSource);
      });
    }
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
      
}
