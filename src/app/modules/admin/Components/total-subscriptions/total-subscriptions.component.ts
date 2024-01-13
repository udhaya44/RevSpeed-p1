// total-subscriptions.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-total-subscriptions',
  templateUrl: './total-subscriptions.component.html',
  styleUrls: ['./total-subscriptions.component.scss']
})
export class TotalSubscriptionsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'phone', 'email', 'userplanStatus', 'userplanid'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadSubscriptionData();
  }

  loadSubscriptionData() {
    this.adminService.getActiveSubscriptions().subscribe(
      (subscriptions: any[]) => {
        this.dataSource = new MatTableDataSource(subscriptions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error loading subscription data:', error);
      }
    );
  }

}
