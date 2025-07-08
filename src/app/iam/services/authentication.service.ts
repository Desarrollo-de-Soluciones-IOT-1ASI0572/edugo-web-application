import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/authentication/sign-in';
  private userUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/users';
  private profileUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/profiles/user';

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<{ id: number; username: string; token: string }>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_id', response.id.toString()); // ✅ Se mantiene
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
          switchMap((user) => {
            const role = user.roles.includes('ROLE_ADMIN') ? 'admin' : 'parent';
            localStorage.setItem('user_role', role);
            localStorage.setItem('current_user', JSON.stringify({ id: user.id, username: user.username, role }));

            // ✅ Obtener y guardar el profile_id adicionalmente
            return this.http.get<{
              id: number;
              userId: number;
              fullName: string;
              email: string;
              mobileNumber: string;
              address: string;
              gender: string;
              photoUrl: string;
              role: string;
            }>(
              `${this.profileUrl}/${user.id}`,
              { headers }
            ).pipe(
              tap((profile) => {
                localStorage.setItem('profile_id', profile.id.toString()); // 🔥 Aquí lo agregamos
              })
            );
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
    localStorage.removeItem('user_id');
    localStorage.removeItem('profile_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('current_user');
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

  getProfileId(): string | null {
    return localStorage.getItem('profile_id');
  }
}
