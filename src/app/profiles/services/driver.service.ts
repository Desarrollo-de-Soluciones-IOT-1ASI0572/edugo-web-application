import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = 'https://jdu202012207.github.io/pruebas-api/drivers.json';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http
      .get<Driver[]>(this.apiUrl)
      .pipe(map((data: any[]) => data.map((item) => new Driver(item))));
  }
}
