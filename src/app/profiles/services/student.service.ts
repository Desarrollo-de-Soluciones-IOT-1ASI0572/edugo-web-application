import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://jdu202012207.github.io/pruebas-api/students.json';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.apiUrl)
      .pipe(map((data: any[]) => data.map((item) => new Student(item))));
  }
}
