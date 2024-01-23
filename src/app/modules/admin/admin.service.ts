import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = ' http://localhost:3000/'; 

  constructor(private http: HttpClient) {}

  //get-all-plans
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}plans`);
  }
  //get plan by id
  getPlanById(planId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}plans/${planId}`);
  }

  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users`);
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
