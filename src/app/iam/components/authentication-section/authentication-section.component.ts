import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-authentication-section',
  templateUrl: './authentication-section.component.html',
  styleUrls: ['./authentication-section.component.css'],
  standalone: true,
  imports: [MatCardModule]
})
export class AuthenticationSectionComponent {}
