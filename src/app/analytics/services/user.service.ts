import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/profiles/role/role_driver';

  constructor(private http: HttpClient) {}

  obtenerConductores(): Observable<{ id: number, nombre: string }[]> {
    const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTAzNzMxMjQsImV4cCI6MTc1MDk3NzkyNH0.19x4_-UkupHlLvNnbLg3b7reiITi4-pJFkjoi8ccSoMFpE8zZeKeiEzBOwpgIFoS'; // Pega aquí el token temporal
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(this.baseUrl, { headers }).pipe(
      map(usuarios =>
        usuarios.map(user => ({
          id: user.userId,
          nombre: user.fullName
        }))
      )
    );
  }
}
