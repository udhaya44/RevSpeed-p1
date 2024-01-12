  import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Type } from '@angular/core';
import { TotalPlansComponent } from '../total-plans/total-plans.component';
import { TotalUsersComponent } from '../total-users/total-users.component';
import { TotalSubscriptionsComponent } from '../total-subscriptions/total-subscriptions.component';
  
  @Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
  })
  

  
  export class AdminDashboardComponent implements OnInit  {  
    

    ngOnInit() {
      this.loadComponent("plans");
    }

    @ViewChild('componentContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }
  
    loadComponent(componentName: string) {
      // Dynamically load the corresponding child component
      let component : Type<any> | undefined;
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
      // Check if component is defined before proceeding
      if (component) {
        // Clear existing component and load the new one
        this.container.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.container.createComponent(componentFactory);
      }
    }


  }
