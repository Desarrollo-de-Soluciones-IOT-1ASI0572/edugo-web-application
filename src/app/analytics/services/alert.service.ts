import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Alert} from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = 'http://localhost:3000/alerts';

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<Alert[]>{
    return this.http.get<Alert[]>(this.baseUrl);
  }
}
