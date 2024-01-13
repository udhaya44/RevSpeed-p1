import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
