import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/api/v1/authentication/sign-in';
  private userUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<{ id: number; username: string; token: string }>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_id', response.id.toString());
      }),
      switchMap((response) => {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        return this.http.get<{ id: number; username: string; roles: string[] }>(
          `${this.userUrl}/${response.id}`,
          { headers }
        ).pipe(
          tap((user) => {
            const role = user.roles.includes('ROLE_ADMIN') ? 'admin' : 'parent';
            localStorage.setItem('user_role', role);
            localStorage.setItem('current_user', JSON.stringify({ id: user.id, username: user.username, role }));
          })
        );
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


  getCurrentUser(): any {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }
}
