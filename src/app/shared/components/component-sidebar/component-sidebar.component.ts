import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-component-sidebar',
  imports: [MatListModule, MatIconModule, RouterModule, TranslateModule],
  templateUrl: './component-sidebar.component.html',
  styleUrl: './component-sidebar.component.css',
})
export class ComponentSidebarComponent {
  @Input() userName: string = '';
  @Input() userRole: string = '';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
}
