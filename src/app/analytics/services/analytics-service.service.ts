import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverAnalytics } from '../models/driver-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {
  private baseUrl = 'http://localhost:8080/api/analytics/dashboard';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAnalyticsByDriverId(driverId: number): Observable<DriverAnalytics> {
    const headers = this.getAuthHeaders();
    return this.http.get<DriverAnalytics>(`${this.baseUrl}/${driverId}`, { headers });
  }
}
