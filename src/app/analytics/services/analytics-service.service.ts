import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsDriverService {
  private apiUrl = 'http://localhost:8080/api/analytics/dashboard';

  constructor(private http: HttpClient) {}

  getAnalyticsByDriverId(driverId: number): Observable<any> {
    const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTAzNzMxMjQsImV4cCI6MTc1MDk3NzkyNH0.19x4_-UkupHlLvNnbLg3b7reiITi4-pJFkjoi8ccSoMFpE8zZeKeiEzBOwpgIFoS'; // ← copia aquí el token de Swagger
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${driverId}`;
    return this.http.get<any>(url, { headers });
  }
}
