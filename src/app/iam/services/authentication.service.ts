import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/api/v1/authentication/sign-in';

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<{ id: number; username: string; token: string }> {
    return this.http.post<{ id: number; username: string; token: string }>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_id', response.id.toString());
        console.log('🔐 Login exitoso:');
        console.log('🔑 Token:', response.token);
        console.log('👤 ID:', response.id);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
