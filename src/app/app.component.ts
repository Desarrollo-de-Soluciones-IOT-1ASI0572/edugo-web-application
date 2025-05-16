import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {ComponentHeaderComponent} from './shared/components/component-header/component-header.component';
import {ComponentSidebarComponent} from './shared/components/component-sidebar/component-sidebar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, ComponentHeaderComponent, MatSidenavModule, ComponentSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'edugo-web-app';
}
