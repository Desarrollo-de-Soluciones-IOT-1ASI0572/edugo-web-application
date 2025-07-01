import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incident {
  detour: boolean;
  lateness: boolean;
  speeding: boolean;
}

export interface LogEntry {
  id: number;
  driverUserId: number;
  date: string;
  arrivalTimeAtSchool: string;
  returnTimeHome: string;
  speed: number;
  incident: Incident;
}

@Injectable({ providedIn: 'root' })
export class LogsService {
  private logsUrl = 'http://localhost:8080/api/analytics/logs';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLogs(): Observable<LogEntry[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<LogEntry[]>(this.logsUrl, { headers });
  }
}
