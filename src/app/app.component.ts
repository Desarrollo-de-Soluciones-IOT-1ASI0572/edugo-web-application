import { ComponentHeaderComponent } from './shared/components/component-header/component-header.component';
import { ComponentSidebarComponent } from './shared/components/component-sidebar/component-sidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComponentHeaderComponent, ComponentSidebarComponent, MatSidenavModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'edugo-web-app';
}
