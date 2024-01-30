import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from '../../Components/Services/auth.service';
interface Plan {
  id?: number;
  data_limit: string;
  planName: string;
  plan_type: string;
  price: number;
  speed: string;
  validity: number;
  service_id: number;
  ott?: { ottName: string }[];
}

export interface BusinessPlanPayload {
  id?:number;
  planName: string;
  planType: string;
  price: string;
  speed: string;
  validity: number;
  dataLimit:string;
  service: {
    id: number; // Provide the correct ID of the Service you want to associate
    serviceName: string;
  };
}
export interface BroadbandPlanPayload {
  id?: number;
  planName: string;
  planType: string;
  price: number;
  speed: string;
  dataLimit: string;
  validity: number;
  service: {
    id: number;
    serviceName: string;
  };
  ott?: { ottName: string }[]; // Add ott property to the interface
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8081/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}


  //get-broadband-plans
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/broadbandplans/GetAllBroadBandPlanswithott`, { headers: this.authService.createAuhtorizationHeader() || {}});
  }
  
   //get-business-plans
  getBusinessPlans(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/businessplans/getbusinessplans`, { headers: this.authService.createAuhtorizationHeader() || {}});

  }

  getAllPlans(): Observable<{ plans: Plan[], businessPlans: Plan[] }> {
    const plans$ = this.getPlans();
    const businessPlans$ = this.getBusinessPlans();
  
    return forkJoin({ plans: plans$, businessPlans: businessPlans$ });
  }

  //get plan by id
  getPlanById(planId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}plans/${planId}`);
  }

  getAllUsers():Observable<any[]> {
    const token = this.authService.getToken();
    // Include the token in the request headers
  
    return this.http.get<any[]>(`${this.apiUrl}/getUsers`,{ headers: this.authService.createAuhtorizationHeader() || {}
    });
  }

  deletePlan(planId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/businessplans/deletePlan/${planId}`, { headers: this.authService.createAuhtorizationHeader() || {} });
  }

  deleleBroadbandplan(planId:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8081/broadbandplans/deletePlan/${planId}`, { headers: this.authService.createAuhtorizationHeader() || {} });
  }
  
  //add-form submit for plans
  submitbroadbandForm(formData: any): Observable<any> {
    const requestPayload: BroadbandPlanPayload = {
      planName: formData.planName,
      planType: this.getPlanType(formData.validity),
      price: parseFloat(formData.price), // Assuming price is a number
      speed: formData.bandWidth,
      dataLimit: formData.datalimit,
      validity: formData.validity,
      service: {
        id: 1, // Provide the correct ID of the Service you want to associate
        serviceName: 'broadband'
      },
      ott: this.extractSelectedOTTs(formData.otts) // Extract selected OTTs
    };
    console.log(requestPayload);
    return this.http.post('http://localhost:8081/broadbandplans/add', requestPayload);
  }

  extractSelectedOTTs(otts: { [key: string]: boolean }): { ottName: string }[] {
    return Object.entries(otts)
      .filter(([ottName, isSelected]) => isSelected)
      .map(([ottName]) => ({ ottName }));
  }

  //add business plan 
  submitbusinessForm(formData: any): Observable<any> {
    const requestPayload: BusinessPlanPayload = {
      planName: formData.planName,
      planType: this.getPlanType(formData.validity), // Assuming getPlanType returns a string
      price: formData.price,
      speed: formData.bandWidth,
      validity: formData.validity,
      dataLimit:formData.datalimit,
      service: {
        id: 2, // Provide the correct ID of the Service you want to associate
        serviceName: 'Business'
      }
    };

    console.log(requestPayload);

    return this.http.post('http://localhost:8081/businessplans/addBusinessplan', requestPayload);
  }

  private getPlanType(validity: number): string {
    if (validity <= 30) {
      return 'MONTHLY';
    } else if (validity <= 90) {
      return 'QUARTERLY';
    } else {
      return 'YEARLY';
    }
  }

  // Update an existing business plan
  updateBusinessPlan(planId: number, formData: any): Observable<any> {
    const requestPayload: BusinessPlanPayload = {
      id: planId,
      planName: formData.planName,
      planType: this.getPlanType(formData.validity),
      price: formData.price,
      speed: formData.bandWidth,
      validity: formData.validity,
      dataLimit: formData.datalimit,
      service: {
        id: 2, // Provide the correct ID of the Service you want to associate
        serviceName: 'Business'
      }
    };

    return this.http.put(`http://localhost:8081/businessplans/updatePlan/${planId}`, requestPayload
    );
  }

  //get active subscribers
    getActiveSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/admin/getactivesub`, { headers: this.authService.createAuhtorizationHeader() || {} });
  }

  //get chart details 
  getPieChartDetails(): Observable<any> {
    const plans$ = this.getPlans();
    const users$ = this.getAllUsers();

    return forkJoin([plans$, users$]).pipe(
      map(([plans, users]) => {
        return { plans, users };
      })
    );
  }
 
}