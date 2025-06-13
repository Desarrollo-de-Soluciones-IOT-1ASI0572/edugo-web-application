import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}


  obtenerConductores(): Observable<{ id: number, nombre: string }[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(usuarios =>
        usuarios
          .filter(user => user.roles.includes('ROLE_INSTRUCTOR'))
          .map(user => ({
            id: user.id,
            nombre: user.username
          }))
      )
    );
  }

}
