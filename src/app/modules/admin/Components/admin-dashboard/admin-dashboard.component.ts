
import { Component, ComponentFactoryResolver, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Type } from '@angular/core';
import { TotalPlansComponent } from '../total-plans/total-plans.component';
import { TotalUsersComponent } from '../total-users/total-users.component';
import { TotalSubscriptionsComponent } from '../total-subscriptions/total-subscriptions.component';
import { AdminService } from '../../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})

export class AdminDashboardComponent implements AfterViewInit  {  
    
  plansCount: number = 0;
  usersCount: number = 0;
  subscriptionsCount: number = 0;
  dataSource: MatTableDataSource<any>;

  @ViewChild('componentContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private adminService: AdminService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngAfterViewInit() {
    forkJoin([
      this.adminService.getAllPlans(),
      this.adminService.getAllUsers(),
      this.adminService.getActiveSubscriptions()
    ]).subscribe(
      ([plans, users, subscriptions]) => {
        this.plansCount = plans.businessPlans.length + plans.plans.length;
        console.log('1---------',this.plansCount);
        this.usersCount = users.length;
        console.log('2---------------',this.usersCount);
        this.subscriptionsCount = subscriptions.length;
        console.log('3--------------',this.subscriptionsCount);
        this.loadComponent("plans");
      },
      error => {
        console.error('Error loading counts:', error);
      }
    );
  }

  loadComponent(componentName: string) {
    let component: Type<any> | undefined;
    switch (componentName) {
      case 'plans':
        component = TotalPlansComponent;
        break;
      case 'users':
        component = TotalUsersComponent;
        break;
      case 'subscriptions':
        component = TotalSubscriptionsComponent;
        break;
    }
    if (component) {
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.container.createComponent(componentFactory);
    }
  }
}
