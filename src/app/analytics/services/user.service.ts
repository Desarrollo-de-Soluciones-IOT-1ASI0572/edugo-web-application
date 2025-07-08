import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://edugo-service-de983aa97099.herokuapp.com/api/v1/profiles/role/role_driver';

  constructor(private http: HttpClient) {}

}
