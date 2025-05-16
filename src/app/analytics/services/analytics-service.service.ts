import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverAnalytics } from '../models/driver-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {
  private apiUrl = 'https://jdu202012207.github.io/pruebas-api/analytics-drivers.json';

  constructor(private http: HttpClient) { }

  getDriverAnalytics(): Observable<DriverAnalytics[]> {
    return this.http.get<DriverAnalytics[]>(this.apiUrl);
  }
}
