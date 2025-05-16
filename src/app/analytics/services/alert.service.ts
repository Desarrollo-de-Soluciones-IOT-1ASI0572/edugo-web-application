import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Alert} from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = 'https://edugo-data.free.beeceptor.com/alerts';

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<Alert[]>{
    return this.http.get<Alert[]>(this.baseUrl);
  }
}
