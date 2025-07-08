import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, switchMap} from 'rxjs';
import { DriverAnalytics } from '../models/driver-analytics.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {
  private baseUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/analytics/dashboard';
  private tripUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/trips/completed/driver';
  private analyticsUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/analytics';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAnalyticsByDriverId(driverId: number): Observable<DriverAnalytics> {
    const headers = this.getAuthHeaders();
    return this.http.get<DriverAnalytics>(`${this.baseUrl}/${driverId}`, { headers });
  }

  syncAnalyticsLogsForDriver(driverId: number): void {
    const tripEndpoint = `${this.tripUrl}/${driverId}`;
    const logsEndpoint = `${this.analyticsUrl}/logs`;

    const headers = this.getAuthHeaders();

    this.http.get<any[]>(tripEndpoint, { headers }).pipe(
      switchMap(trips =>
        this.http.get<any[]>(logsEndpoint, { headers }).pipe(
          map(logs => ({ trips, logs }))
        )
      )
    ).subscribe(({ trips, logs }) => {
      const logDates = new Set(
        logs
          .filter(log => log.driverUserId === driverId)
          .map(log => log.date)
      );

      const newTrips = trips.filter(trip => {
        const tripDate = trip.startTime.split('T')[0];
        return !logDates.has(tripDate);
      });

      newTrips.forEach(trip => {
        const endTime = new Date(trip.endTime);
        const date = trip.startTime.split('T')[0];
        const hours = endTime.getHours().toString().padStart(2, '0');
        const minutes = endTime.getMinutes().toString().padStart(2, '0');
        const arrivalTimeAtSchool = `${hours}:${minutes}`;

        const lateness = (endTime.getHours() > 8) || (endTime.getHours() === 8 && endTime.getMinutes() > 0);

        const tripId = trip.id;
        const locationEndpoint = `https://edugo-service-de983aa97099.herokuapp.com/api/v1/locations/trip/${tripId}`;

        this.http.get<any[]>(locationEndpoint, { headers }).subscribe(locations => {

          const speeds = locations.map(loc => loc.speed);
          const averageSpeed = speeds.length > 0
            ? Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length)
            : 0;




          const payload = {
            driverUserId: driverId,
            date,
            arrivalTimeAtSchool,
            returnTimeHome: '15:45',
            speed: averageSpeed,
            incident: {
              detour: false,
              lateness,
              speeding: false
            }
          };


          this.http.post(`${this.analyticsUrl}`, payload, { headers }).pipe(
            catchError(err => {
              console.error(`❌ Error al crear log para ${date}:`, err);
              return of(null);
            })
          ).subscribe(() => {
          });
        });
      });

      if (newTrips.length === 0) {
        console.log('📊 Todos los trips ya están registrados en logs.');
      }
    });
  }
}
