import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from '../../Components/Services/auth.service';
interface Plan {
  id: number;
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

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8081/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}


  //get-broadband-plans
  getPlans(): Observable<any[]> {
      // Obtain the token from where you stored it (local storage, service, etc.)
  const token = this.authService.getToken();
  // Include the token in the request headers
  const headers = { Authorization: `Bearer ${token}` };
  const options = { headers };
  console.log("plans header",headers);
    return this.http.get<any[]>(`${this.apiUrl}/plans`, options);
  }
  
   //get-business-plans
  getBusinessPlans(): Observable<any[]> {
    const token = this.authService.getToken();
    // Include the token in the request headers
    const headers = { Authorization: `Bearer ${token}` };
    const options = { headers };
    console.log("business plans header",headers);
    return this.http.get<any[]>(`${this.apiUrl}/businessplans`, options);
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

  //add-form submit for plans
  submitForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}plans`, formData);
  }

  //get active subscribers
    getActiveSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users?userStatus=active&userplanStatus=active`);
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