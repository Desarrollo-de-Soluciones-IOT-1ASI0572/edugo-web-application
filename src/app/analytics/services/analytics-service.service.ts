import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsDriverService {
  private apiUrl = 'http://localhost:8080/api/analytics/dashboard';

  constructor(private http: HttpClient) {}

  getAnalyticsByDriverId(driverId: number): Observable<any> {
    const url = `${this.apiUrl}/${driverId}`;
    return this.http.get<any>(url);
  }
}
