import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<any> {
    return this.http.get('/incidents');
  }
}
