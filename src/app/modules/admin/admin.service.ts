import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private plansUrl = ' http://localhost:3000/plans'; 

  constructor(private http: HttpClient) {}

  //get-all-plans
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(this.plansUrl);
  }

  //add-form submit
  submitForm(formData: any): Observable<any> {
    return this.http.post(this.plansUrl, formData);
  }
}
