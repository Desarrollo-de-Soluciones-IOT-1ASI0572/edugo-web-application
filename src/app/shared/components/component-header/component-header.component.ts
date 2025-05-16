import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-component-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './component-header.component.html',
  styleUrl: './component-header.component.css'
})
export class ComponentHeaderComponent {

}
