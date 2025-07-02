import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentParentSidebarComponent } from '../../../../shared/components/component-parent-sidebar/component-parent-sidebar.component';
import { ComponentHeaderComponent } from '../../../../shared/components/component-header/component-header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-parent-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    ComponentParentSidebarComponent,
    ComponentHeaderComponent
  ],
  templateUrl: './parent-home.component.html',
  styleUrls: ['./parent-home.component.css']
})
export class ParentHomeComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  handleLanguageChange(language: string): void {
    console.log(`Switched language to: ${language}`);
    this.translate.use(language);
  }
}
