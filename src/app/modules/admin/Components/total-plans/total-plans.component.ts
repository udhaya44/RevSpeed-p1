// total-plans.component.ts

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlanAdminComponent } from '../add-plan-admin/add-plan-admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';

interface Plan {
  id?: number;
  data_limit: string;
  planName: string;
  plan_type: string;
  price: number | string;
  speed: string;
  validity: number;
  service?: {
    id: number;
    serviceName: string;
  };
  ott?: {
    id?: number,
    ottName?: string }[];
}

@Component({
  selector: 'app-total-plans',
  templateUrl: './total-plans.component.html',
  styleUrls: ['./total-plans.component.scss']
})
export class TotalPlansComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Plan>;
  displayedColumns: string[] = ['planName', 'data_limit', 'speed', 'validity', 'price'];
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private adminService: AdminService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Plan>();
  }

  initializeComponent() {
    this.fetchPlans();
  }

  ngOnInit() {
    this.initializeComponent();
  }

  fetchPlans() {
    this.adminService.getAllPlans().subscribe(
      (data: { plans?: Plan[], businessPlans?: Plan[] }) => {
        console.log("all plans", data);
  
        // Separate business plans and broadband plans
        let businessPlans: Plan[] = [];
        let broadbandPlans: Plan[] = [];
  
        // Add business plans
        if (data.businessPlans) {
          businessPlans = data.businessPlans;
        }
  
        // Add broadband plans
        if (data.plans) {
          broadbandPlans = data.plans;
        }
        // Merge business plans and broadband plans
        const allPlans: Plan[] = businessPlans.concat(broadbandPlans);
  
        console.log("all plans after merging", allPlans);
  
        // Assuming you want to display all plans by default
        this.updateDataSource(allPlans);
      },
      (error) => {
        console.error('Error fetching plans:', error);
        // Handle error, show a notification, or any other appropriate action
      }
    );
  }
  
  

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  private updateDataSource(data: Plan[]) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
  }

  openDialog() {
    console.log("inside open dialogue");
    this.dialog.open(AddPlanAdminComponent, {
      width: '40rem',
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
