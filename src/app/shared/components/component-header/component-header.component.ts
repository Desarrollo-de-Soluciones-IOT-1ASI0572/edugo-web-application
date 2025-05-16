import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-component-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './component-header.component.html',
  styleUrl: './component-header.component.css',
})
export class ComponentHeaderComponent {
  @Output() languageChanged = new EventEmitter<string>();
  currentLanguage: string = 'en';

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.languageChanged.emit(this.currentLanguage);
  }
}
