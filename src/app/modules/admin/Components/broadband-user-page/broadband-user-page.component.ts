import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-broadband-user-page',
  templateUrl: './broadband-user-page.component.html',
  styleUrl: './broadband-user-page.component.scss'
})
export class BroadbandUserPageComponent {

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
      const broadbandUsers = data.filter(user => user.broadBandUser === true);
      this.dataSource = new MatTableDataSource(broadbandUsers);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFindFilter() {
    const filterValue = this.filterControl.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
