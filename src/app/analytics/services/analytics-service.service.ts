import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsDriverService {
  private apiUrl = 'https://jdu202012207.github.io/pruebas-api/analytics-drivers.json';

  constructor(private http: HttpClient) {}

  getAnalyticsDrivers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
