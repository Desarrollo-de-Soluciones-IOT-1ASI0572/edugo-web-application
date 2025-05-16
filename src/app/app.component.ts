import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { ComponentHeaderComponent } from './shared/components/component-header/component-header.component';
import { ComponentSidebarComponent } from './shared/components/component-sidebar/component-sidebar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavModule,
    ComponentHeaderComponent,
    ComponentSidebarComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edugo-web-app';

  constructor(public router: Router) {}

  shouldShowLayout(): boolean {

    return !this.router.url.includes('/login');
  }
}
