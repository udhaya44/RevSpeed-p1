// total-users.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.scss']
})
export class TotalUsersComponent implements OnInit {
  filterControl = new FormControl();
  displayedColumns: string[] = ['id', 'username', 'phone', 'email', 'userStatus'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  
  loadUserData() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFindFilter() {
    const filterValue = this.filterControl.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}