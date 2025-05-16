import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password });
  }
}
