import { ComponentHeaderComponent } from './shared/components/component-header/component-header.component';
import { ComponentSidebarComponent } from './shared/components/component-sidebar/component-sidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
