import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsUrl = 'http://localhost:8080/api/v1/students';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllStudents(): Observable<Student[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Student[]>(`${this.studentsUrl}/all`, { headers });
  }

  getStudentsByDriverId(driverId: number): Observable<Student[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Student[]>(`${this.studentsUrl}/driver/${driverId}`, { headers });
  }

  getStudentById(id: number): Observable<Student> {
    const headers = this.getAuthHeaders();
    return this.http.get<Student>(`${this.studentsUrl}/${id}`, { headers });
  }

  //Cambiar por el correcto
  getStudentsByParentId(parentId: number): Observable<Student[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Student[]>(`${this.studentsUrl}/parent/${parentId}`, { headers });
  }
}
