import { ComponentHeaderComponent } from './shared/components/component-header/component-header.component';
import { ComponentSidebarComponent } from './shared/components/component-sidebar/component-sidebar.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavContainer,
    MatSidenavModule,
    ComponentHeaderComponent,
    ComponentSidebarComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'edugo-web-app';
  constructor(public router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  shouldShowLayout(): boolean {
    return !this.router.url.includes('/sign-in');
  }

  handleLanguageChange(language: string) {
    console.log(`Switched language to: ${language}`);
    this.translate.use(language);
  }
}
