import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverProfile } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverProfileService {
  private profilesUrl = 'http://localhost:8080/api/v1/profiles/role/role_driver';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getDriverProfiles(): Observable<DriverProfile[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<DriverProfile[]>(this.profilesUrl, { headers });
  }
}
