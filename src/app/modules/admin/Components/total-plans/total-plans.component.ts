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
  selector: 'app-total-plans',
  templateUrl: './total-plans.component.html',
  styleUrls: ['./total-plans.component.scss']
})
export class TotalPlansComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Plan>;
  displayedColumns: string[] = ['planId', 'planName', 'datalimit', 'bandWidth', 'validity', 'price', 'actions'];

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
    this.adminService.getPlans().subscribe((plans: Plan[]) => {
      console.log("all plans", plans);
      this.updateDataSource(plans);
    });
  }

  deletePlan(plan: Plan) {
    console.log('Deleting plan:', plan);
    // Implement your delete logic here
  }

  editPlan(plan: Plan) {
    console.log('Editing plan:', plan);
    // Implement your edit logic here
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
