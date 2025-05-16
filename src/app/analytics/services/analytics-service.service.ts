import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Analytics} from '../models/analytics.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {


  private baseUrl = 'http://localhost:3000/dailyVehicleAnalytics';

  constructor(private http: HttpClient) { }

  getAnalytics(): Observable<Analytics[]>{
    return this.http.get<Analytics[]>(this.baseUrl);
  }
}
