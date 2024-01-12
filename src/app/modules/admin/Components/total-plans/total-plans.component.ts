import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlanAdminComponent } from '../add-plan-admin/add-plan-admin.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface Card {
  title: string;
  subtitle: string;
  text: string;
  plan: Plan;
}

  interface Plan {
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
  }

@Component({
  selector: 'app-total-plans',
  templateUrl: './total-plans.component.html',
  styleUrl: './total-plans.component.scss'
})
export class TotalPlansComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    obs!: Observable<any>;
    dataSource: MatTableDataSource<Card>;
  
    constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private adminService: AdminService, // Inject your AdminService
      public dialog: MatDialog  // Inject MatDialog
    ) {
      this.dataSource = new MatTableDataSource<Card>();
    }
  
    ngOnInit() {
      this.adminService.getPlans().subscribe((plans: Plan[]) => {
        const cards: Card[] = plans.map(plan => ({
          title: plan.planName,
          subtitle: 'Plan Details',
          text: `Data Limit: ${plan.datalimit}, Speed: ${plan.bandWidth}, Validity: ${plan.validity}, Price: ${plan.price}`,
          plan: plan
        }));
        this.dataSource.data = cards;
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
    }
  
    ngOnDestroy() {
      if (this.dataSource) { 
        this.dataSource.disconnect(); 
      }
    }

    openDialog() {
      console.log("inside open dialogue")
      this.dialog.open(AddPlanAdminComponent, {
        width: '40rem',
      });
    }
}
