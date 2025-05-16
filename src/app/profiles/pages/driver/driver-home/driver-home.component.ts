import { Component } from '@angular/core';
import { DriversListComponent } from '../../../components/drivers-list/drivers-list.component';
import { StudentsListComponent } from '../../../components/students-list/students-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-home',
  imports: [DriversListComponent, StudentsListComponent, FormsModule],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.css',
})
export class DriverHomeComponent {
  selectedUserType: string = 'driver';
}
