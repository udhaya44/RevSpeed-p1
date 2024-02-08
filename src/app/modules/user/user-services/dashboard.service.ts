import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // private readonly baseUrl = 'http://34.30.17.215';
  private readonly baseUrl = 'http://localhost:8081';

  constructor(private http:HttpClient,private rout:Router) { }

  getUserAllPlansDetails(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userservicelink/getUserServicesDetails/${id}`);
  }
}
