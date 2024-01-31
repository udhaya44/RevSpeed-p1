import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBusinessUserComponent } from '../add-business-user/add-business-user.component';

export interface BusinessUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
  address: string;
  isBroadBandUser: boolean;
  isBusinessUser: boolean;
  role: string;
}

@Component({
  selector: 'app-business-user-page',
  templateUrl: './business-user-page.component.html',
  styleUrl: './business-user-page.component.scss'
})
export class BusinessUserPageComponent {

  filterControl = new FormControl();
  displayedColumns: string[] = ['id', 'username', 'phone', 'email', 'userStatus', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  
  loadUserData() {
    this.adminService.getAllUsers().subscribe((data) => {
      const businessUsers = data.filter(user => user.businessUser === true);
      this.dataSource = new MatTableDataSource(businessUsers);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFindFilter() {
    const filterValue = this.filterControl.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    console.log("inside open dialogue");
    const dialogRef: MatDialogRef<AddBusinessUserComponent> = this.dialog.open(AddBusinessUserComponent, {
        width: '40rem',
      }); 

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          console.log("result",result)
          // Reload data after successful addition or edit
          this.loadUserData();
        }
      });
  }

  editPlan(user: BusinessUserData) {
    console.log(user)
    const dialogRef: MatDialogRef<AddBusinessUserComponent> = this.dialog.open(AddBusinessUserComponent, {
        width: '40rem',
        data: { user } // Pass the plan details to the dialog
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          console.log("result",result)
          // Reload data after successful addition or edit
          this.loadUserData();
        }
      });
    }
}
