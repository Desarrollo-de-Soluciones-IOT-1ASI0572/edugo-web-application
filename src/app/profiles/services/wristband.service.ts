import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wristband, CreateWristbandRequest } from '../models/wristband.model';

@Injectable({
  providedIn: 'root',
})
export class WristbandService {
  private wristbandsUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/wristbands';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createWristband(wristbandData: CreateWristbandRequest): Observable<Wristband> {
    const headers = this.getAuthHeaders();
    return this.http.post<Wristband>(this.wristbandsUrl, wristbandData, { headers });
  }

  getAllWristbands(): Observable<Wristband[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Wristband[]>(`${this.wristbandsUrl}/all`, { headers });
  }

  getWristbandById(id: number): Observable<Wristband> {
    const headers = this.getAuthHeaders();
    return this.http.get<Wristband>(`${this.wristbandsUrl}/${id}`, { headers });
  }
}
