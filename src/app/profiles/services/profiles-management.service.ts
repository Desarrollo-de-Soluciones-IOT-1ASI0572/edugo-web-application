import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserProfile} from '../models/profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfilesManagementService {
  private baseUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/profiles/user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLoggedInUserProfile(): Observable<UserProfile> {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('No user_id found in localStorage');
    }

    return this.http.get<UserProfile>(`${this.baseUrl}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
