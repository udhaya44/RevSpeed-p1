import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuyPlanComponent } from '../buy-plan/buy-plan.component';
import { AuthService } from '../Services/auth.service';
import { MatCardModule } from '@angular/material/card';

export interface Card {
  id:number;
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
  action:string;
}
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {

  input: any;

  plansData:any;
  
  displayedColumns: string[] = ['id', 'planName', 'datalimit', 'bandWidth', 'validity', 'price','ott','action'];
  
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
   
    constructor(private _dialog: MatDialog,private auth:AuthService,private cdr:ChangeDetectorRef,private changeDetectorRef: ChangeDetectorRef,public dialog: MatDialog) {}
    ngOnInit(): void {
      this.getAllBroadbandplans();
  
      this.cdr.detectChanges();
    }
    // getOttKeys(otts: any): string[] {
    //   return Object.keys(otts);
    // }
    getTrueOttKeys(otts: any): string[] {
      return Object.keys(otts).filter(key => otts[key]);
    }
  
    
    getAllBroadbandplans(){
       this.auth.getAllBroadbandplans().subscribe(data=>{
        this.plansData=data;
        console.log(this.plansData);
        this.dataSource = new MatTableDataSource(this.plansData);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRef.detectChanges();
       
       })
    }
  
   
  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:any): void {
      sessionStorage.setItem("broadbandPlandid",id);

      this.dialog.open(BuyPlanComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    
  
    
    
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    // deleteEmployee(id:number){
    //   this._empService.deleteEmployee(id).subscribe({
    //     next:(res)=>{
    //       alert("employee deleted");
  
    //     },
    //     error:console.log,
    //   });
    // }
}
